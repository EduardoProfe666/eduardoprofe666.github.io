import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // `Host:` is dropped: it was a Yandex-only directive that Google has never
    // supported, and the canonical tag already states the preferred origin.
    rules: [{ userAgent: "*", allow: "/", disallow: "/_next/" }],
    sitemap: `${DATA.url}/sitemap.xml`,
  };
}
