"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function CtaBanner({
  title: customTitle,
  text: customText,
  imageUrl: customImageUrl
}: {
  title?: string;
  text?: string;
  imageUrl?: string;
}) {
  const pathname = usePathname();

  // Determine title, text, and image based on current page
  let title = customTitle;
  let text = customText;
  let ctaText = "Contact Us";
  let ctaHref = "/contact";
  let imageUrl = customImageUrl || "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Rectangle%2070%20(1).png";

  if (!customTitle) {
    if (pathname.includes('about')) {
      title = "Learn About Our Team";
      ctaText = "Read Our Story";
      ctaHref = "/about";
      imageUrl = "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Rectangle%2070%20(1).png";
    } 
    else if (pathname.includes('properties')) {
      title = "Browse Our Latest Properties";
      ctaText = "View Listings";
      ctaHref = "/properties";
      text = "";
      imageUrl = "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Rectangle%2070%20(1).png";
    } 
    else if (pathname.includes('contact')) {
      title = "Ready to Get Started?";
      ctaText = "Contact Us Today";
      ctaHref = "/contact";
      text = "";
      imageUrl = "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Rectangle%2070%20(1).png";
    } 
    else {
      // Default: Home page
      title = "Find Your Dream Property Today";
      ctaText = "Contact Us";
      ctaHref = "/contact";
      text = "";
      imageUrl = "https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Rectangle%2070%20(1).png";
    }
  }
  const sectionStyle: React.CSSProperties = {
    background: `linear-gradient(rgba(6, 68, 23, 0.5), rgba(6, 68, 23, 0.5)), url('${imageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "200px"
  };

  const headingStyle: React.CSSProperties = {
    color: "white",
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontWeight: 700,
    fontSize: text ? "2.2rem" : "2rem",
    margin: 0,
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
    flex: 1
  };

  const textContainerStyle: React.CSSProperties = {
    flex: 1.5,
    minWidth: "250px",
    display: text ? "block" : "none"
  };

  const textStyle: React.CSSProperties = {
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "rgba(255, 255, 255, 0.9)",
    margin: 0
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "white",
    color: "#0d4226",
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontWeight: 700,
    fontSize: "1rem",
    padding: "12px 30px",
    borderRadius: "4px",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.3s ease",
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap"
  };

  return (
    <section style={sectionStyle} className="flex items-center px-5 py-12 sm:px-8 sm:py-[60px] lg:px-[150px]">
      <div className="flex w-full flex-col items-start justify-between gap-7 sm:flex-row sm:items-center sm:gap-10">
        {/* Heading and optional text */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
          <h1 style={headingStyle}>{title}</h1>
          {text && (
            <div style={textContainerStyle}>
              <p style={textStyle}>{text}</p>
            </div>
          )}
        </div>

        {/* Button */}
        <Link 
          href={ctaHref} 
          style={buttonStyle} className="w-full justify-center sm:w-auto"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
        >
          {ctaText} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
