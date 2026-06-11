"use client";

import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { uploadMedia } from "@/lib/media";

type MediaUploaderProps = {
  images: string[];
  videos: string[];
  onChange: (media: { images: string[]; videos: string[] }) => void;
};

export function MediaUploader({ images, videos, onChange }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploaded = await uploadMedia(Array.from(files));
      onChange({
        images: [...images, ...uploaded.filter((item) => item.type === "image").map((item) => item.url)],
        videos: [...videos, ...uploaded.filter((item) => item.type === "video").map((item) => item.url)]
      });
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url: string) => onChange({ images: images.filter((image) => image !== url), videos });
  const removeVideo = (url: string) => onChange({ images, videos: videos.filter((video) => video !== url) });

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-forest hover:bg-forest/5 dark:border-slate-700 dark:bg-slate-950">
        <UploadCloud className="h-8 w-8 text-forest" />
        <span className="mt-3 text-sm font-black text-slate-900 dark:text-white">{uploading ? "Uploading..." : "Upload images or videos"}</span>
        <span className="mt-1 text-xs font-semibold text-slate-500">Multiple files supported</span>
        <input type="file" multiple accept="image/*,video/*" className="sr-only" onChange={(event) => upload(event.target.files)} disabled={uploading} />
      </label>
      {error ? <p className="mt-3 rounded bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}

      {images.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {images.map((url) => (
            <div key={url} className="group relative overflow-hidden rounded border border-slate-200 dark:border-slate-800">
              <div className="relative h-28 w-full">
                <Image src={url} alt="" fill className="object-cover" sizes="(min-width: 640px) 33vw, 100vw" />
              </div>
              <button type="button" onClick={() => removeImage(url)} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded bg-white text-slate-900 shadow">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {videos.length ? (
        <div className="mt-4 grid gap-3">
          {videos.map((url) => (
            <div key={url} className="flex items-center justify-between gap-3 rounded border border-slate-200 p-3 text-sm font-semibold dark:border-slate-800 min-w-0">
              <span className="min-w-0 truncate text-slate-600 dark:text-slate-300">{url}</span>
              <button type="button" onClick={() => removeVideo(url)} className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 flex-shrink-0">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
