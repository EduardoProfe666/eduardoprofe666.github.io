"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { feedbackSweep } from "@/lib/feedback";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => {
        feedbackSweep(true);
        // Smoothness comes from `scroll-behavior` in the stylesheet, so the
        // reduced-motion rule there can switch it off. Hard-coding "smooth"
        // would ignore that.
        window.scrollTo({ top: 0, behavior: "auto" });
      }}
      aria-label="Back to top"
      data-sfx="none"
      // Same glass as the dock: the two are the only things floating over the
      // page, so they should be made of the same stuff. It also scales in
      // rather than only fading, which reads as arriving instead of appearing.
      className={`material group fixed bottom-24 right-4 z-40 flex size-10 cursor-pointer items-center justify-center rounded-full transition-all duration-240 ease-state hover:scale-110 hover:-translate-y-0.5 active:scale-90 active:duration-100 ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-3 scale-90 opacity-0"
      }`}
    >
      <ArrowUp className="size-4 transition-transform duration-400 ease-spring group-hover:-translate-y-0.5" />
    </button>
  );
}
