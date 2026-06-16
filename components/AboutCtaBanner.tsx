"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutCtaBanner() {
  const sectionStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "250px",
    backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.628) 61.54%, rgba(255, 255, 255, 0) 100%), linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.0) 100%), url('https://iwzyuwczaqaxgcwujfkj.supabase.co/storage/v1/object/public/property-media/2026/Untitled%20Project%20(1).jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px"
  };

  const leftStyle: React.CSSProperties = {
    flex: 1,
    minWidth: "200px"
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "2.2rem",
    color: "#0a4c32",
    fontWeight: 700,
    margin: 0,
    lineHeight: "1.2",
    fontFamily: "Montserrat"
  };

  const centerStyle: React.CSSProperties = {
    flex: 1.5,
    minWidth: "250px"
  };

  const textStyle: React.CSSProperties = {
    fontSize: "22px",
    lineHeight: "1.5",
    color: "#1f1f1f",
    margin: 0,
    textShadow: "0 1px 2px rgba(255,255,255,0.7)"
  };

  const rightStyle: React.CSSProperties = {
    flex: "0 0 auto"
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#0a4c32",
    color: "white",
    padding: "12px 30px",
    fontWeight: "bold",
    textDecoration: "none",
    borderRadius: "4px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "background 0.3s",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem"
  };

  return (
    <section style={sectionStyle} className="py-10 px-5 lg:px-[150px]">
      <div style={containerStyle} className="w-full max-w-full">
        {/* Left: Heading */}
        <div style={leftStyle}>
         <h2 style={headingStyle}>Let&apos;s Find Your Perfect Property</h2>
        </div>

        {/* Center: Description */}
        <div style={centerStyle}>
          <p style={textStyle}>
            Explore premium Coffee estates,<br />
            Resorts, Villas and investment opportunities<br />
            with Mudigere Properties.
          </p>
        </div>

        {/* Right: Button */}
        <div style={rightStyle}>
          <Link 
            href="/contact" 
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0d6b44")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0a4c32")}
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
