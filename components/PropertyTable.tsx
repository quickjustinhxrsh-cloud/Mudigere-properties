"use client";

import Image from "next/image";
import { Edit3, Star, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PropertyForm } from "@/components/PropertyForm";
import { deleteProperty, getProperties, type Property } from "@/lib/properties";

export function PropertyTable() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Property | null>(null);
  const [toast, setToast] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setProperties(await getProperties({ includeDrafts: true }));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (property: Property) => {
    const confirmed = window.confirm(`Delete "${property.title}"? This removes it from the live website.`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteProperty(property.id);
      setProperties((current) => current.filter((item) => item.id !== property.id));
      setToast("Property deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete property.");
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-black">Listings</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">Drafts stay private. Published listings appear live.</p>
        </div>
        <button onClick={load} className="rounded border border-slate-200 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
          Refresh
        </button>
      </div>
      {toast ? <p className="mx-5 mt-5 rounded bg-forest/10 px-4 py-3 text-sm font-bold text-forest">{toast}</p> : null}
      {error ? <p className="mx-5 mt-5 rounded bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950">
            <tr>
              <th className="px-5 py-3">Property</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Featured</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center font-bold text-slate-500">Loading properties...</td>
              </tr>
            ) : properties.length ? (
              properties.map((property) => (
                <tr key={property.id} className="align-middle">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-20 overflow-hidden rounded bg-slate-100">
                        <Image src={property.image} alt="" fill className="object-cover" sizes="80px" />
                      </div>
                      <div>
                        <p className="font-black text-slate-950 dark:text-white">{property.title}</p>
                        <p className="text-xs font-semibold text-slate-500">{property.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-600 dark:text-slate-300">{property.location}</td>
                  <td className="px-5 py-4 font-black text-forest">{property.price}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${property.status === "published" ? "bg-forest/10 text-forest" : "bg-amber-50 text-amber-700"}`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">{property.featured ? <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> : <span className="text-slate-400">No</span>}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(property)} className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" aria-label="Edit property">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button onClick={() => remove(property)} className="flex h-9 w-9 items-center justify-center rounded bg-red-50 text-red-700 transition hover:bg-red-100" aria-label="Delete property">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center font-bold text-slate-500">No properties yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex justify-end">
              <button onClick={() => setEditing(null)} className="flex h-10 w-10 items-center justify-center rounded bg-white text-slate-900 shadow" aria-label="Close editor">
                <X className="h-5 w-5" />
              </button>
            </div>
            <PropertyForm
              initialProperty={editing}
              onSaved={(property) => {
                setProperties((current) => current.map((item) => (item.id === property.id ? property : item)));
                setEditing(null);
                setToast("Property updated.");
              }}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
