import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  partialPrefetching: true,
  // Pricing and media were separate pages on the old site; they now share /packages.
  // Locale-less URLs reach these via the proxy, which adds the locale first.
  // Static images keep their names, so cache them for a week and let browsers
  // revalidate in the background for a month instead of re-downloading.
  async headers() {
    const images = "public, max-age=604800, stale-while-revalidate=2592000";
    return ["/media/:path*", "/brand/:path*", "/team/:path*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: images }],
    }));
  },
  async redirects() {
    return [
      { source: "/:lang(en|zh)/pricing", destination: "/:lang/packages#pricing", permanent: true },
      { source: "/:lang(en|zh)/media", destination: "/:lang/packages#gallery", permanent: true },
      { source: "/:lang(en|zh)/pricing-media", destination: "/:lang/packages", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
