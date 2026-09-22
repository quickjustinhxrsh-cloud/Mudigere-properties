import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getSettings } from "@/lib/settings";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mudigereproperties.com"),
  title: {
    default: "Mudigere Properties | From Coffee Hills to Dream Homes",
    template: "%s | Mudigere Properties"
  },
  description:
    "Premium homes, coffee estates, villas, farmlands, and investment properties in Mudigere and Chikkamagaluru.",
  keywords: [
    "Mudigere properties",
    "properties in Mudigere",
    "Chikkamagaluru real estate",
    "coffee estates for sale",
    "villas in Mudigere",
    "farmland in Chikkamagaluru"
  ],
  openGraph: {
    title: "Mudigere Properties",
    description: "From Coffee Hills to Dream Homes",
    url: "https://www.mudigereproperties.com",
    siteName: "Mudigere Properties",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings().catch(() => ({ logo_image: "", footer_logo_image: "" }));

  return (
    <html lang="en">
      <body>
        <Navbar logo={settings.logo_image} />
        {children}
        <Footer logo={settings.footer_logo_image || settings.logo_image} />
      </body>
    </html>
  );
}
