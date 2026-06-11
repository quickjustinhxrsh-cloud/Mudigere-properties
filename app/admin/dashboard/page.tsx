"use client";

import Link from "next/link";
import { Building2, Eye, MessageSquare, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getLeads, type Lead } from "@/lib/leads";
import { getProperties, type Property } from "@/lib/properties";

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    Promise.all([getProperties({ includeDrafts: true }), getLeads()])
      .then(([propertyData, leadData]) => {
        setProperties(propertyData);
        setLeads(leadData);
      })
      .catch(() => undefined);
  }, []);

  const stats = useMemo(
    () => [
      { label: "Total properties", value: properties.length, icon: Building2 },
      { label: "Published", value: properties.filter((property) => property.status === "published").length, icon: Eye },
      { label: "Featured", value: properties.filter((property) => property.featured).length, icon: Star },
      { label: "New leads", value: leads.filter((lead) => lead.status === "new").length, icon: MessageSquare }
    ],
    [leads, properties]
  );

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-black">{value}</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded bg-forest/10 text-forest">
                <Icon className="h-5 w-5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-black">Quick actions</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">Changes to published records are read by the public site immediately.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/add-property" className="rounded bg-forest px-4 py-2 text-sm font-black text-white transition hover:bg-leaf">Add property</Link>
            <Link href="/admin/properties" className="rounded border border-slate-200 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Manage listings</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
