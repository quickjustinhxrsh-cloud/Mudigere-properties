"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/properties";

export default function PropertyCard({ property, onView }: { property: Property; onView?: (property: Property) => void }) {

  return (
    <article
      className="flex h-[408px] w-[294px] shrink-0 flex-col overflow-hidden rounded-[16px] border border-[#E7EFE8] bg-white shadow-[0_8px_24px_rgba(18,66,23,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
      onClick={() => onView?.(property)}
      style={{ cursor: onView ? "pointer" : "default", backgroundColor: "#FFFFFF" }}
    >
      <div className="relative overflow-hidden rounded-[10px]" style={{ width: 294, height: 209 }}>
        <Image
          src={property.image || property.images?.[0] || ""}
          alt={property.title}
          fill
          sizes="294px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 p-3 flex-grow">
        <h3
          className="text-[20px] font-semibold text-[#2F2A28]"
          style={{ fontFamily: "Montserrat, sans-serif", lineHeight: "1.2" }}
        >
          {property.title}
        </h3>

        <div className="px-1 py-1">
          <div className="flex items-center justify-between gap-3 text-[#124217]">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              <span>{property.location || "Mudigere"}</span>
            </div>
            <span className="text-sm font-semibold">₹ {property.price.replace(/^₹/, "")}</span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
          {property.description}
        </p>

        <div className="mt-1 grid grid-cols-2 gap-3">
          <button
            onClick={() => onView?.(property)}
            className="h-10 rounded-[6px] bg-[#124217] text-sm font-semibold text-white transition hover:bg-[#0f3514]"
          >
            View Property
          </button>
          <Link href="/contact" className="block" onClick={(event) => event.stopPropagation()}>
            <button className="h-10 w-full rounded-[6px] border border-[#124217] bg-white text-sm font-semibold text-[#124217] transition hover:bg-[#F4F8F4]">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}