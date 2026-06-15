"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/properties";

export default function PropertyCard({ property, onView }: { property: Property; onView?: (property: Property) => void }) {
  const [showContact, setShowContact] = useState(false);

  const hasContact = property.contact_phone || property.contact_email;

  return (
    <>
      <article
        className="flex h-full min-h-[408px] w-full flex-col overflow-hidden rounded-[16px] border border-[#E7EFE8] bg-white shadow-[0_8px_24px_rgba(18,66,23,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
        onClick={() => onView?.(property)}
        style={{ cursor: onView ? "pointer" : "default", backgroundColor: "#FFFFFF" }}
      >
        <div className="relative shrink-0 overflow-hidden rounded-[10px] w-full h-[209px]" style={{ height: 209 }}>
          <Image
            src={property.image || property.images?.[0] || ""}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 p-3 flex-grow">
          <h3
            className="text-[20px] font-semibold text-[#2F2A28] line-clamp-2"
            style={{ fontFamily: "Montserrat, sans-serif", lineHeight: "1.2", minHeight: "48px" }}
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
            {hasContact ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowContact(true);
                }}
                className="h-10 w-full rounded-[6px] border border-[#124217] bg-white text-sm font-semibold text-[#124217] transition hover:bg-[#F4F8F4]"
              >
                Contact Us
              </button>
            ) : (
              <Link href="/contact" className="block" onClick={(event) => event.stopPropagation()}>
                <button className="h-10 w-full rounded-[6px] border border-[#124217] bg-white text-sm font-semibold text-[#124217] transition hover:bg-[#F4F8F4]">
                  Contact Us
                </button>
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Contact Info Modal */}
      {showContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowContact(false)}
        >
          <div
            className="relative mx-4 w-full max-w-[400px] rounded-[16px] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowContact(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <h4 className="text-[20px] font-bold text-[#124217]">Contact Details</h4>
            <p className="mt-1 text-sm text-gray-500 line-clamp-1">{property.title}</p>

            <div className="mt-6 space-y-4">
              {/* Phone */}
              {property.contact_phone && (
                <a
                  href={`tel:${property.contact_phone}`}
                  className="flex items-center gap-4 rounded-[10px] border border-[#E7EFE8] p-4 transition hover:bg-[#F4F8F4]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#124217]">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Phone</p>
                    <p className="text-[16px] font-semibold text-[#2F2A28]">{property.contact_phone}</p>
                  </div>
                </a>
              )}

              {/* Email */}
              {property.contact_email && (
                <a
                  href={`mailto:${property.contact_email}`}
                  className="flex items-center gap-4 rounded-[10px] border border-[#E7EFE8] p-4 transition hover:bg-[#F4F8F4]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#124217]">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Email</p>
                    <p className="text-[16px] font-semibold text-[#2F2A28]">{property.contact_email}</p>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}