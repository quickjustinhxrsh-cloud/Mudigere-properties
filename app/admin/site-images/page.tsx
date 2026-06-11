"use client";

import { useState, useEffect } from "react";
import { MediaUploader } from "@/components/MediaUploader";
import { updateSettings, getSettings, type SiteSettings } from "@/lib/settings";
import { AlertCircle, CheckCircle, Copy, Check } from "lucide-react";
import Image from "next/image";

export default function AdminSiteImagesPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (error) {
      console.error("Failed to load settings:", error);
      setMessage({ type: "error", text: "Failed to load settings" });
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpdate(field: keyof SiteSettings, imageUrl: string) {
    if (!settings) return;

    try {
      setSaving(true);
      const updated = { ...settings, [field]: imageUrl };
      console.log("Updating settings with:", updated);
      await updateSettings(updated);
      setSettings(updated);
      setMessage({ type: "success", text: `${field} updated successfully!` });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Failed to update image:", error);
      setMessage({ type: "error", text: `Error: ${error instanceof Error ? error.message : "Unknown error"}` });
    } finally {
      setSaving(false);
    }
  }

  function handleMediaUpload(media: { images: string[]; videos: string[] }) {
    setUploadedImages(media.images);
  }

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  }

  function setImageUrl(field: keyof SiteSettings, url: string) {
    handleImageUpdate(field, url);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest"></div>
          <p className="mt-4 text-slate-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  const imageFields = [
    { key: "home_banner_image", label: "Home Page Banner", description: "Hero banner image for the home page" },
    { key: "about_banner_image", label: "About Page Banner", description: "Hero banner image for the about page" },
    { key: "properties_banner_image", label: "Properties Page Banner", description: "Hero banner image for the properties page" },
    { key: "home_about_image", label: "Home About Section Image", description: "Image for the about section on home page" },
    { key: "cta_banner_image", label: "CTA Banner Image", description: "Call-to-action banner image" },
    { key: "founder_image", label: "Founder Image", description: "Image of the founder/team member" }
  ];

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black">Website Images</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Manage all website banner and content images. Upload images below and use them for each section.
        </p>
      </div>

      {/* Message Alert */}
      {message && (
        <div
          className={`flex items-center gap-3 rounded-lg p-4 ${
            message.type === "success"
              ? "bg-forest/10 border border-forest/30 text-forest"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="text-sm font-semibold">{message.text}</p>
        </div>
      )}

      {/* Media Upload Section */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-black mb-3">Step 1: Upload Images</h3>
        <p className="text-sm text-slate-500 mb-4">Upload your banner images to Supabase Storage:</p>
        <MediaUploader
          images={uploadedImages}
          videos={[]}
          onChange={handleMediaUpload}
        />
      </div>

      {/* Uploaded URLs Section */}
      {uploadedImages.length > 0 && (
        <div className="rounded-lg border border-forest/30 bg-forest/5 p-6">
          <h3 className="text-base font-black mb-4">Step 2: Copy & Use URLs</h3>
          <p className="text-sm text-slate-600 mb-4">Click on an image to use it, or copy the URL:</p>
          <div className="grid gap-2">
            {uploadedImages.map((url) => (
              <div key={url} className="flex items-center gap-2 bg-white rounded-lg p-3 border border-slate-200">
                <div className="relative w-12 h-12 bg-slate-100 rounded flex-shrink-0 overflow-hidden">
                  <Image
  src={url}
  alt="Uploaded"
  fill
  className="object-cover"
  unoptimized
/>
                
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-600 truncate">{url}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(url)}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex-shrink-0"
                >
                  {copiedUrl === url ? (
                    <><Check className="w-3 h-3" /> Copied</>
                  ) : (
                    <><Copy className="w-3 h-3" /> Copy</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Fields Grid */}
      <div className="grid gap-4">
        <h3 className="text-base font-black">Step 3: Assign to Sections</h3>
        {imageFields.map((field) => {
          const fieldKey = field.key as keyof SiteSettings;
          const currentValue = settings?.[fieldKey] as string || "";

          return (
            <div key={field.key} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4">
                <h3 className="text-base font-black">{field.label}</h3>
                <p className="mt-1 text-sm text-slate-500">{field.description}</p>
              </div>

              {/* Current Image Preview */}
              {currentValue && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-600 mb-2">Current Image:</p>
                  <div className="relative w-full h-48 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                    <Image
  src={currentValue}
  alt={field.label}
  fill
  className="object-cover"
  unoptimized
/>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 truncate break-all">{currentValue}</p>
                </div>
              )}

              {/* Upload New Image */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-600">Update with URL:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste URL from uploaded images above"
                    value={currentValue}
                    onChange={(e) => settings && setSettings({ ...settings, [fieldKey]: e.target.value } as SiteSettings)}
                    disabled={saving}
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleImageUpdate(fieldKey, currentValue)}
                    disabled={saving || !currentValue}
                    className="px-4 py-2 text-sm font-semibold bg-forest text-white rounded-lg hover:bg-leaf disabled:opacity-50 transition"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
