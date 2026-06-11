const cloudinaryBase = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_BASE_URL;

const photoFallbacks = {
  hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=82",
  hills: "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/H2%201.png",
  estate: "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Mask%20group%20(4).png",
  villa: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=82",
  farmland: "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Mask%20group%20(6).png",
  coffee: "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Mask%20group%20(5).png",
  mountainEstate: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=82",
  founder: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=82",
  cta: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=82"
};

const fromCloudinary = (publicId: string, fallback: string) =>
  cloudinaryBase ? `${cloudinaryBase.replace(/\/$/, "")}/${publicId}` : fallback;

export const images = {
  hero: fromCloudinary("mudigere/hero-hillside-villa", photoFallbacks.hero),
  hills: fromCloudinary("mudigere/coffee-hills", photoFallbacks.hills),
  estate: fromCloudinary("mudigere/estate-path", photoFallbacks.estate),
  villa: fromCloudinary("mudigere/premium-luxury-villa", photoFallbacks.villa),
  farmland: fromCloudinary("mudigere/farmland", photoFallbacks.farmland),
  coffee: fromCloudinary("mudigere/arabica-coffee-estate", photoFallbacks.coffee),
  mountainEstate: fromCloudinary("mudigere/robusta-coffee-estate", photoFallbacks.mountainEstate),
  founder: fromCloudinary("mudigere/founder", photoFallbacks.founder),
  cta: fromCloudinary("mudigere/cta-hills", photoFallbacks.cta)
};
