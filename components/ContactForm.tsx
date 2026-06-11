"use client";

import { Mail, Phone, User, MessageSquare } from "lucide-react";
import { FormEvent, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("full_name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
      status: "new"
    };

    if (supabase) {
      const { error } = await supabase.from("leads").insert(payload);
      if (error) {
        console.error(error);
        setErrorMessage("We could not submit your inquiry. Please call us directly.");
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setSubmitted(true);
    formRef.current?.reset();
    
    // Redirect to properties page with submitted parameter
    router.push("/properties?submitted=true");
  }

  return (
    <div>
      {submitted ? (
        <div className="mb-5 flex items-center justify-between rounded bg-forest px-5 py-4 text-sm font-black text-white">
          Submitted Successfully! Redirecting...
          <button onClick={() => setSubmitted(false)} className="font-black" aria-label="Dismiss success message">
            X
          </button>
        </div>
      ) : null}
      {errorMessage ? <div className="mb-5 rounded bg-red-50 px-5 py-4 text-sm font-black text-red-700">{errorMessage}</div> : null}
      <form ref={formRef} onSubmit={handleSubmit} className="rounded-lg border border-black/15 bg-white p-5 shadow-soft sm:p-7">
        <h2 className="text-2xl font-black text-forest">Send Us A Message</h2>
        <div className="eyebrow-line" />
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Field icon={User} name="full_name" placeholder="Full Name" required />
          <Field icon={Phone} name="phone" placeholder="Phone Number" required />
          <Field icon={Mail} name="email" placeholder="Email Address" type="email" required className="sm:col-span-2" />
          <label className="relative sm:col-span-2">
            <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-forest" />
            <textarea
              name="message"
              placeholder="Message"
              required
              rows={7}
              className="w-full rounded border border-forest/30 px-11 py-3 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20"
            />
          </label>
        </div>
        <button type="submit" disabled={loading} className="btn-primary mt-5 w-full disabled:cursor-wait disabled:opacity-70">
          {loading ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
}

function Field({
  icon: Icon,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: typeof User }) {
  return (
    <label className={`relative ${className}`}>
      <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-forest" />
      <input
        {...props}
        className="h-12 w-full rounded border border-forest/30 px-11 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20"
      />
    </label>
  );
}
