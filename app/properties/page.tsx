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
          <h1 className="text-4xl font-bold text-forest md:text-5xl" style={{ paddingLeft: '150px' }}>Our Properties</h1>
          <p style={{ fontFamily: "Montserrat", fontWeight: 500, fontSize: "32px", lineHeight: "100%", maxWidth: "100%", marginTop: "20px", color: "rgb(31, 31, 31)", paddingLeft: '150px' }}>
            Explore premium Coffee estates, Resorts, Villas and investment<br />
            opportunities in Malnad Region
          </p>
          <PropertyExplorer initialProperties={initialProperties} />
          {/* Hide 'Back to Properties List' on the first page */}
        </div>
      </section>
      <PropertiesCtaBanner />
    </main>
  );
}
