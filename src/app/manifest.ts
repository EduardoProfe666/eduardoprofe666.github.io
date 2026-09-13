import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * The static manifest this replaces listed `portfolio.png` as a 512x512
 * "any maskable" icon. That file is 2301x1588, so the declaration was false and
 * the install prompt never qualified.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Eduardo González — Fullstack Team Lead & AI Engineer",
    short_name: "Eduardo G.",
    description:
      "Fullstack Team Lead & AI Engineer with 4+ years of experience. Building scalable solutions with modern stacks, AI integration, and DevOps practices.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    // Matches `background_color` and the default theme. The old #171717
    // was not a colour the site uses anywhere.
    theme_color: "#ffffff",
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
}
