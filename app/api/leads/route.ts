import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function asText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots typically populate fields that are visually hidden from people.
  if (asText(body.website, 200)) {
    return NextResponse.json({ success: true });
  }

  const name = asText(body.name, 120);
  const phone = asText(body.phone, 40);
  const email = asText(body.email, 254);
  const message = asText(body.message, 4000);
  if (!name || !phone || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please complete all required fields with a valid email address." }, { status: 400 });
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

  const { error } = await supabase.from("leads").insert({ name, phone, email, message, status: "new" });
  if (error) {
    return NextResponse.json({ error: "We could not submit your inquiry. Please call us directly." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
