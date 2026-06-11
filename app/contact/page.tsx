import type { Metadata } from "next";
import { Globe2, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Mudigere Properties for premium homes, coffee estates, villas, farmlands, and investment property inquiries."
};

const details = [
  { icon: Phone, text: "+91 99721 94722" },
  { icon: Mail, text: "Mudigereproperties1979@gmail.com" },
  { icon: MapPin, text: "Mudigere & Chikkamagaluru" },
  { icon: Globe2, text: "mudigereproperties.com" }
];

export default function ContactPage() {
  return (
    <main className="page-enter">
      <section className="section-pad">
        <div className="container-pad">
          <h1 className="text-4xl font-black text-forest md:text-5xl">Contact Mudigere Properties</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-ink/75">
            We&apos;re here to help you find the perfect home, estate, villa, or investment property in Mudigere & Chikkamagaluru.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="rounded-lg border border-black/15 bg-white p-5 shadow-soft sm:p-7">
              <h2 className="text-2xl font-black text-forest">Get In Touch</h2>
              <div className="eyebrow-line" />
              <div className="mt-7 grid gap-0">
                {details.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-4 border-b border-black/20 py-5 last:border-b-0">
                    <Icon className="h-5 w-5 shrink-0 text-forest" />
                    <span className="text-sm font-medium text-ink/75">{text}</span>
                  </div>
                ))}
              </div>
            </aside>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
