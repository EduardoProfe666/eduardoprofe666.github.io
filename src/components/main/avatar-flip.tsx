"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar";
import { useCallback, useRef, useState } from "react";

interface AvatarFlipProps {
  src: string;
  alt: string;
  fallback: string;
}

export function AvatarFlip({ src, alt, fallback }: AvatarFlipProps) {
  const [showBack, setShowBack] = useState(false);
  const [animating, setAnimating] = useState(false);
  const clickCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    if (animating) return;

    if (showBack) {
      setAnimating(true);
      setShowBack(false);
      setTimeout(() => setAnimating(false), 800);
      return;
    }

    clickCount.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { clickCount.current = 0; }, 700);

    if (clickCount.current >= 3) {
      clickCount.current = 0;
      setAnimating(true);
      setShowBack(true);
      setTimeout(() => setAnimating(false), 800);
    }
  }, [animating, showBack]);

  return (
    <div className="relative group/avatar select-none" onClick={handleClick}>
      {/* Glow */}
      <div
        className={`absolute -inset-3 rounded-full transition-all duration-700 ${
          animating
            ? "opacity-100 blur-2xl bg-gradient-to-br from-violet-500/20 via-rose-500/15 to-amber-500/20"
            : showBack
              ? "opacity-50 blur-xl bg-amber-500/10"
              : "opacity-0 blur-md group-hover/avatar:opacity-100 bg-gradient-to-br from-foreground/5 to-foreground/10"
        }`}
      />

      {/* Front */}
      <div
        className="relative size-28 cursor-pointer"
        style={{
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s",
          transform: showBack ? "rotateY(90deg) scale(0.9)" : "rotateY(0deg) scale(1)",
          opacity: showBack ? 0 : 1,
        }}
      >
        <Avatar className="size-28 border-2 border-border shadow-xl ring-4 ring-border/20 group-hover/avatar:ring-foreground/15 group-hover/avatar:shadow-2xl group-hover/avatar:scale-[1.03] transition-all duration-500">
          <AvatarImage
            alt={alt}
            src={src}
            loading="eager"
            className="group-hover/avatar:brightness-105 transition-[filter] duration-500"
          />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </div>

      {/* Back */}
      <div
        className="absolute inset-0 size-28 rounded-full border-2 border-amber-300/60 dark:border-amber-700/40 shadow-xl ring-4 ring-amber-200/20 dark:ring-amber-800/15 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950 dark:via-yellow-950 dark:to-orange-950 flex items-center justify-center cursor-pointer"
        style={{
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s",
          transform: showBack ? "rotateY(0deg) scale(1)" : "rotateY(-90deg) scale(0.9)",
          opacity: showBack ? 1 : 0,
          pointerEvents: showBack ? "auto" : "none",
        }}
      >
        <span className="text-5xl drop-shadow-md select-none">🎩</span>
      </div>
    </div>
  );
}
