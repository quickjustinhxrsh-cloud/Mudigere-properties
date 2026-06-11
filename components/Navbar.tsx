"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/properties", label: "Properties" }
];

export function Navbar({ logo }: { logo?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
<header className="sticky top-0 z-40 w-full bg-white shadow-md">
  <nav className="flex items-center justify-between gap-6 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-10">
    <Logo src={logo || undefined} />
    <div className="hidden items-center gap-9 md:flex">
      {navLinks.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
                href={link.href}
                key={link.href}
                className={`relative py-7 text-sm font-semibold transition hover:text-forest ${
                  active ? "text-forest" : "text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 bottom-4 mx-auto h-0.5 bg-forest transition-all ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
          <Link href="/contact" className="btn-primary px-6 py-3">
            Enquire Now
          </Link>
        </div>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-forest/20 text-forest md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-black/10 bg-white md:hidden">
          <div className="container-pad grid gap-2 py-4">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
                className={`rounded px-3 py-3 text-sm font-bold ${
                  pathname === link.href ? "bg-forest text-white" : "text-ink hover:bg-forest/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Enquire Now
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
