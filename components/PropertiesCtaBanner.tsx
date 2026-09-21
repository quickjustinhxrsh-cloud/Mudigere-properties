"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PropertiesCtaBanner() {
  return (
    <section className="flex flex-col items-start justify-between gap-8 bg-cover bg-center px-5 py-12 text-white sm:flex-row sm:items-center sm:px-8 sm:py-[60px] lg:px-[150px]" style={{ minHeight: "300px", backgroundImage: "linear-gradient(90deg, #064417 0%, rgba(6, 68, 23, 0) 100%), url('https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Rectangle%20115.png')" }}>
      <div className="max-w-2xl">
        <h2 className="text-[clamp(1.7rem,7vw,2rem)] font-bold leading-tight">Can&apos;t Find What You&apos;re Looking For?</h2>
        <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-xl">Our team can help you find the perfect property that matches your needs.</p>
      </div>
      <Link href="/contact" className="btn w-full justify-center bg-white px-8 py-3 text-forest hover:bg-white/90 sm:w-auto">Contact Us <ArrowRight className="h-4 w-4" /></Link>
    </section>
  );
}
