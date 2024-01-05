import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: 'https://eduardoprofe666.github.io/',
  integrations: [tailwind(), markdoc()]
});