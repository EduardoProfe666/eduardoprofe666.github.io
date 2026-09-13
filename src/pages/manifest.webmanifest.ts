import type { APIRoute } from "astro";
import { THEME_COLOR } from "@/lib/seo";

/**
 * The static manifest this replaced years ago listed `portfolio.png` as a
 * 512x512 "any maskable" icon. That file is 2301x1588, so the declaration was
 * false and the install prompt never qualified.
 */
const manifest = {
  name: "Eduardo González — Fullstack Team Lead & AI Engineer",
  short_name: "Eduardo G.",
  description:
    "Fullstack Team Lead & AI Engineer with 4+ years of experience. Building scalable solutions with modern stacks, AI integration, and DevOps practices.",
  id: "/",
  start_url: "/",
  scope: "/",
  display: "standalone",
  orientation: "portrait-primary",
  background_color: THEME_COLOR.light,
  // Matches `background_color` and the default theme. The old #171717 was not
  // a colour the site uses anywhere.
  theme_color: THEME_COLOR.light,
  lang: "en",
  dir: "ltr",
  categories: ["portfolio", "technology", "education"],
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    {
      src: "/icon-maskable-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(manifest), {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
  });
