"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Loads only the animation features this site actually uses.
 *
 * Importing `motion` pulls in every feature framer-motion has, including drag,
 * pan and layout animations that nothing here touches. `LazyMotion` + the `m`
 * component ship just the subset declared below.
 *
 * `domAnimation` covers animations, variants and exit animations
 * (`AnimatePresence`); `domMax` would add drag and layout animations, which the
 * dock, the reveals and the hero title do not need.
 *
 * `strict` makes any leftover `motion.*` throw instead of silently pulling the
 * full bundle back in.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
