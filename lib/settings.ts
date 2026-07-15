import { isSupabaseUnavailableError, supabase } from "@/lib/supabase";

export type SiteSettings = {
  company_name: string;
  phone: string;
  email: string;
  banner_image: string;
  logo_image: string;
  footer_logo_image: string;
  founder_image: string;
  social_links: Record<string, string>;
  home_banner_image?: string;
  about_banner_image?: string;
  properties_banner_image?: string;
  cta_banner_image?: string;
  home_about_image?: string;
};

export const defaultSettings: SiteSettings = {
  company_name: "Mudigere Properties",
  phone: "+91 99721 94722",
  email: "hello@mudigereproperties.com",
  banner_image: "",
  logo_image: "",
  footer_logo_image: "",
  founder_image: "",
  social_links: {
    instagram: "",
    facebook: "",
    linkedin: ""
  },
  home_banner_image: "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Mask%20group%20(1).png",
  about_banner_image: "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Mask%20group%20(7).png",
  properties_banner_image: "",
  cta_banner_image: "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/cta-banner.png",
  home_about_image: "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/H2%201.png"
};

export async function getSettings() {
  if (!supabase) {
    return defaultSettings;
  }

  try {
    const { data, error } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return { ...defaultSettings, ...(data ?? {}) } as SiteSettings;
  } catch (error) {
    if (isSupabaseUnavailableError(error)) {
      return defaultSettings;
    }

    throw error;
  }
}

export async function updateSettings(settings: SiteSettings) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("settings")
    .upsert({ id: 1, ...settings }, { onConflict: "id" })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as SiteSettings;
}
