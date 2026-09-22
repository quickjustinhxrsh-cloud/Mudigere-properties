import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { getHoneypotValue, getTurnstileToken, parseLeadSubmission } from "@/lib/lead-validation";

export const runtime = "nodejs";

function getClientIp(request: NextRequest) {
  return request.headers.get("x-vercel-forwarded-for")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const form = new URLSearchParams({ secret, response: token, remoteip: ip });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
    cache: "no-store"
  }).catch(() => null);
  if (!response?.ok) return false;

  const result = await response.json().catch(() => null);
  return result?.success === true;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const record = body as Record<string, unknown>;

  // Bots typically populate fields that are visually hidden from people.
  if (getHoneypotValue(record)) {
    return NextResponse.json({ success: true });
  }

  const lead = parseLeadSubmission(record);
  if (!lead) {
    return NextResponse.json({ error: "Please complete all required fields with a valid email address." }, { status: 400 });
  }
  if (!await verifyTurnstile(getTurnstileToken(record), ip)) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    return NextResponse.json({ error: "Inquiry service is unavailable." }, { status: 503 });
  }

  const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } });
  const { data: allowed, error: rateLimitError } = await supabase.rpc("allow_lead_submission", { request_ip: ip });
  if (rateLimitError || !allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const { error } = await supabase.from("leads").insert({ ...lead, status: "new" });
  if (error) {
    return NextResponse.json({ error: "We could not submit your inquiry. Please call us directly." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
