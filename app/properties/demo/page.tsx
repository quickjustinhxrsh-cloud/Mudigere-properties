"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const properties = [
  { id: 1, title: "Harsha", location: "Bihar", price: "300 Cr", acres: "2345 acres", image: "/property1.jpg" },
  { id: 2, title: "Punit", location: "Chikmangaluru", price: "6130", acres: "2345 acres", image: "/property2.jpg" },
  { id: 3, title: "Modern Luxury Villa with Coffee Estate", location: "Mudigere", price: "₹3.50 Cr", acres: "5 Acres", image: "/property3.jpg" },
  { id: 4, title: "Coffee Estate Land", location: "Mudigere", price: "₹2.10 Cr", acres: "8 Acres", image: "/property4.jpg" },
  { id: 5, title: "Premium Villa", location: "Chikmagalur", price: "₹4.80 Cr", acres: "3 Acres", image: "/property5.jpg" },
  { id: 6, title: "Farm Land", location: "Mudigere", price: "₹1.80 Cr", acres: "12 Acres", image: "/property6.jpg" },
  { id: 7, title: "Luxury Estate", location: "Bangalore", price: "₹8.20 Cr", acres: "10 Acres", image: "/property7.jpg" },
  { id: 8, title: "Hill View Property", location: "Chikmagalur", price: "₹5.10 Cr", acres: "6 Acres", image: "/property8.jpg" }
];

export default function DemoPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProperties = useMemo(() => {
    if (!searchTerm.trim()) return properties;
    return properties.filter((property) => property.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const propertiesPerPage = 4;
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;

  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-forest mb-4">Our Properties</h1>
          <p className="text-gray-600 text-2xl md:text-3xl font-bold max-w-3xl leading-10">Explore premium Coffee estates, Resorts, Villas and investment opportunities in Malnad Region</p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="relative max-w-xl w-full mr-4">
            <input
              type="text"
              placeholder="Search Properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-[#d8d8d8] rounded-xl px-5 py-4 pr-14 outline-none focus:border-forest transition"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-forest" />
          </div>

          <div className="flex items-center gap-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentProperties.map((property) => (
            <div key={property.id} className="bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
              <div className="h-56 overflow-hidden relative">
                <Image src={property.image} alt={property.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3 gap-3">
                  <h3 className="text-xl font-bold text-forest leading-7">{property.title}</h3>
                  <span className="text-forest font-bold whitespace-nowrap">{property.price}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-4"><MapPin className="w-4 h-4" /><span>{property.location}</span></div>
                <div className="mb-5"><span className="bg-[#f4f4f4] text-sm px-3 py-2 rounded-lg">{property.acres}</span></div>
                <div className="flex gap-3">
                  <button className="flex-1 border border-forest text-forest py-3 rounded-lg font-semibold hover:bg-forest hover:text-white transition">View Property</button>
                  <button className="flex-1 bg-forest text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">Contact Us</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-forest mb-3">No Properties Found</h2>
            <p className="text-gray-500">Try searching with another property name.</p>
          </div>
        )}

        {filteredProperties.length > propertiesPerPage && (
          <div className="flex justify-center items-center gap-3 mt-14">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-11 h-11 rounded-xl border border-[#d6d6d6] flex items-center justify-center disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-11 h-11 rounded-xl text-sm font-semibold transition ${currentPage === index + 1 ? "bg-forest text-white" : "border border-[#d6d6d6] text-forest"}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-11 h-11 rounded-xl border border-[#d6d6d6] flex items-center justify-center disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
