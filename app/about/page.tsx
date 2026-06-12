import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutCtaBanner } from "@/components/AboutCtaBanner";
import { images } from "@/lib/images";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mudigere Properties, trusted real estate guidance for homes, coffee estates, farmlands, and investment properties."
};

export const dynamic = "force-dynamic";

const tags = ["Coffee Estates", "Premium Villas & Resorts", "Farmlands", "Investment Properties"];
const stats = [
  "8+ Years Experience",
  "Trusted Investment Guidance",
  "Premium Property Solutions",
  "Personalized Client Support"
];
const invest = [
  "Beautiful nature",
  "Growing investment opportunities",
  "Peaceful lifestyle",
  "Safe & Relaxed Living Experience",
  "Coffee estate culture",
  "Excellent tourism growth"
];

export default async function AboutPage() {
  const settings = await getSettings().catch(() => null);
  const aboutBannerImage =
    settings?.about_banner_image ||
    "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Mask%20group%20(7).png";

  return (
    <>
      <section className="relative isolate min-h-[430px] overflow-hidden sm:min-h-[500px] lg:min-h-[575px]">
        <Image
          src={aboutBannerImage}
          alt="Mudigere hill landscape"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/78 to-white/10" />
        <div className="relative mx-auto flex min-h-[430px] w-full max-w-[1240px] items-center px-5 sm:min-h-[500px] sm:px-8 lg:min-h-[575px] lg:px-10">
          <div className="max-w-[650px] pb-6 pt-10">
            <h1
              className="text-forest"
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 700,
                fontStyle: 'bold',
                fontSize: 54,
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              About Mudigere Properties
            </h1>
            <p className="mt-7 max-w-[610px] text-[20px] font-medium leading-snug text-[#3F302D] sm:text-[26px] lg:text-[30px]">
              Discover premium real estate opportunities in the heart of Malnad Region.
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <Link href="/properties" className="btn-primary h-11 min-w-[178px] rounded-[4px] px-6">
                Explore Properties
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 min-w-[178px] items-center justify-center rounded-[4px] border border-white/70 bg-white/20 px-6 text-sm font-bold text-forest shadow-sm backdrop-blur-sm transition hover:bg-white/35 hover:text-forest"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-[72px]">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-9 lg:grid-cols-[0.9fr_1fr] lg:items-start lg:gap-16">
            <div className="max-w-[560px]">
              <p
                className="text-forest"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontStyle: "bold",
                  fontSize: "24px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "uppercase",
                }}
              >
                Who We Are
              </p>
              <h2
                className="mt-5 text-[#3F302D]"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontStyle: "bold",
                  fontSize: "32px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                Building Trust.
                <br />
                Creating Value.
              </h2>
              <p className="mt-8 text-[18px] font-medium leading-snug text-[#3F302D] sm:text-[22px]">
                Mudigere Properties is a trusted real estate brand focused on helping people discover premium
                properties surrounded by nature.
              </p>
            </div>
            <div className="relative aspect-[16/9] w-full max-w-[560px] justify-self-end overflow-hidden rounded-[12px]">
              <Image
                src={images.estate}
                alt="Luxury estate with scenic garden and mountain views"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
          </div>

          <div className="mt-9">
            <h3
              className="text-forest"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontStyle: "normal",
                fontSize: "24px",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              We specialize in:
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex min-h-[45px] items-center justify-center bg-[#d8e3dc] px-4 text-center text-[15px] font-bold leading-tight text-[#3F302D]"
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="mt-8 text-[18px] font-medium leading-snug text-[#3F302D] sm:text-[22px]">
              <p>Across Malnad Region</p>
              <p>
                Our goal is to provide a simple, transparent, and professional property-buying experience for every
                client.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-14 sm:pb-16 lg:pb-[72px]">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="rounded-[12px] bg-[#f8faf8] px-5 py-7 sm:px-8 lg:px-9">
            <div className="grid gap-7 lg:grid-cols-[240px_1fr] lg:gap-9">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-[12px] lg:mx-0">
                <Image
                  src={settings?.founder_image || images.founder}
                  alt="Founder Mrs. Shilpa Arun"
                  fill
                  className="object-cover object-center"
                  sizes="240px"
                />
              </div>

              <div className="self-center">
                <p
                  className="text-forest"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontStyle: "bold",
                    fontSize: "24px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textTransform: "uppercase",
                  }}
                >
                  Meet The Founder
                </p>
                <h2
                  className="mt-4 text-[#3F302D]"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontStyle: "bold",
                    fontSize: "32px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  Mrs. SHILPA ARUN
                </h2>
                <div className="mt-6 grid gap-5 text-[17px] font-medium leading-snug text-[#3F302D] sm:text-[21px]">
                  <p>
                    With over{" "}
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        fontStyle: "bold",
                        fontSize: "22px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      8+ years of experience in the real estate industry,
                    </span>{" "}
                    she has helped clients discover trusted properties across Malnad Region.
                  </p>
                  <p>
                    Her deep understanding of the local market, commitment to transparency, and passion for helping
                    people find the right property have made Mudigere Properties a trusted name in the region.
                  </p>
                  <p>
                    From premium coffee estates, Villas, Resorts and investment lands, she believes in creating
                    long-term value and meaningful client relationships.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[12px] bg-white px-4 py-5 shadow-[1px_1px_5px_rgba(0,0,0,0.18)] sm:px-6">
              <div className="grid gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat}
                    className={`flex min-h-[54px] items-center justify-center px-4 text-center text-forest ${
                      index < stats.length - 1 ? "lg:border-r lg:border-[#a79f9b]" : ""
                    }`}
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontStyle: "bold",
                      fontSize: "22px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      textAlign: "center",
                    }}
                  >
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 sm:pb-20 lg:pb-[82px]">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <h2
            className="text-forest"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontStyle: "bold",
              fontSize: "32px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            Why Invest in Malnad Region
          </h2>
          <div className="mt-9 grid gap-6 md:grid-cols-2">
            {invest.map((item) => (
              <div
                key={item}
                className="relative flex min-h-[72px] items-center overflow-hidden rounded-[12px] border border-forest bg-white pl-14 pr-5 text-[18px] font-bold leading-tight text-[#3F302D] sm:text-[22px]"
              >
                <span className="absolute inset-y-0 left-0 w-7 bg-forest" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8faf8] py-16 sm:py-20 lg:py-[86px]">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <h2
            className="text-forest"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontStyle: "bold",
              fontSize: "32px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            Our Vision
          </h2>
          <p className="mt-6 max-w-[1260px] text-[17px] font-medium leading-snug text-[#3F302D] sm:text-[20px]">
            To create a trusted real estate experience by connecting people with premium properties that combine
            nature, comfort, and investment value.
          </p>
        </div>
      </section>

      <AboutCtaBanner />
    </>
  );
}
