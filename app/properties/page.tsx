import type { Metadata } from "next";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { PropertyExplorer } from "@/components/PropertyExplorer";
import { PropertiesCtaBanner } from "@/components/PropertiesCtaBanner";
import { PropertiesPageClient } from "@/components/PropertiesPageClient";
import { getProperties, propertyGrid } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Search premium villas, coffee estates, farmlands, and investment properties in Mudigere and Chikkamagaluru."
};

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  noStore();
  const initialProperties = await getProperties().catch(() => propertyGrid);

  return (
    <main className="page-enter">
      <PropertiesPageClient />
      <section className="section-pad">
        <div className="container-pad">
          <h1 className="text-[clamp(2rem,9vw,3rem)] font-bold leading-tight text-forest lg:pl-[150px]">Our Properties</h1>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-snug text-[#1f1f1f] sm:text-2xl lg:pl-[150px] lg:text-[32px] lg:leading-none">
            Explore premium Coffee estates, Resorts, Villas and investment opportunities in Malnad Region
          </p>
          <PropertyExplorer initialProperties={initialProperties} />
          {/* Hide 'Back to Properties List' on the first page */}
        </div>
      </section>
      <PropertiesCtaBanner />
    </main>
  );
}
