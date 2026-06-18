"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Home, MessageSquare, PlusCircle, Settings, Image } from "lucide-react";

const links = [
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/add-property", label: "Add Property", icon: PlusCircle },
  { href: "/admin/leads", label: "Leads", icon: MessageSquare },
  { href: "/admin/site-images", label: "Site Images", icon: Image },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-200 bg-white px-4 py-5 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white lg:block">
      <Link href="/admin/properties" className="flex items-center gap-3 rounded-lg px-3 py-2">
        <span className="flex h-10 w-10 items-center justify-center rounded bg-forest text-white">
          <Home className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-sm font-black">Mudigere Admin</span>
          <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Owner dashboard</span>
        </span>
      </Link>
      <nav className="mt-8 grid gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded px-3 py-3 text-sm font-bold transition ${
                active
                  ? "bg-forest text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
