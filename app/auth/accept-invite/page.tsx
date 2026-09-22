"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

type InviteState = "checking" | "ready" | "invalid";

export default function AcceptInvitePage() {
  const router = useRouter();
  const [state, setState] = useState<InviteState>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    const loadInviteSession = async () => {
      if (!supabase) {
        if (active) {
          setError("This site is missing its authentication configuration. Contact the site administrator.");
          setState("invalid");
        }
        return;
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (!active) {
        return;
      }

      if (sessionError || !session) {
        setError("This invitation is invalid, expired, or has already been used. Ask an administrator to send a new invitation.");
        setState("invalid");
        return;
      }

      window.history.replaceState({}, document.title, window.location.pathname);

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !isAdmin(user)) {
        await supabase.auth.signOut();
        if (active) {
          setError("This account is not authorized to access the admin area. Ask an administrator to assign the admin role before sending a new invitation.");
          setState("invalid");
        }
        return;
      }

      setState("ready");
    };

    void loadInviteSession();
    return () => {
      active = false;
    };
  }, []);

  const setPasswordForInvite = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password.length < 12) {
      setError("Choose a password with at least 12 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    if (!supabase) {
      setError("This site is missing its authentication configuration. Contact the site administrator.");
      return;
    }

    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    router.replace("/admin/properties");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-xl items-center">
        <div className="w-full rounded-xl border border-white/10 bg-white p-6 text-slate-950 shadow-2xl sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-forest/10 text-forest">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <h1 className="mt-7 text-2xl font-black">Set your admin password</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            Choose a strong password to activate your Mudigere Properties admin account.
          </p>

          {state === "checking" ? (
            <p className="mt-6 rounded bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600">Verifying your invitation…</p>
          ) : null}

          {error ? <p className="mt-6 rounded bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}

          {state === "ready" ? (
            <form className="mt-6 grid gap-4" onSubmit={setPasswordForInvite}>
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-wide text-slate-500">New password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="rounded border border-slate-200 px-3 py-3 text-sm outline-none focus:border-forest"
                  minLength={12}
                  autoComplete="new-password"
                  required
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-wide text-slate-500">Confirm password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="rounded border border-slate-200 px-3 py-3 text-sm outline-none focus:border-forest"
                  minLength={12}
                  autoComplete="new-password"
                  required
                />
              </label>
              <button type="submit" disabled={saving} className="mt-2 rounded bg-forest px-4 py-3 text-sm font-black text-white transition hover:bg-leaf disabled:opacity-60">
                {saving ? "Saving password…" : "Activate admin account"}
              </button>
            </form>
          ) : null}
        </div>
      </section>
    </main>
  );
}
