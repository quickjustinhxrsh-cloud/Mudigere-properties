import Link from "next/link";
import Image from "next/image";

export function Logo({
  light = false,
  src,
  className = "h-14 w-auto object-contain",
}: {
  light?: boolean;
  src?: string | undefined;
  className?: string;
}) {
  const validSrc = typeof src === "string" && src.trim() !== "";

  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Mudigere Properties home">
      <div className="transition-transform duration-300 group-hover:scale-105">
        {validSrc ? (
          <Image src={src as string} alt="Mudigere Properties Logo" width={260} height={90} className={className} priority />
        ) : (
          <svg width="260" height="90" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect width="260" height="90" rx="12" fill="#064417" />
            <text x="20" y="55" fill="#fff" fontSize="20" fontWeight="700" fontFamily="sans-serif">Mudigere Properties</text>
          </svg>
        )}
      </div>

      {/* text intentionally omitted — use the SVG/text above for fallback */}
    </Link>
  );
}