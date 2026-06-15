"use client";

import { Save, Send } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { MediaUploader } from "@/components/MediaUploader";
import { addProperty, updateProperty, type Property, type PropertyInput, type PropertyStatus } from "@/lib/properties";

const emptyForm: PropertyInput = {
  title: "",
  slug: "",
  description: "",
  price: "",
  location: "",
  type: "Villa",
  bedrooms: null,
  bathrooms: null,
  area: "",
  amenities: [],
  images: [],
  videos: [],
  featured: false,
  status: "draft",
  contact_phone: "",
  contact_email: ""
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function PropertyForm({
  initialProperty,
  onSaved
}: {
  initialProperty?: Property | null;
  onSaved?: (property: Property) => void;
}) {
  const initial = useMemo<PropertyInput>(() => {
    if (!initialProperty) {
      return emptyForm;
    }

    return {
      title: initialProperty.title,
      slug: initialProperty.slug,
      description: initialProperty.description,
      price: initialProperty.price,
      location: initialProperty.location,
      type: initialProperty.type,
      bedrooms: initialProperty.bedrooms,
      bathrooms: initialProperty.bathrooms,
      area: initialProperty.area,
      amenities: initialProperty.amenities,
      images: initialProperty.images,
      videos: initialProperty.videos,
      featured: initialProperty.featured,
      status: initialProperty.status,
      contact_phone: initialProperty.contact_phone || "",
      contact_email: initialProperty.contact_email || ""
    };
  }, [initialProperty]);

  const [form, setForm] = useState<PropertyInput>(initial);
  const [amenitiesText, setAmenitiesText] = useState(initial.amenities.join(", "));
  const [saving, setSaving] = useState<PropertyStatus | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Reset form when initialProperty changes (e.g., when editing a different property)
  useEffect(() => {
    setForm(initial);
    setAmenitiesText(initial.amenities.join(", "));
    setMessage("");
    setError("");
  }, [initialProperty, initial]);

  const setField = <K extends keyof PropertyInput>(key: K, value: PropertyInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const save = async (status: PropertyStatus) => {
    setSaving(status);
    setMessage("");
    setError("");

    try {
      const amenities = amenitiesText
        .split(",")
        .map((amenity) => amenity.trim())
        .filter(Boolean);

      let payload: any;

      if (initialProperty?.id) {
        // For updates, build payload WITHOUT slug to avoid unique constraint errors
        payload = {
          title: form.title,
          description: form.description,
          price: form.price,
          location: form.location,
          type: form.type,
          bedrooms: form.bedrooms,
          bathrooms: form.bathrooms,
          area: form.area,
          amenities,
          images: form.images,
          videos: form.videos,
          featured: form.featured,
          status,
          contact_phone: form.contact_phone || null,
          contact_email: form.contact_email || null
        };
      } else {
        // For new properties, include slug
        payload = {
          title: form.title,
          slug: form.slug || slugify(form.title),
          description: form.description,
          price: form.price,
          location: form.location,
          type: form.type,
          bedrooms: form.bedrooms,
          bathrooms: form.bathrooms,
          area: form.area,
          amenities,
          images: form.images,
          videos: form.videos,
          featured: form.featured,
          status,
          contact_phone: form.contact_phone || null,
          contact_email: form.contact_email || null
        };
      }

      const saved = initialProperty?.id ? await updateProperty(initialProperty.id, payload) : await addProperty(payload);

      if (initialProperty?.id) {
        // Editing an existing property — keep the form populated with saved values
        setForm({
          title: saved.title,
          slug: saved.slug,
          description: saved.description,
          price: saved.price,
          location: saved.location,
          type: saved.type,
          bedrooms: saved.bedrooms,
          bathrooms: saved.bathrooms,
          area: saved.area,
          amenities: saved.amenities,
          images: saved.images,
          videos: saved.videos,
          featured: saved.featured,
          status: saved.status,
          contact_phone: saved.contact_phone || "",
          contact_email: saved.contact_email || ""
        });
        setAmenitiesText(saved.amenities.join(", "));
      } else {
        // Adding a new property — reset the form to empty after saving
        setForm(emptyForm);
        setAmenitiesText("");
      }

      setMessage(status === "published" ? "Published. The public website will show this property immediately." : "Draft saved.");
      onSaved?.(saved);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save property.");
    } finally {
      setSaving(null);
    }
  };

  return (
    <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
      {message ? <div className="rounded bg-forest/10 px-4 py-3 text-sm font-bold text-forest">{message}</div> : null}
      {error ? <div className="rounded bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div> : null}

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-black">Description</h2>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-wide text-slate-500">Description</span>
                <textarea value={form.description} onChange={(event) => setField("description", event.target.value)} rows={8} className="rounded border border-slate-200 px-3 py-3 text-sm outline-none focus:border-forest dark:border-slate-700 dark:bg-slate-950" required />
              </label>
            </div>
          </section>
          <MediaUploader images={form.images} videos={form.videos} onChange={(media) => setForm((current) => ({ ...current, ...media }))} />
        </div>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-black">Publishing</h2>
          <label className="mt-5 flex items-center justify-between gap-4 rounded border border-slate-200 p-3 text-sm font-bold dark:border-slate-800">
            <span>Featured property</span>
            <input type="checkbox" checked={form.featured} onChange={(event) => setField("featured", event.target.checked)} className="h-5 w-5 accent-forest" />
          </label>
          <div className="mt-5 grid gap-3">
            <button type="button" onClick={() => save("published")} disabled={!!saving || !form.description} className="inline-flex items-center justify-center gap-2 rounded bg-forest px-4 py-3 text-sm font-black text-white transition hover:bg-leaf disabled:cursor-not-allowed disabled:opacity-60">
              <Send className="h-4 w-4" />
              {saving === "published" ? "Publishing..." : "Publish"}
            </button>
            <button type="button" onClick={() => save("draft")} disabled={!!saving || !form.description} className="inline-flex items-center justify-center gap-2 rounded border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
              <Save className="h-4 w-4" />
              {saving === "draft" ? "Saving..." : "Save Draft"}
            </button>
          </div>
        </aside>
      </div>
    </form>
  );
}
