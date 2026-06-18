"use client";

import { useState, useEffect } from "react";
import { getSettings, updateSettings, type SiteSettings } from "@/lib/settings";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await updateSettings(settings);
      setMessage("Settings saved successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  if (!settings) {
    return <div className="text-center py-8">Failed to load settings</div>;
  }

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-2xl font-black">Settings</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">Manage website images for home page, about page, and founder image.</p>
      </div>

      {message && <div className="rounded bg-forest/10 px-4 py-3 text-sm font-bold text-forest">{message}</div>}
      {error && <div className="rounded bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div>}

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-black">Home Page</h3>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-wide text-slate-500">Banner Image URL</span>
              <input
                type="text"
                value={settings.home_banner_image || ""}
                onChange={(e) => setSettings({ ...settings, home_banner_image: e.target.value })}
                className="rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-forest dark:border-slate-700 dark:bg-slate-950"
                placeholder="Enter image URL"
              />
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-black">About Page</h3>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-wide text-slate-500">Banner Image URL</span>
              <input
                type="text"
                value={settings.about_banner_image || ""}
                onChange={(e) => setSettings({ ...settings, about_banner_image: e.target.value })}
                className="rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-forest dark:border-slate-700 dark:bg-slate-950"
                placeholder="Enter image URL"
              />
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-black">Founder Image</h3>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-wide text-slate-500">Founder Image URL</span>
              <input
                type="text"
                value={settings.founder_image || ""}
                onChange={(e) => setSettings({ ...settings, founder_image: e.target.value })}
                className="rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-forest dark:border-slate-700 dark:bg-slate-950"
                placeholder="Enter image URL"
              />
            </label>
          </div>
        </section>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded bg-forest px-4 py-3 text-sm font-black text-white transition hover:bg-leaf disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
