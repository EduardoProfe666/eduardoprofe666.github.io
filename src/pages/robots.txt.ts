import type { APIRoute } from "astro";
import { SITE_URL } from "@/lib/seo";

/**
 * `Host:` is not emitted: it was a Yandex-only directive that Google has never
 * supported, and the canonical tag already states the preferred origin.
 *
 * The old `Disallow: /_next/` is gone with the framework that produced that
 * directory. Astro's hashed assets live in `/_assets/`, and they should stay
 * crawlable — blocking the CSS and JS a page needs is what makes Search
 * Console report it as rendered wrong.
 */
export const GET: APIRoute = () =>
  new Response(
    `User-Agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
