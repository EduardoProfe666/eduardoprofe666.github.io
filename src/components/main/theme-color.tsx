"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

/**
 * Must match `--background` in globals.css. The browser paints its own chrome
 * with this, so a value that is merely close reads as a seam.
 */
const COLORS = { light: "#ffffff", dark: "#08090a" } as const;

/**
 * Keeps the browser chrome on the theme the visitor actually chose.
 *
 * The two `theme-color` metas in the document are gated on
 * `prefers-color-scheme`, which is the operating system's opinion, not the
 * page's. Someone on a light system who switches this page to dark was getting
 * a white address bar above a black page — very visible on iOS Safari, and it
 * undercuts the one control the whole theme toggle exists for.
 *
 * Both metas get the resolved colour, so whichever one the media query picks is
 * already right.
 */
export function ThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Undefined until next-themes has read storage and the system preference.
    if (!resolvedTheme) return;
    const color = COLORS[resolvedTheme === "dark" ? "dark" : "light"];
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.setAttribute("content", color);
    }
  }, [resolvedTheme]);

  return null;
}
