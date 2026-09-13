"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * magicui/animated-theme-toggler
 * https://magicui.design/docs/components/animated-theme-toggler
 *
 * Swaps the theme inside a View Transition and animates a clip-path mask out
 * from the button, so the new theme wipes across the page instead of snapping.
 * Falls back to a plain toggle where `startViewTransition` is unavailable or
 * the visitor asked for reduced motion.
 *
 * Vendored from the registry so it can be upgraded deliberately; the only local
 * changes are formatting and the reduced-motion guard.
 */

export type TransitionVariant =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "star";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  variant?: TransitionVariant;
  /** Expand from the viewport center instead of the button center. */
  fromCenter?: boolean;
  /**
   * Controlled theme value. When provided, the parent owns persistence
   * (e.g. `@/lib/theme`) and this component will not write to localStorage.
   */
  theme?: "light" | "dark";
  /** Called on toggle. Pair with `theme` for controlled usage. */
  onThemeChange?: (theme: "light" | "dark") => void;
}

function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(", ");
  return `polygon(${pairs})`;
}

// All coordinates are percentages of the snapshot reference box: Chrome renders
// absolute px clip-path coordinates on ::view-transition-new(root) unscaled on
// fractional display scales for the first transition after load, so px values
// would land at the wrong position.
const GLIDE = `cubic-bezier(${EASE.glide.join(", ")})`;

function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`;
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`;
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`;
  // circle() percentage radii resolve against hypot(w, h) / sqrt(2) of the box.
  const toRadius = (r: number) =>
    `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`;

  switch (variant) {
    case "square": {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const halfSide = Math.max(halfW, halfH) * 1.05;
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case "triangle": {
      const scale = maxRadius * 2.2;
      const dx = (Math.sqrt(3) / 2) * scale;
      const verts = [
        point(cx, cy - scale),
        point(cx + dx, cy + 0.5 * scale),
        point(cx - dx, cy + 0.5 * scale),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 3), `polygon(${verts})`];
    }
    case "diamond": {
      // Slightly larger than the circle radius so axis-aligned coverage matches.
      const R = maxRadius * Math.SQRT2;
      const end = [
        point(cx, cy - R),
        point(cx + R, cy),
        point(cx, cy + R),
        point(cx - R, cy),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case "hexagon": {
      const R = maxRadius * Math.SQRT2;
      const verts: string[] = [];
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        verts.push(point(cx + R * Math.cos(a), cy + R * Math.sin(a)));
      }
      return [
        polygonCollapsed(point(cx, cy), 6),
        `polygon(${verts.join(", ")})`,
      ];
    }
    case "rectangle": {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const end = [
        point(cx - halfW, cy - halfH),
        point(cx + halfW, cy - halfH),
        point(cx + halfW, cy + halfH),
        point(cx - halfW, cy + halfH),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case "star": {
      // Small overscan so the last frames never leave a 1px seam.
      const R = maxRadius * Math.SQRT2 * 1.03;
      const innerRatio = 0.42;
      const starPolygon = (radius: number) => {
        const verts: string[] = [];
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
          verts.push(
            point(cx + radius * Math.cos(outerA), cy + radius * Math.sin(outerA))
          );
          const innerA = outerA + Math.PI / 5;
          verts.push(
            point(
              cx + radius * innerRatio * Math.cos(innerA),
              cy + radius * innerRatio * Math.sin(innerA)
            )
          );
        }
        return `polygon(${verts.join(", ")})`;
      };
      return [starPolygon(Math.max(2, R * 0.025)), starPolygon(R)];
    }
    case "circle":
    default:
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
      ];
  }
}

export function AnimatedThemeToggler({
  className,
  duration = 450,
  variant = "circle",
  fromCenter = false,
  theme,
  onThemeChange,
  ...props
}: AnimatedThemeTogglerProps) {
  const isControlled = theme !== undefined;
  const [internalIsDark, setInternalIsDark] = useState(false);
  const isDark = isControlled ? theme === "dark" : internalIsDark;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTransitioningRef = useRef(false);
  const activeAnimRef = useRef<Animation | null>(null);

  const cancelAnim = useCallback(() => {
    activeAnimRef.current?.cancel();
    activeAnimRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      cancelAnim();
      const root = document.documentElement;
      if (root.dataset.magicuiThemeVt !== "active") return;
      delete root.dataset.magicuiThemeVt;
      root.style.removeProperty("--magicui-theme-toggle-vt-duration");
      root.style.removeProperty("--magicui-theme-vt-clip-from");
    };
  }, [cancelAnim]);

  useEffect(() => {
    if (isControlled) return;

    const updateTheme = () =>
      setInternalIsDark(document.documentElement.classList.contains("dark"));

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [isControlled]);

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    if (
      !button ||
      isTransitioningRef.current ||
      document.documentElement.dataset.magicuiThemeVt === "active"
    ) {
      return;
    }

    // innerWidth/innerHeight (not visualViewport): percentages resolve against
    // the snapshot reference box, which includes classic scrollbars.
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x: number;
    let y: number;
    if (fromCenter) {
      x = viewportWidth / 2;
      y = viewportHeight / 2;
    } else {
      const { top, left, width, height } = button.getBoundingClientRect();
      x = left + width / 2;
      y = top + height / 2;
    }

    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    );

    const applyTheme = () => {
      const newTheme = !isDark;
      // Toggle synchronously so the View Transitions API snapshots the new
      // theme from inside the startViewTransition callback.
      document.documentElement.classList.toggle("dark");
      if (isControlled) {
        onThemeChange?.(newTheme ? "dark" : "light");
      } else {
        setInternalIsDark(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      }
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      prefersReducedMotion ||
      typeof document.startViewTransition !== "function"
    ) {
      applyTheme();
      return;
    }

    const clipPath = getThemeTransitionClipPaths(
      variant,
      x,
      y,
      maxRadius,
      viewportWidth,
      viewportHeight
    );

    const root = document.documentElement;
    root.dataset.magicuiThemeVt = "active";
    root.style.setProperty(
      "--magicui-theme-toggle-vt-duration",
      `${duration}ms`
    );
    // Pin the collapsed clip-path via CSS so Firefox does not paint the new
    // theme unclipped between the snapshot and the ready.then() animation.
    root.style.setProperty("--magicui-theme-vt-clip-from", clipPath[0]);

    const cleanup = () => {
      isTransitioningRef.current = false;
      delete root.dataset.magicuiThemeVt;
      root.style.removeProperty("--magicui-theme-toggle-vt-duration");
      root.style.removeProperty("--magicui-theme-vt-clip-from");
      cancelAnim();
    };

    isTransitioningRef.current = true;
    const transition = document.startViewTransition(() => {
      flushSync(applyTheme);
    });

    if (typeof transition?.finished?.finally === "function") {
      transition.finished.finally(cleanup).catch(() => {});
    } else {
      cleanup();
    }

    const ready = transition?.ready;
    if (ready && typeof ready.then === "function") {
      ready
        .then(() => {
          activeAnimRef.current = document.documentElement.animate(
            { clipPath },
            {
              duration,
              // Star: linear avoids easing overshoot at t -> 1. Everything
              // else is a shape travelling across the screen, which is what
              // the glide curve is for — and it is the same curve the rest of
              // the page moves on, rather than a second opinion.
              easing: variant === "star" ? "linear" : GLIDE,
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {});
    }
  }, [
    variant,
    fromCenter,
    duration,
    isDark,
    isControlled,
    onThemeChange,
    cancelAnim,
  ]);

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      {...props}
    >
      {isDark ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}
