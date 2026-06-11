"use client";

import { useState } from "react";
import { MediaUploader } from "@/components/MediaUploader";

export default function AdminMediaPage() {
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-2xl font-black">Media library</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">Upload reusable property images and videos to Supabase Storage.</p>
      </div>
      <MediaUploader images={images} videos={videos} onChange={(media) => { setImages(media.images); setVideos(media.videos); }} />
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-black">Uploaded URLs</h3>
        <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
          {[...images, ...videos].length ? [...images, ...videos].map((url) => <p key={url} className="min-w-0 truncate rounded bg-slate-50 px-3 py-2 dark:bg-slate-950">{url}</p>) : <p>No media uploaded in this session.</p>}
        </div>
      </section>
    </div>
  );
}
