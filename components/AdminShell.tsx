"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { supabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [checking, setChecking] = useState(!isLogin);

  useEffect(() => {
    if (isLogin || !supabase) {
      setChecking(false);
      return;
    }

    supabase.auth.getUser()
      .then(({ data, error }) => {
        if (error || !isAdmin(data.user)) {
          router.replace("/admin/login");
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        router.replace("/admin/login");
      });
  }, [isLogin, router]);

  if (isLogin) {
    return <>{children}</>;
  }

  if (!supabase) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 text-slate-950 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto max-w-xl rounded-lg border border-red-200 bg-red-50 p-6 text-sm font-semibold text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          The admin area is unavailable because its secure configuration is missing. Contact the site administrator.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="flex">
        <AdminSidebar />
        <div className="min-w-0 flex-1">
          <AdminNavbar />
          <main className="p-4 sm:p-6">
            {checking ? (
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-sm font-bold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                Checking admin session...
              </div>
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
