import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  turbopack: {
    root: __dirname,
    resolveAlias: {
      tailwindcss: resolve(__dirname, "node_modules/tailwindcss"),
    },
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icon-cloud"],
  },
};

export default nextConfig;
