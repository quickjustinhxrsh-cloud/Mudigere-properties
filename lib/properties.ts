import { images } from "@/lib/images";
import { isSupabaseUnavailableError, supabase } from "@/lib/supabase";

export type PropertyStatus = "draft" | "published";

export type Property = {
  id: number | string;
  title: string;
  slug: string;
  description: string;
  price: string;
  location: string;
  type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area: string;
  amenities: string[];
  images: string[];
  videos: string[];
  featured: boolean;
  status: PropertyStatus;
  created_at?: string;
  features: string[];
  image: string;
  gallery: string[];
  contact_phone?: string | null;
  contact_email?: string | null;
};

export type PropertyInput = Omit<Property, "id" | "created_at" | "features" | "image" | "gallery">;

const fallbackProperties: Property[] = [
  {
    id: 1,
    title: "Coffee Estate",
    slug: "coffee-estate",
    description: "A premium hillside villa surrounded by greenery.",
    location: "Mudigere",
    type: "Villa",
    price: "₹2.75 Cr",
    bedrooms: 4,
    bathrooms: 4,
    area: "3500 sqft",
    amenities: ["Private garden", "Road access", "Hill views"],
    images: ["https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Mask%20group%20(2).png", images.hero, images.hills],
    videos: [],
    featured: true,
    status: "published",
    features: ["4 Beds", "4 Baths", "3500 sqft"],
    image: "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Mask%20group%20(2).png",
    gallery: ["https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Mask%20group%20(2).png", images.hero, images.hills]
  },
  {
    id: 2,
    title: "Premium House",
    slug: "premium-house",
    description: "A productive coffee estate with water source.",
    location: "Chikkamagaluru",
    type: "Coffee Estate",
    price: "₹75 L",
    bedrooms: null,
    bathrooms: null,
    area: "15 Acres",
    amenities: ["Coffee plants", "Water source", "Estate road"],
    images: [images.coffee, images.estate, images.mountainEstate],
    videos: [],
    featured: true,
    status: "published",
    features: ["15 Acres", "Coffee Plants", "Water Source"],
    image: images.coffee,
    gallery: [images.coffee, images.estate, images.mountainEstate]
  },
  {
    id: 3,
    title: "Farmland",
    slug: "farmland",
    description: "Fertile farmland with red soil and clear access.",
    location: "Devaramane",
    type: "Farmland",
    price: "₹45.00 L",
    bedrooms: null,
    bathrooms: null,
    area: "5 Acres",
    amenities: ["Red soil", "Road access", "Scenic views"],
    images: [images.farmland, images.hills, images.cta],
    videos: [],
    featured: true,
    status: "published",
    features: ["5 Acres", "Red Soil", "Road Access"],
    image: images.farmland,
    gallery: [images.farmland, images.hills, images.cta]
  },
  {
    id: 4,
    title: "Robusta Coffee Estate",
    slug: "robusta-coffee-estate",
    description: "Large coffee estate suited for long-term investment.",
    location: "Chikkamagaluru",
    type: "Coffee Estate",
    price: "₹6.20 Cr",
    bedrooms: null,
    bathrooms: null,
    area: "15 Acres",
    amenities: ["Coffee plants", "Water source", "Worker quarters"],
    images: [images.mountainEstate, images.coffee, images.estate],
    videos: [],
    featured: false,
    status: "published",
    features: ["15 Acres", "Coffee Plants", "Water Source"],
    image: images.mountainEstate,
    gallery: [images.mountainEstate, images.coffee, images.estate]
  }
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function normalizeProperty(property: Partial<Property> & { id: number | string; title: string }): Property {
  const bedrooms = property.bedrooms ?? null;
  const bathrooms = property.bathrooms ?? null;
  const area = property.area ?? "";
  const amenities = property.amenities ?? [];
  const propertyImages = property.images?.filter(Boolean) ?? [];
  const image = propertyImages[0] || property.image || images.villa;
  const gallery = property.gallery?.length ? property.gallery : propertyImages.length ? propertyImages : [image];
  const features = property.features?.length
    ? property.features
    : [
        bedrooms ? `${bedrooms} Beds` : "",
        bathrooms ? `${bathrooms} Baths` : "",
        area,
        ...amenities.slice(0, 2)
      ].filter(Boolean);

  return {
    id: property.id,
    title: property.title,
    slug: property.slug || slugify(property.title),
    description: property.description ?? "",
    price: property.price ?? "",
    location: property.location ?? "",
    type: property.type ?? "",
    bedrooms,
    bathrooms,
    area,
    amenities,
    images: propertyImages,
    videos: property.videos ?? [],
    featured: property.featured ?? false,
    status: property.status ?? "draft",
    created_at: property.created_at,
    features,
    image,
    gallery,
    contact_phone: property.contact_phone ?? null,
    contact_email: property.contact_email ?? null
  };
}

export const properties = fallbackProperties;
export const propertyGrid = [...fallbackProperties, ...fallbackProperties.map((property) => ({ ...property, id: Number(property.id) + 4 }))];

export async function getProperties(options: { includeDrafts?: boolean; featuredOnly?: boolean } = {}) {
  if (!supabase) {
    return options.featuredOnly ? fallbackProperties.filter((property) => property.featured) : fallbackProperties;
  }

  try {
    let query = supabase.from("properties").select("*").order("created_at", { ascending: false });

    if (!options.includeDrafts) {
      query = query.eq("status", "published");
    }

    if (options.featuredOnly) {
      query = query.eq("featured", true);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((property) => normalizeProperty(property as Property));
  } catch (error) {
    if (isSupabaseUnavailableError(error)) {
      return options.featuredOnly ? fallbackProperties.filter((property) => property.featured) : fallbackProperties;
    }

    throw error;
  }
}

export async function getProperty(idOrSlug: string | number) {
  if (!supabase) {
    return (
      fallbackProperties.find(
        (property) =>
          String(property.id) === String(idOrSlug) ||
          property.slug === String(idOrSlug)
      ) ?? null
    );
  }

  try {
    const isNumeric =
      typeof idOrSlug === "number" ||
      /^\d+$/.test(String(idOrSlug));

    const query = supabase.from("properties").select("*");

    const { data, error } = isNumeric
      ? await query.eq("id", idOrSlug).single()
      : await query.eq("slug", String(idOrSlug)).single();

    if (error) {
      throw new Error(error.message);
    }

    return data ? normalizeProperty(data as Property) : null;
  } catch (error) {
    if (isSupabaseUnavailableError(error)) {
      return (
        fallbackProperties.find(
          (property) =>
            String(property.id) === String(idOrSlug) ||
            property.slug === String(idOrSlug)
        ) ?? null
      );
    }

    throw error;
  }
}


export async function addProperty(input: PropertyInput) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }
  const payload = { ...input, slug: input.slug || slugify(input.title) };
  // Ensure contact fields are included, even if undefined
  if (!('contact_phone' in payload)) payload.contact_phone = null;
  if (!('contact_email' in payload)) payload.contact_email = null;
  const { data, error } = await supabase.from("properties").insert(payload).select("*").single();
  if (error) {
    throw new Error(error.message);
  }
  return normalizeProperty(data as Property);
}


export async function updateProperty(id: string | number, input: Partial<PropertyInput>) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }
  // Ensure contact fields are included, even if undefined
  const payload = { ...input };
  if (!('contact_phone' in payload)) payload.contact_phone = null;
  if (!('contact_email' in payload)) payload.contact_email = null;
  const { data, error } = await supabase.from("properties").update(payload).eq("id", id).select("*").single();
  if (error) {
    throw new Error(error.message);
  }
  return normalizeProperty(data as Property);
}

export async function deleteProperty(id: string | number) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}