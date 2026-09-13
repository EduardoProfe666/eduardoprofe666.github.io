import type { APIRoute } from "astro";
import { SITE_URL } from "@/lib/seo";

/**
 * One URL, because there is one URL: the language switcher swaps the copy in
 * place rather than navigating.
 *
 * A hand-written sitemap here once declared five `hreflang` alternates that all
 * resolved to this same page. Google requires distinct URLs per language and
 * ignores — or flags — self-referential clusters, so the honest entry is a
 * single `<loc>` with a `lastmod` that actually moves.
 */
export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>${SITE_URL}</loc>
<lastmod>${new Date().toISOString()}</lastmod>
<changefreq>monthly</changefreq>
<priority>1</priority>
</url>
</urlset>
`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  );
