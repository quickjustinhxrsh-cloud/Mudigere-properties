-- Add new banner image columns to settings table
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS home_banner_image TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS about_banner_image TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS properties_banner_image TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS cta_banner_image TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS home_about_image TEXT;
