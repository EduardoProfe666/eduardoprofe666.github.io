import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

/** Metadata routes must opt into static generation under `output: export`. */
export const dynamic = "force-static";

/**
 * One URL, because there is one URL: the language switcher swaps the copy in
 * place rather than navigating.
 *
 * The hand-written sitemap this replaces declared five `hreflang` alternates
 * that all resolved to this same page. Google requires distinct URLs per
 * language and ignores (or flags) self-referential clusters, so the honest
 * entry is a single `<loc>` with a `lastmod` that actually moves.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DATA.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
