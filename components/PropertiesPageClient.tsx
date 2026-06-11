"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PropertiesPageClient() {
  const searchParams = useSearchParams();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (searchParams.get("submitted") === "true") {
      setShowToast(true);
      // Auto-hide toast after 3 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!showToast) return null;

  return (
    <div className="fixed top-6 right-6 flex items-center justify-between rounded bg-forest px-6 py-4 text-sm font-black text-white shadow-lg z-50">
      Application has been submitted
      <button 
        onClick={() => setShowToast(false)} 
        className="ml-4 font-black hover:opacity-80 transition"
        aria-label="Dismiss success message"
      >
        X
      </button>
    </div>
  );
}
