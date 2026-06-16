"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

interface Property {
  id: string | number;
  title: string;
  image: string;
  featured?: boolean;
}

export function FeaturedPropertiesClient({ properties }: { properties: Property[] }) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleContactClick = (property: Property) => {
    setSelectedProperty(property);
    setSubmitStatus("idle");
    setFormData({ name: "", email: "", message: "" });
  };

  const closeModal = () => setSelectedProperty(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Contact request for property:", selectedProperty.title, formData);
      setSubmitStatus("success");
      setTimeout(() => closeModal(), 2000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-white section-pad">
        <div className="container-pad text-center lg:px-[150px]">
          <h2 className="text-[28px] font-bold text-forest text-center" style={{ fontFamily: 'Montserrat', lineHeight: '100%', letterSpacing: '0%' }}>Featured Properties</h2>
          <p
            className="mx-auto mt-4 w-full max-w-full text-center hidden md:block whitespace-nowrap"
            style={{
              fontFamily: 'Montserrat',
              fontWeight: 500,
              fontSize: '22px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: 'var(--2nd-color, #3F302D)'
            }}
          >
            Explore handpicked properties designed for investment, peaceful living, and future growth.
          </p>
          <p 
            className="mx-auto mt-4 w-full max-w-full text-center md:hidden"
            style={{
              fontFamily: 'Montserrat',
              fontWeight: 500,
              fontSize: '22px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: 'var(--2nd-color, #3F302D)'
            }}
          >
            Explore handpicked properties designed for investment, peaceful living, and future growth.
          </p>
          <div className="mt-9 grid gap-6 md:grid-cols-3 w-full">
            {properties.map((property) => (
              <article
                key={property.id}
                className="overflow-hidden border border-black/10 bg-white shadow-soft transition-all duration-200 hover:shadow-md flex flex-col w-full lg:h-[535px]"
                style={{ borderRadius: '20px' }}
              >
                <div className="relative w-full h-[300px] flex-shrink-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 
                    className="font-bold text-forest text-center mx-auto"
                    style={{
                      fontFamily: 'Montserrat',
                      fontSize: '28px',
                      lineHeight: '100%',
                      marginTop: '57px', // 377px top - 300px image - 20px padding
                      width: '237px',
                      height: '33px'
                    }}
                  >
                    {property.title}
                  </h3>
                  <div className="flex w-full">
                    <Link
                      href="/properties"
                      className="btn-primary flex items-center justify-center mx-auto"
                      style={{
                        marginTop: '30px', 
                        width: '327px',
                        height: '50px'
                      }}
                    >
                      Explore properties
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {selectedProperty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-all duration-200"
          onClick={closeModal}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6">
              <div className="mb-4 border-b border-gray-100 pb-3">
                <h3 className="text-xl font-bold text-forest">
                  Inquire about {selectedProperty.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Fill out the form below and we&apos;ll get back to you shortly.
                </p>
              </div>

              {submitStatus === "success" ? (
                <div className="rounded-lg bg-forest/10 p-4 text-center text-forest">
                  <p className="font-medium">Thank you!</p>
                  <p className="mt-1 text-sm">
                    Your message has been sent. We&apos;ll contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={`I'm interested in ${selectedProperty.title}...`}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-sm text-red-600">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
