"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroTitleProps {
  name: string;
  alias: string;
}

export function HeroTitle({ name, alias }: HeroTitleProps) {
  const [showAlias, setShowAlias] = useState(false);
  const clickCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    clickCount.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { clickCount.current = 0; }, 700);

    if (clickCount.current >= 3) {
      clickCount.current = 0;
      setShowAlias((v) => !v);
    }
  }, []);

  const displayName = showAlias ? alias : name;
  const emoji = showAlias ? "🎩" : "👋";

  return (
    <h1
      className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-5xl/none text-balance cursor-default select-none"
      onClick={handleClick}
    >
      <span>Hi, I&apos;m </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayName}
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="inline-block"
        >
          {displayName}
        </motion.span>
      </AnimatePresence>
      <span> </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={emoji}
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className={`inline-block ${!showAlias ? "origin-[70%_70%] hover:animate-wave" : "hover:rotate-12 transition-transform duration-300"}`}
        >
          {emoji}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}
