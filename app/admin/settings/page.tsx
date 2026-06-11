"use client";

import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { MediaUploader } from "@/components/MediaUploader";
import { defaultSettings, getSettings, updateSettings, type SiteSettings } from "@/lib/settings";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getSettings().then(setSettings).catch(() => undefined);
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      setSettings(await updateSettings(settings));
      setMessage("Settings saved. Public pages can read the updated banner and contact info immediately.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-2xl font-black">Website settings</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">Update homepage banner media, contact details, and social links.</p>
      </div>
      {message ? <p className="rounded bg-forest/10 px-4 py-3 text-sm font-bold text-forest">{message}</p> : null}
      {error ? <p className="rounded bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-wide text-slate-500">Company name</span>
            <input value={settings.company_name} onChange={(event) => setSettings((current) => ({ ...current, company_name: event.target.value }))} className="rounded border border-slate-200 px-3 py-3 text-sm outline-none focus:border-forest dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-wide text-slate-500">Phone</span>
            <input value={settings.phone} onChange={(event) => setSettings((current) => ({ ...current, phone: event.target.value }))} className="rounded border border-slate-200 px-3 py-3 text-sm outline-none focus:border-forest dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-wide text-slate-500">Email</span>
            <input value={settings.email} onChange={(event) => setSettings((current) => ({ ...current, email: event.target.value }))} className="rounded border border-slate-200 px-3 py-3 text-sm outline-none focus:border-forest dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-wide text-slate-500">Instagram</span>
            <input value={settings.social_links.instagram ?? ""} onChange={(event) => setSettings((current) => ({ ...current, social_links: { ...current.social_links, instagram: event.target.value } }))} className="rounded border border-slate-200 px-3 py-3 text-sm outline-none focus:border-forest dark:border-slate-700 dark:bg-slate-950" />
          </label>
        </div>
        <div className="mt-5">
          <p className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">Founder photo</p>
          <MediaUploader
            images={settings.founder_image ? [settings.founder_image] : []}
            videos={[]}
            onChange={(media) => setSettings((current) => ({ ...current, founder_image: media.images.at(-1) ?? "" }))}
          />
        </div>
        <button type="button" onClick={save} disabled={saving} className="mt-5 inline-flex items-center justify-center gap-2 rounded bg-forest px-4 py-3 text-sm font-black text-white transition hover:bg-leaf disabled:opacity-60">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save settings"}
        </button>
      </section>
    </div>
  );
}
