import type { NextConfig } from "next";

/**
 * Two build targets from one codebase:
 * - default: a regular Next.js app with on-demand image optimization (production hosting);
 * - STATIC_EXPORT=1: plain static files for GitHub Pages, served from NEXT_PUBLIC_BASE_PATH.
 */
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Cache Components and Partial Prefetching stay off: every page here is fully static, and keeping both
// targets on the same rendering model means what you test in development is what the static export ships.
const nextConfig: NextConfig = {
  env: {
    // Stamped at build time so the footer year needs no runtime clock.
    BUILD_YEAR: String(new Date().getFullYear()),
  },
  basePath,
  // Static hosts serve folders, so each page exports as <route>/index.html.
  ...(staticExport && { output: "export", trailingSlash: true }),
  images: staticExport
    ? { unoptimized: true }
    : {
        // 85 is reserved for the hero portrait so it renders crisper than grid thumbnails.
        qualities: [75, 85],
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
