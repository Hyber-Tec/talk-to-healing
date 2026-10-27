import type { NextConfig } from "next";

/**
 * Two build targets from one codebase:
 * - default: a regular Next.js app with on-demand image optimization (production hosting);
 * - STATIC_EXPORT=1: plain static files for GitHub Pages, served from NEXT_PUBLIC_BASE_PATH.
 */
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export cannot prerender partially, so those features are on only for the server build.
  cacheComponents: !staticExport,
  partialPrefetching: !staticExport,
  env: {
    // Stamped at build time so the footer year needs no runtime clock.
    BUILD_YEAR: String(new Date().getFullYear()),
  },
  basePath,
  ...(staticExport && { output: "export" }),
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
