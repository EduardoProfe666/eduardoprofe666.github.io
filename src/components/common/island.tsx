import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The root of every hydrated island.
 *
 * Astro gives each island its own React root, so anything that used to sit in
 * one provider at the top of the app has to be re-established per island. The
 * two stores (theme, locale) solve that by living in module scope instead;
 * framer-motion's feature set genuinely is per-tree, so it is provided here.
 *
 * `domAnimation` covers animations, variants and exit animations
 * (`AnimatePresence`) — `domMax` would add drag and layout animations, which
 * nothing on this page uses. `strict` makes a stray `motion.*` throw rather
 * than silently pulling the full bundle back in.
 */
export function Island({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
