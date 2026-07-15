"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { supabase } from "@/lib/supabase";

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

    supabase.auth.getSession()
      .then(({ data }) => {
        if (!data.session) {
          router.replace("/admin/login");
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        setChecking(false);
      });
  }, [isLogin, router]);

  if (isLogin) {
    return <>{children}</>;
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
