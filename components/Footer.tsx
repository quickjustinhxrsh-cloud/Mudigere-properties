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
      <div className="container-pad grid gap-6 py-6 md:grid-cols-[1.15fr_0.8fr_1.05fr] md:items-stretch">
        <div className="flex h-full flex-col items-center justify-center text-center md:pr-6 md:border-r md:border-white/90">
          <Logo light src={logo || undefined} className="mx-auto h-28 w-auto object-contain" />
          <p className="mt-5 max-w-xs text-center text-sm leading-6 text-white/85">
            Premium Properties Surrounded by Nature.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center text-center md:items-center md:pr-6 md:border-r md:border-white/90">
          <h3 className="text-base font-medium tracking-wide">Quick Links</h3>
          <ul className="mt-4 flex w-full max-w-[180px] flex-col items-center gap-2 text-sm text-white/85">
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
        <div className="flex h-full flex-col items-center justify-center text-center md:pl-6">
          <h3 className="text-base font-medium tracking-wide">Contact Details</h3>
          <div className="mt-4 flex flex-col items-center gap-3 text-sm text-white/85">
            <p className="flex items-center justify-center gap-3 text-center">
              <Phone className="h-4 w-4" /> +91 99721 94722
            </p>
            <p className="flex items-center justify-center gap-3 text-center">
              <MapPin className="h-4 w-4" /> Mudigere & Chikkamagaluru
            </p>
            <p className="flex items-center justify-center gap-3 text-center">
              <Globe2 className="h-4 w-4" /> mudigereproperties.com
            </p>
          </div>
          <div className="mt-6 flex justify-center gap-3 text-white/75">
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
