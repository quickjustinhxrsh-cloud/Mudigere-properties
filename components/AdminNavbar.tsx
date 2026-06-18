"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";

import { supabase } from "@/lib/supabase";

const titles: Record<string, string> = {
  "/admin/properties": "Properties",
  "/admin/add-property": "Add Property",
  "/admin/leads": "Leads",
  "/admin/site-images": "Site Images",
  "/admin/settings": "Settings"
};

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await supabase?.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200 lg:hidden" aria-label="Open admin menu">
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-950 dark:text-white">{titles[pathname] ?? "Admin"}</h1>
            <p className="hidden text-xs font-semibold text-slate-500 dark:text-slate-400 sm:block">Live updates publish straight to the public website.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="hidden rounded border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900 sm:inline-flex">
            View site
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="flex h-10 w-10 items-center justify-center rounded bg-slate-950 text-white transition hover:bg-forest dark:bg-white dark:text-slate-950"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
