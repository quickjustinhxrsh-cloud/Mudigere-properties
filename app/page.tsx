import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { Handshake, Leaf, MapPin } from "lucide-react";
import { CtaBanner } from "@/components/CtaBanner";
import { images } from "@/lib/images";
import { getProperties, propertyGrid } from "@/lib/properties";
import { getSettings } from "@/lib/settings";
import { FeaturedPropertiesClient } from "@/components/FeaturedPropertiesClient";

export const metadata: Metadata = {
  title: "Premium Properties in Mudigere & Chikkamagaluru",
  description:
    "Discover premium coffee estates, villas, Resorts and Farmlands surrounded by nature."
};

const HouseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* Roof */}
      <path d="M2 12L12 3L22 12V12H20V20H4V12H2Z" fill="currentColor" />
      {/* Windows */}
      <rect x="7" y="14" width="2.5" height="2.5" fill="white" />
      <rect x="14.5" y="14" width="2.5" height="2.5" fill="white" />
      <rect x="7" y="17.5" width="2.5" height="2.5" fill="white" />
      <rect x="14.5" y="17.5" width="2.5" height="2.5" fill="white" />
      {/* Chimney */}
      <rect x="18" y="8" width="1.5" height="5" fill="currentColor" />
    </g>
  </svg>
);

const reasons = [
  { title: "Trusted Property Listings", text: "Verified and premium properties in prime locations.", icon: HouseIcon },
  { title: "Nature Focused Living", text: "Beautiful surroundings with greenery and peaceful views.", icon: Leaf },
  { title: "Prime Locations", text: "Carefully selected estates, villas, and investment lands.", icon: MapPin },
  { title: "Simple & Transparent Process", text: "Professional guidance with honest property assistance.", icon: Handshake }
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  noStore();
  const [featuredData, settings] = await Promise.all([
    getProperties({ featuredOnly: true }).catch(() => propertyGrid.filter((property) => property.featured)),
    getSettings().catch(() => null)
  ]);
  const featuredProperties = featuredData.length ? featuredData : propertyGrid.filter((property) => property.featured);
  // Use banner image from settings or fallback to default
  const bannerImage = settings?.home_banner_image || "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Mask%20group%20(1).png";
  const bannerBackgroundImage = `url("${bannerImage.replace(/["\\\n\r\f]/g, "\\$&")}")`;

  return (
    <main className="page-enter bg-white text-black">
      <section className="relative min-h-screen h-screen overflow-hidden text-white">
        <div className="absolute inset-0" style={{ backgroundImage: bannerBackgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container-pad relative flex min-h-[calc(100svh-72px)] flex-col items-start justify-end pb-12 pt-28 text-left sm:min-h-screen sm:justify-center sm:pb-0 lg:px-[150px]">
          <div className="w-full">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/80 sm:hidden">Mudigere Properties</p>
            <h1 className="w-full max-w-[931px] text-[clamp(2.25rem,10vw,3.4rem)] font-bold leading-[1.05] text-white m-0 lg:text-[64px]">
              Premium Properties in<br className="hidden md:inline" /> <span>Mudigere & Chikkamagaluru</span>
            </h1>
            <p className="mt-5 w-full max-w-[1001px] text-base leading-relaxed text-white/92 sm:mt-[30px] sm:text-lg lg:text-[24px] lg:font-medium lg:leading-normal">
              Discover premium <strong>coffee estates, villas, resorts and farmlands</strong> surrounded by nature.
            </p>
            <div className="mt-8 grid w-full gap-3 sm:flex sm:w-auto sm:flex-wrap sm:gap-[22px]">
              <Link href="/properties" className="btn h-[52px] w-full bg-white text-forest hover:-translate-y-0.5 hover:bg-white/90 sm:w-[239px]">
                Explore properties
              </Link>
              <Link href="/contact" className="btn h-[52px] w-full border border-white bg-transparent text-white hover:-translate-y-0.5 hover:bg-white hover:text-forest sm:w-[239px]">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad lg:pl-[150px]">
        <div className="flex flex-col lg:flex-row items-stretch w-full max-w-full px-5 sm:px-8 lg:px-0">
          <div className="relative w-full lg:w-[781px] h-[350px] lg:h-[521px] flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={images.hills} alt="Coffee hills around Mudigere" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="flex flex-1 items-center justify-center py-10 lg:py-0 px-5 lg:px-10">
            <div className="flex w-full max-w-xl flex-col items-start justify-center text-left">
            <h2
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 8vw, 2rem)",
                lineHeight: "100%",
                letterSpacing: "0%",
                background: "transparent",
                color: "var(--main-Color, #064417)",
                padding: "0",
                display: "inline-block",
                borderRadius: "4px",
                margin: 0
              }}
            >
              About Mudigere Properties
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 sm:text-lg" style={{ color: 'var(--2nd-color, #3F302D)' }}>
              Mudigere Properties helps you discover premium Coffee estates, villas, Resorts and investment opportunities in Mudigere & Chikkamagaluru.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 sm:text-lg" style={{ color: 'var(--2nd-color, #3F302D)' }}>
              From coffee estates to dream homes, we provide trusted property solutions with a simple and professional experience.
            </p>
            <Link href="/about" className="btn-primary mt-7">
              Learn More
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured properties with client-side interactivity */}
      <FeaturedPropertiesClient properties={featuredProperties.slice(0, 3)} />

      <section className="bg-white py-14 px-5 sm:py-[60px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-9 text-center text-[28px] font-bold tracking-wide text-forest sm:mb-[50px] sm:text-[34px]">Why Choose Us</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className={`flex flex-row items-start rounded-xl bg-[#f8faf8] px-5 py-5 sm:rounded-none sm:bg-transparent ${index < reasons.length - 1 && index % 4 !== 3 ? 'lg:border-r' : ''
                  } ${index < 2 && 'sm:border-r'} border-zinc-200 sm:border-r-0 lg:border-r lg:last:border-r-0`}
              >
                <div className="mr-4 flex h-[65px] w-[65px] flex-shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <Icon className="h-[24px] w-[24px]" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[18px] font-bold text-forest mb-[10px] leading-[1.2]">{title}</h3>
                  <p className="m-0 leading-[1.5]" style={{ fontSize: '16px', color: 'var(--2nd-color, #3F302D)' }}>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
