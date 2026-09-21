"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutCtaBanner() {
  return (
    <section className="flex items-center bg-cover bg-center px-5 py-12 lg:px-[150px]" style={{ minHeight: "250px", backgroundImage: "linear-gradient(90deg, rgb(255,255,255) 0%, rgba(255,255,255,.78) 62%, rgba(255,255,255,.16) 100%), linear-gradient(to right, rgba(0,0,0,.45), rgba(0,0,0,0)), url('https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Untitled%20Project%20(1).jpg')" }}>
      <div className="flex w-full flex-col items-start justify-between gap-7 sm:flex-row sm:flex-wrap sm:items-center">
        <h2 className="max-w-sm text-[clamp(1.7rem,7vw,2.2rem)] font-bold leading-tight text-forest">Let&apos;s Find Your Perfect Property</h2>
        <p className="max-w-xl text-base leading-relaxed text-[#1f1f1f] sm:text-lg">Explore premium Coffee estates, Resorts, Villas and investment opportunities with Mudigere Properties.</p>
        <Link href="/contact" className="btn-primary w-full justify-center px-8 py-3 sm:w-auto">Contact Us <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
