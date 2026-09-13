"use client";

import { m, useInView, Variants, UseInViewOptions } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
  /**
   * Reveal with CSS instead of motion, for content inside the first viewport.
   *
   * motion renders `opacity: 0` into the static HTML and only animates once
   * React hydrates, which on mobile delayed the largest element on the page by
   * several seconds. A CSS animation runs as soon as the browser paints.
   */
  eager?: boolean;
  /** Element to render. The events timeline needs real `<li>` children. */
  as?: "div" | "li";
}

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.3,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "4px",
  eager = false,
  as = "div",
}: BlurFadeProps) => {
  const Tag = as === "li" ? "li" : "div";
  const MotionTag = as === "li" ? m.li : m.div;
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };
  const combinedVariants = variant || defaultVariants;

  if (eager) {
    return (
      <Tag
        className={cn("animate-blur-in", className)}
        style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      >
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default BlurFade;
