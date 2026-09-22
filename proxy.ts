import { NextResponse, type NextRequest } from "next/server";

const legacyVercelHosts = new Set(["mudigere-properties.vercel.app"]);
const canonicalHost = "www.mudigereproperties.com";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();

  if (host && legacyVercelHosts.has(host)) {
    const destination = request.nextUrl.clone();
    destination.protocol = "https:";
    destination.host = canonicalHost;

    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}
