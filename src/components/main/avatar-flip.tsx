"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface AvatarFlipProps {
  src: string;
  alt: string;
  fallback: string;
}

/** Milliseconds the whole toss takes. */
const SPIN_MS = 2200;

/**
 * Degrees added per click: two and a half turns.
 *
 * Has to be an odd multiple of 180 so the coin always finishes on the opposite
 * face.
 */
const SPIN_DEGREES = 900;

/**
 * Almost all the rotation is spent in the first third; the rest is the coin
 * drifting into place and settling with a slight overshoot.
 *
 * This is what makes the animation readable: the fast turns happen while the
 * coin is small, high and blurred, and the final half-turn — the one that
 * reveals the hat — is the slowest and closest.
 */
const SPIN_EASING = "cubic-bezier(0.1, 0.82, 0.16, 1.03)";

const faceStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  // Each face is painted only while turned towards the viewer. Without this the
  // portrait would show through the hat, mirrored.
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

/**
 * Hidden easter egg: clicking the portrait tosses it like a coin — it flies up,
 * spins two and a half times in 3D and lands showing a top hat. Clicking again
 * tosses it back.
 *
 * A two-sided plane has no thickness, so mid-turn there is literally nothing to
 * paint and a fast multi-turn flip reads as flickering. Rather than faking an
 * edge, the toss leans into it: the coin shrinks, rises and picks up a motion
 * blur while it is spinning quickly, which is exactly what a real tossed coin
 * looks like, then comes back to full size for the slow final reveal.
 */
export function AvatarFlip({ src, alt, fallback }: AvatarFlipProps) {
  const [flips, setFlips] = useState(0);
  const [spinning, setSpinning] = useState(false);
  // Set from the click handler rather than an effect, so the render that
  // applies the new angle already knows whether it may animate.
  const [reducedMotion, setReducedMotion] = useState(false);
  const tossRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    },
    []
  );

  const handleClick = useCallback(() => {
    if (spinning) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setReducedMotion(prefersReducedMotion);
    setFlips((count) => count + 1);

    // Honouring the preference means no spin at all: the faces just swap.
    if (prefersReducedMotion) return;

    setSpinning(true);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setSpinning(false), SPIN_MS);

    // The flight lives on a wrapper *outside* the perspective container: a
    // `filter` establishes its own rendering context, so blurring the element
    // that also owns the 3D scene would flatten the spin.
    //
    // Driving it with the Web Animations API means every click restarts it
    // cleanly — a CSS animation would need a forced reflow to replay.
    // `linear` so the offsets below line up with real time: the shape lives in
    // the keyframes, not in an easing curve that would bunch them up at the
    // start and let the blur fade while the coin is still spinning fast.
    tossRef.current?.animate(
      [
        { transform: "translateY(0) scale(1)", filter: "blur(0px)" },
        {
          transform: "translateY(-24px) scale(0.78)",
          filter: "blur(1.8px)",
          offset: 0.12,
        },
        {
          transform: "translateY(-32px) scale(0.8)",
          filter: "blur(0.8px)",
          offset: 0.4,
        },
        {
          transform: "translateY(-14px) scale(0.92)",
          filter: "blur(0.15px)",
          offset: 0.75,
        },
        { transform: "translateY(0) scale(1)", filter: "blur(0px)" },
      ],
      { duration: SPIN_MS, easing: "linear" }
    );
  }, [spinning]);

  const showHat = flips % 2 === 1;

  return (
    <div className="relative group/avatar select-none" onClick={handleClick}>
      {/* Glow */}
      <div
        className={`absolute -inset-3 rounded-full transition-all duration-700 ${
          spinning
            ? "opacity-100 blur-2xl bg-gradient-to-br from-violet-500/20 via-rose-500/15 to-amber-500/20"
            : showHat
              ? "opacity-50 blur-xl bg-amber-500/10"
              : "opacity-0 blur-md group-hover/avatar:opacity-100 bg-gradient-to-br from-foreground/5 to-foreground/10"
        }`}
      />

      {/* Flight: lift, shrink and motion blur */}
      <div ref={tossRef} className="relative size-28">
        {/* 3D scene */}
        <div className="relative size-28" style={{ perspective: "1100px" }}>
          <div
            className="relative size-28 cursor-pointer"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${flips * (reducedMotion ? 180 : SPIN_DEGREES)}deg)`,
              transition: reducedMotion
                ? "none"
                : `transform ${SPIN_MS}ms ${SPIN_EASING}`,
            }}
          >
            {/* Front */}
            <div style={faceStyle}>
              {/* A plain <img>, not Radix's Avatar: that one mounts the image
                  from JavaScript, so the browser could not discover it in the
                  initial HTML and waited 3.2s after hydration before even
                  requesting it — which made this the Largest Contentful Paint.
                  The initials sit behind it as a no-JS fallback. */}
              <span className="relative flex size-28 shrink-0 overflow-hidden rounded-full border-2 border-border shadow-xl ring-4 ring-border/20 group-hover/avatar:ring-foreground/15 group-hover/avatar:shadow-2xl group-hover/avatar:scale-[1.03] transition-all duration-500">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center bg-muted text-sm font-medium"
                >
                  {fallback}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element -- `output: export`
                    serves unoptimized images, so next/image would add nothing here. */}
                <img
                  alt={alt}
                  src={src}
                  width={256}
                  height={256}
                  fetchPriority="high"
                  decoding="async"
                  className="relative aspect-square h-full w-full object-cover group-hover/avatar:brightness-105 transition-[filter] duration-500"
                />
              </span>
            </div>

            {/* Back */}
            <div
              aria-hidden="true"
              style={{ ...faceStyle, transform: "rotateY(180deg)" }}
              className="size-28 rounded-full border-2 border-amber-300/60 dark:border-amber-700/40 shadow-xl ring-4 ring-amber-200/20 dark:ring-amber-800/15 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950 dark:via-yellow-950 dark:to-orange-950 flex items-center justify-center cursor-pointer"
            >
              <span className="text-5xl drop-shadow-md select-none">🎩</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
