"use client";

import { useState } from "react";

export default function ContactModal({ phone, email }: { phone?: string | null; email?: string | null }) {
  const [open, setOpen] = useState(false);
  if (!phone && !email) return null;

  return (
    <>
      <button
        className="mt-6 rounded bg-forest px-6 py-3 text-white font-bold hover:bg-leaf transition"
        onClick={() => setOpen(true)}
      >
        Contact Us
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl my-auto">
            <button
              className="absolute right-3 top-3 text-xl text-slate-400 hover:text-slate-700"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="mb-4 text-lg font-bold text-center">Contact Property Holder</h2>
            <div className="space-y-3 text-center">
              {phone && (
                <div>
                  <span className="font-semibold">Phone: </span>
                  <a href={`tel:${phone}`} className="text-forest underline">{phone}</a>
                </div>
              )}
              {email && (
                <div>
                  <span className="font-semibold">Email: </span>
                  <a href={`mailto:${email}`} className="text-forest underline">{email}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
