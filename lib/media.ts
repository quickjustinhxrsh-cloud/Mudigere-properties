import { supabase } from "@/lib/supabase";

const bucket = "property-media";

export async function uploadMedia(files: File[]) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const client = supabase;
  const uploads = await Promise.all(
    files.map(async (file) => {
      const extension = file.name.split(".").pop();
      const safeName = file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const path = `${new Date().getFullYear()}/${crypto.randomUUID()}-${safeName}.${extension}`;

      const { error } = await client.storage.from(bucket).upload(path, file, {
        cacheControl: "3600",
        upsert: false
      });

      if (error) {
        throw new Error(error.message);
      }

      const { data } = client.storage.from(bucket).getPublicUrl(path);
      return {
        url: data.publicUrl,
        type: file.type.startsWith("video/") ? "video" : "image",
        name: file.name
      };
    })
  );

  return uploads;
}
