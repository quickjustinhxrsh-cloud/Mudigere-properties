"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Globe2, Instagram, Linkedin, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer({ logo }: { logo?: string }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <footer className="bg-forest text-white">
      <div className="container-pad grid gap-8 py-10 md:grid-cols-[1.15fr_0.8fr_1.05fr] md:items-stretch">
        <div className="flex h-full flex-col items-center justify-center text-center md:pr-6 md:border-r md:border-white/90">
          <Logo src={logo || undefined} className="mx-auto h-28 w-auto object-contain" />
          <p className="mt-5 max-w-xs text-xl leading-6 text-white/85">
            <span className="whitespace-nowrap">Premium Properties Surrounded</span>
            <br />
            by Nature.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center text-center md:h-[184px] md:items-start md:text-left md:pr-6 md:border-r md:border-white/90">
          <h3 className="text-base font-medium tracking-wide">Quick Links</h3>
          <ul className="mt-4 flex w-full max-w-[180px] flex-col items-center gap-2 text-sm text-white/85 md:items-start">
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
        <div className="flex w-full flex-col items-center justify-center text-center md:h-[184px] md:items-start md:text-left md:pl-4">
          <h3 className="text-base font-medium tracking-wide">Contact Details</h3>
          <div className="mt-4 flex w-full flex-col items-center gap-3 text-sm text-white/85 md:items-start">
            <p className="flex items-center justify-center gap-3 text-center md:justify-start md:text-left">
              <Phone className="h-4 w-4" /> +91 99721 94722
            </p>
            <p className="flex items-center justify-center gap-3 text-center">
              <MapPin className="h-4 w-4" /> Mudigere & Chikkamagaluru
            </p>
            <p className="flex items-center justify-center gap-3 text-center md:justify-start md:text-left">
              <Globe2 className="h-4 w-4" /> mudigereproperties.com
            </p>
          </div>

        </div>
      </div>
      <div className="border-t border-white/10 bg-[#3a2724] py-3 px-5 flex flex-col items-center justify-center gap-6 text-xs text-white/70 md:flex-row">
        <div className="flex items-center justify-center gap-3 text-white/75">
          {[
            {
              Icon: Instagram,
              href: "https://www.instagram.com/mudigereproperties/",
              label: "Follow Mudigere Properties on Instagram"
            },
            { Icon: Facebook, href: "#", label: "Facebook profile" },
            { Icon: Linkedin, href: "#", label: "LinkedIn profile" }
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href === "#" ? undefined : "_blank"}
              rel={href === "#" ? undefined : "noreferrer"}
              className="flex h-9 w-9 items-center justify-center rounded border border-white/20 transition hover:bg-white hover:text-forest"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <span>© 2026 Mudigere Properties. All Rights Reserved</span>
      </div>
    </footer>
  );
}
