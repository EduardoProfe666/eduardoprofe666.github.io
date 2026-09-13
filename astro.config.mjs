// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Static export to GitHub Pages, same as the Next.js build it replaces.
 *
 * Nothing here is fetched at runtime except the GitHub star counts on the
 * project cards; the brand marks are inlined at build time and the font is
 * self-hosted, so the deployed site talks to exactly one third-party host.
 */
export default defineConfig({
  site: "https://eduardoprofe666.github.io",
  output: "static",
  trailingSlash: "ignore",
  compressHTML: true,

  /**
   * Self-hosted Inter, replacing `next/font/google`.
   *
   * `next/font` fetched the family from Google at build time and self-hosted
   * the `latin` subset it was asked for. This does the same thing without the
   * network call: the variable font's latin cut ships inside
   * `@fontsource-variable/inter`, so the build reads it straight out of
   * `node_modules` and a deploy cannot fail — or silently ship a different cut
   * — because a CDN was slow that minute.
   *
   * One face rather than the seven the package declares. The other six are
   * Cyrillic, Greek and Vietnamese: a browser would never download them for
   * this site's five languages, but `preload` is unconditional, so declaring
   * them all cost 70 KB of fetches nobody reads a single glyph from. The range
   * below is Fontsource's own for this file, and it covers all five languages,
   * the em dash and the curly apostrophes.
   *
   * `optimizedFallbacks` still measures the real file and derives `size-adjust`
   * for system-ui, which is what stops the text reflowing when Inter lands.
   */
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-sans",
      fallbacks: ["system-ui", "sans-serif"],
      optimizedFallbacks: true,
      options: {
        variants: [
          {
            src: ["@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"],
            weight: "100 900",
            style: "normal",
            display: "swap",
            unicodeRange: [
              "U+0000-00FF",
              "U+0131",
              "U+0152-0153",
              "U+02BB-02BC",
              "U+02C6",
              "U+02DA",
              "U+02DC",
              "U+0304",
              "U+0308",
              "U+0329",
              "U+2000-206F",
              "U+20AC",
              "U+2122",
              "U+2191",
              "U+2193",
              "U+2212",
              "U+2215",
              "U+FEFF",
              "U+FFFD",
              ],
            },
          ],
      },
    },
  ],

  integrations: [react()],

  build: {
    // Islands are small and numerous; inlining the tiny ones removes a
    // round trip without bloating the document.
    inlineStylesheets: "auto",
    assets: "_assets",
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: "lightningcss",
    },
  },
});

/*
 * Hand-written `manualChunks` were tried here and removed: pinning React and
 * framer-motion to named shared chunks moved 0.7 KB of 170, because the
 * bundler already hoists anything two islands import into a common chunk. The
 * config was the only thing that got bigger.
 */
