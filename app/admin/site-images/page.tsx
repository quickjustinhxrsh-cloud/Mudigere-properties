"use client";

import { useState } from "react";
import { uploadMedia } from "@/lib/media";
import { Copy, Check, UploadCloud } from "lucide-react";

type UploadedImage = {
  url: string;
  name: string;
  copied: boolean;
};

export default function SiteImagesPage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploaded = await uploadMedia(Array.from(files));
      const imageFiles = uploaded.filter((item) => item.type === "image");
      setUploadedImages((prev) => [
        ...prev,
        ...imageFiles.map((img) => ({ url: img.url, name: img.name, copied: false }))
      ]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    // Set copied on the item by index immediately (fast UI update)
    setUploadedImages((prev) => prev.map((img, i) => (i === index ? { ...img, copied: true } : img)));

    // After 2s, reset the copied flag by matching the URL so removals won't cause OOB errors
    setTimeout(() => {
      setUploadedImages((curr) => curr.map((img) => (img.url === url ? { ...img, copied: false } : img)));
    }, 2000);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-2xl font-black">Site Images</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">Upload images and copy their URLs to use in home page, about page, and founder settings.</p>
      </div>

      {error && <div className="rounded bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div>}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-black">Upload Images</h3>
        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-forest hover:bg-forest/5 dark:border-slate-700 dark:bg-slate-950">
          <UploadCloud className="h-8 w-8 text-forest" />
          <span className="mt-3 text-sm font-black text-slate-900 dark:text-white">
            {uploading ? "Uploading..." : "Upload images"}
          </span>
          <span className="mt-1 text-xs font-semibold text-slate-500">PNG, JPG, WebP supported</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="sr-only"
            onChange={(event) => handleUpload(event.target.files)}
            disabled={uploading}
          />
        </label>
      </section>

      {uploadedImages.length > 0 && (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-black mb-4">Uploaded Images</h3>
          <div className="grid gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="flex items-center justify-between rounded border border-slate-200 p-3 dark:border-slate-700">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-500 mb-1 truncate">{image.name}</p>
                  <p className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all bg-slate-50 dark:bg-slate-950 p-2 rounded">
                    {image.url}
                  </p>
                </div>
                <div className="flex gap-2 ml-3">
                  <button
                    onClick={() => copyToClipboard(image.url, index)}
                    className="flex items-center justify-center gap-1 rounded bg-forest px-3 py-2 text-xs font-bold text-white transition hover:bg-leaf"
                  >
                    {image.copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => removeImage(index)}
                    className="rounded bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
