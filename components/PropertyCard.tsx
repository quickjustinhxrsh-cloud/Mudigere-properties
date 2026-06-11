"use client";
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
          <span className="material-icons text-base mr-1">location_on</span>
          {property.location}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.features.map((feature, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
              {feature}
            </span>
          ))}
        </div>

        {/* Buttons - Kept at the bottom */}
        <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
          <Link href={`/properties/${property.slug}`}>
            <button className="w-full py-2 border border-green-800 text-green-800 font-semibold rounded hover:bg-green-50 transition-colors">
              View Property
            </button>
          </Link>
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
