import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/properties";

const siteUrl = "https://www.mudigereproperties.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/properties`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 }
  ];

  const properties = await getProperties().catch(() => []);
  const propertyPages = properties.map((property) => ({
    url: `${siteUrl}/properties/${property.slug}`,
    lastModified: property.created_at ? new Date(property.created_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  return [...staticPages, ...propertyPages];
}
