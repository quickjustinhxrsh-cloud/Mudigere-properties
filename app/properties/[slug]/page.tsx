import { getProperty } from "@/lib/properties";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ContactModal from "@/components/ContactModal";
import { useState } from "react";

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const property = await getProperty(params.slug);
  if (!property) return notFound();

  const hasContact = property.contact_phone || property.contact_email;

  return (
  <div className="container mx-auto py-8">
    <h1 className="text-4xl font-bold">{property.title}</h1>

    <p>{property.description}</p>

    <p>Price: {property.price}</p>

    <p>Location: {property.location}</p>

    <p>Type: {property.type}</p>

    {hasContact && (
      <ContactModal
        phone={property.contact_phone}
        email={property.contact_email}
      />
    )}
  </div>
);
}
