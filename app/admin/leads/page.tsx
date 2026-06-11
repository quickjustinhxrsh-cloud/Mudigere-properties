"use client";

import { useEffect, useState } from "react";
import { getLeads, updateLeadStatus, type Lead, type LeadStatus } from "@/lib/leads";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLeads()
      .then(setLeads)
      .catch((leadError) => setError(leadError instanceof Error ? leadError.message : "Could not load leads."))
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = async (lead: Lead, status: LeadStatus) => {
    const updated = await updateLeadStatus(lead.id, status);
    setLeads((current) => current.map((item) => (item.id === lead.id ? updated : item)));
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 p-5 dark:border-slate-800">
        <h2 className="text-2xl font-black">Leads</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">Track inquiries from buyers and update their status.</p>
      </div>
      {error ? <p className="mx-5 mt-5 rounded bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Message</th>
              <th className="px-5 py-3">Property</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {loading ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center font-bold text-slate-500">Loading leads...</td></tr>
            ) : leads.length ? (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-5 py-4 font-black">{lead.name}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold">{lead.phone}</p>
                    <p className="text-xs text-slate-500">{lead.email}</p>
                  </td>
                  <td className="max-w-xs px-5 py-4 text-slate-600 dark:text-slate-300">{lead.message}</td>
                  <td className="px-5 py-4 font-semibold text-slate-500">{lead.property_id ?? "General"}</td>
                  <td className="px-5 py-4">
                    <select value={lead.status} onChange={(event) => changeStatus(lead, event.target.value as LeadStatus)} className="rounded border border-slate-200 bg-white px-3 py-2 text-sm font-bold dark:border-slate-700 dark:bg-slate-950">
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="px-5 py-8 text-center font-bold text-slate-500">No leads yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
