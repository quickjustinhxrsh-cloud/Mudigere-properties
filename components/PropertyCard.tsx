"use client";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/properties";

export default function PropertyCard({ property, onView }: { property: Property; onView?: (property: Property) => void }) {
  return (
    <div
      className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full"
      onClick={() => onView?.(property)}
      style={{ cursor: onView ? 'pointer' : 'default' }}
    >
      {/* Image Container - Ensures all images are the same height */}
      <div className="relative w-full h-64">
        <Image
          src={property.image || property.images?.[0] || ''} // Use proper image field
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
          <span className="text-green-800 font-bold whitespace-nowrap">{property.price}</span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="mr-1 h-4 w-4" />
          {property.location}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.features.map((feature, index) => (
            <span
              key={index}
              className="text-gray-700 px-1 py-1 rounded-full"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "16px",
                letterSpacing: "0%",
              }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Buttons - Kept at the bottom */}
        <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => onView?.(property)}
            className="w-full py-2 border border-green-800 text-green-800 font-semibold rounded hover:bg-green-50 transition-colors"
          >
            View Property
          </button>
          <Link href="/contact">
            <button className="w-full py-2 bg-green-900 text-white font-semibold rounded hover:bg-green-800 transition-colors">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}