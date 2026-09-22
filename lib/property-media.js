const bucket = "property-media";

export function getPropertyMediaPaths(urls, supabaseUrl) {
  let projectOrigin;
  try {
    projectOrigin = new URL(supabaseUrl).origin;
  } catch {
    return [];
  }

  const prefix = `/storage/v1/object/public/${bucket}/`;
  const paths = new Set();

  for (const value of urls) {
    try {
      const url = new URL(value);
      if (url.origin === projectOrigin && url.pathname.startsWith(prefix)) {
        paths.add(decodeURIComponent(url.pathname.slice(prefix.length)));
      }
    } catch {
      // External and malformed URLs are not files owned by this storage bucket.
    }
  }

  return [...paths];
}
