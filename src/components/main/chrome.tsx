"use client";

import { useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { TooltipProvider } from "@/components/common/tooltip";
import { BackToTop } from "@/components/main/back-to-top";
import Navbar from "@/components/main/navbar";
import { Spotlight } from "@/components/main/spotlight";
import { installFeedback } from "@/lib/feedback";

/**
 * Everything that floats over the page: the dock, the ⌘K palette, the
 * back-to-top button, and the one delegated listener behind every hover and
 * press cue.
 *
 * These are one island rather than four because they share the tooltip
 * provider and the motion feature set, and because none of them contributes
 * anything to the prerendered document — the dock waits for the theme and the
 * locale, the palette is closed, the button is off-screen. The page mounts it
 * with `client:only`, so no build-time render is wasted producing markup that
 * is empty by design.
 */
export default function Chrome() {
  useEffect(() => installFeedback(), []);

  return (
    <LazyMotion features={domAnimation} strict>
      <TooltipProvider delayDuration={100}>
        <Navbar />
        <Spotlight />
        <BackToTop />
      </TooltipProvider>
    </LazyMotion>
  );
}
