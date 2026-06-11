"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Globe2, Instagram, Linkedin, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer({ logo }: { logo?: string }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-forest text-white">
      <div className="container-pad grid gap-4 py-6 md:grid-cols-[1.2fr_0.7fr_1fr]">
        <div className="pr-6 border-r border-white">
          <Logo light src={logo || undefined} className="h-28 w-auto object-contain" />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/85">
            Premium Properties Surrounded by Nature.
          </p>
        </div>
        <div className="pr-6 border-r border-white">
          <h3 className="text-base font-black">Quick Links</h3>
          <ul className="mt-4 grid gap-2 text-sm text-white/85">
            {[
              ["Home", "/"],
              ["About Us", "/about"],
              ["Properties", "/properties"]
            ].map(([label, href]) => (
              <li key={href}>
                <Link className="transition hover:text-white hover:underline" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-base font-black">Contact Details</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/85">
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4" /> +91 99721 94722
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4" /> Mudigere & Chikkamagaluru
            </p>
            <p className="flex items-center gap-3">
              <Globe2 className="h-4 w-4" /> mudigereproperties.com
            </p>
          </div>
          <div className="flex gap-3 text-white/75 mt-6">
            {[Instagram, Facebook, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="Social profile"
                className="flex h-9 w-9 items-center justify-center rounded border border-white/20 transition hover:bg-white hover:text-forest"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-[#3a2724] py-3 px-5 flex items-center justify-center text-xs text-white/70">
        <span>© 2026 Mudigere Properties. All Rights Reserved</span>
      </div>
    </footer>
  );
}
