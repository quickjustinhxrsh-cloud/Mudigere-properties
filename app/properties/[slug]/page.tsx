import { getProperty } from "@/lib/properties";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ContactModal from "@/components/ContactModal";

type PropertyPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug).catch(() => null);

  if (!property) {
    return { title: "Property not found" };
  }

  return {
    title: `${property.title} in ${property.location}`,
    description: property.description || `View ${property.title} in ${property.location}.`,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title: `${property.title} | Mudigere Properties`,
      description: property.description || `View ${property.title} in ${property.location}.`,
      images: property.image ? [{ url: property.image }] : undefined
    }
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;

  if (slug === "premium-house") {
    redirect("/properties/premium-villa");
  }
  const property = await getProperty(slug);
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
