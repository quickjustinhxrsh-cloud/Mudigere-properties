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
        <div className="w-full px-5 sm:px-8" style={{ paddingLeft: '180px', paddingRight: '150px', boxSizing: 'border-box' }}>
          <h1
            className="text-forest"
            style={{
              width: 839,
              height: 77,
              fontFamily: 'Montserrat',
              fontWeight: 700,
              fontStyle: 'bold',
              fontSize: 54,
              lineHeight: '100%',
              letterSpacing: '0%',
              color: 'var(--main-Color, #064417)'
            }}
          >
            Contact Mudigere Properties
          </h1>

          <div className="mt-10 flex w-full flex-col gap-6 md:flex-row md:items-stretch md:justify-start md:gap-8">
            <aside className="w-full rounded-[20px] border border-black/10 bg-[#06441705] p-5 shadow-[0_0_8px_rgba(0,0,0,0.25)] md:w-[40%] sm:p-7" style={{ minHeight: 587 }}>
              <h2 className="text-[32px] font-bold text-forest" style={{ fontFamily: 'Montserrat', lineHeight: '100%' }}>Get In Touch</h2>
              <div className="mt-7 grid gap-0">
                {details.map(({ icon: Icon, text }, index) => (
                  <div key={text}>
                    <div className="flex items-center gap-4 py-5">
                      <Icon className="h-5 w-5 shrink-0 text-forest" />
                      <span className="text-sm font-medium text-ink/75">{text}</span>
                    </div>
                    {index < details.length - 1 ? <hr className="border-black" /> : null}
                  </div>
                ))}
              </div>
            </aside>
            <div className="w-full md:w-[60%]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
