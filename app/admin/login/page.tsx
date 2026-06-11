"use client";

import { useRouter } from "next/navigation";
import { Building2, Lock } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!supabase) {
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.replace("/admin/dashboard");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center">
        <div className="grid w-full overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl md:grid-cols-[1fr_420px]">
          <section className="hidden bg-forest p-10 text-white md:block">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-white text-forest">
              <Building2 className="h-6 w-6" />
            </div>
            <h1 className="mt-10 text-4xl font-black leading-tight">Manage listings without redeploys.</h1>
            <p className="mt-5 max-w-md text-sm font-medium leading-6 text-white/80">
              Publish properties, upload media, review leads, and update website settings from one secure dashboard.
            </p>
          </section>
          <form onSubmit={login} className="bg-white p-6 text-slate-950 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-forest/10 text-forest">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="mt-7 text-2xl font-black">Admin login</h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">Use the owner account created in Supabase Auth.</p>
            {error ? <p className="mt-5 rounded bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}
            <div className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-wide text-slate-500">Email</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded border border-slate-200 px-3 py-3 text-sm outline-none focus:border-forest" required />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-wide text-slate-500">Password</span>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded border border-slate-200 px-3 py-3 text-sm outline-none focus:border-forest" required />
              </label>
            </div>
            <button type="submit" disabled={loading} className="mt-6 w-full rounded bg-forest px-4 py-3 text-sm font-black text-white transition hover:bg-leaf disabled:opacity-60">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
