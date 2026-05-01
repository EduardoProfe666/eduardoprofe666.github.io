"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`group fixed bottom-20 right-4 z-40 flex items-center justify-center size-10 rounded-full border border-border bg-background/80 backdrop-blur-sm shadow-md hover:shadow-xl hover:bg-muted hover:border-foreground/20 hover:scale-110 hover:-translate-y-1 active:scale-90 transition-all duration-300 cursor-pointer ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="size-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
    </button>
  );
}
