"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PropertiesCtaBanner() {
  const sectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
    minHeight: "300px",
    backgroundImage: "linear-gradient(90deg, #064417 0%, rgba(6, 68, 23, 0) 100%), url('https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Rectangle%20115.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  };

  const contentLeftStyle: React.CSSProperties = {
    maxWidth: "60%",
    textAlign: "left",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "32px",
    fontWeight: 700,
    margin: "0 0 10px 0",
    color: "white",
    fontFamily: "Montserrat",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "22px",
    lineHeight: "1.5",
    margin: 0,
    color: "rgba(255, 255, 255, 0.9)",
  };

  const contentRightStyle: React.CSSProperties = {
    flexShrink: 0,
    textAlign: "right",
  };

  const buttonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "white",
    color: "#0d4226",
    fontWeight: 700,
    fontSize: "18px",
    padding: "14px 40px",
    borderRadius: "6px",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background 0.3s",
    border: "none",
    cursor: "pointer",
  };

  return (
    <section style={sectionStyle} className="py-[60px] px-5 sm:px-8 lg:px-[150px]">
      <div style={contentLeftStyle}>
        <h2 style={headingStyle}>Can&apos;t Find What You&apos;re Looking For?</h2>
        <p style={textStyle}>Our team can help you find the perfect property that<br />matches your needs.</p>
      </div>

      <div style={contentRightStyle}>
        <Link
          href="/contact"
          style={buttonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2f2f2")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
        >
          Contact Us <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
