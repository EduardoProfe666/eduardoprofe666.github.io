import { useSyncExternalStore } from "react";

/**
 * The theme, as a module-level store rather than a React context.
 *
 * `next-themes` kept the choice in a provider at the root of the tree. Astro
 * has no single React tree to put one in: each island is its own root, and a
 * context cannot cross that boundary. Module state can — every island on the
 * page imports this same module instance — so the toggle in the dock, the ⌘K
 * palette and the `<meta name="theme-color">` all read and write one value
 * without a provider anywhere.
 *
 * The storage key and its values are the ones `next-themes` used, so a visitor
 * who picked dark before this migration is still on dark after it.
 */
export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DEFAULT: Theme = "light";

/**
 * Must match `--background` in globals.css. The browser paints its own chrome
 * with this, so a value that is merely close reads as a seam.
 */
export const THEME_COLORS: Record<Theme, string> = {
  light: "#ffffff",
  dark: "#08090a",
};

const listeners = new Set<() => void>();

function read(): Theme {
  if (typeof document === "undefined") return DEFAULT;
  // The inline script in the layout has already resolved this and put it on
  // the element, so the class is the truth even before storage is consulted.
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** SSG has no storage and no DOM: the prerendered HTML is always the default. */
function readServer(): Theme {
  return DEFAULT;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

/**
 * Writes the theme to the element and to storage.
 *
 * Exported on its own because the animated toggler has to flip the class
 * *inside* a View Transition callback — the wipe animates the difference
 * between the two snapshots, so the change has to happen at that exact moment
 * rather than in an effect a frame later.
 */
export function applyTheme(next: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.style.colorScheme = next;
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.setAttribute("content", THEME_COLORS[next]);
  }
}

export function setTheme(next: Theme): void {
  applyTheme(next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Safari in private mode, and storage that is full or blocked. The theme
    // still applies for this visit; it just will not be remembered.
  }
  for (const listener of listeners) listener();
}

/** Call after mutating the class outside `setTheme` (the View Transition path). */
export function notifyThemeChange(): void {
  for (const listener of listeners) listener();
}

export function useTheme(): {
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
} {
  const resolvedTheme = useSyncExternalStore(subscribe, read, readServer);
  // `setTheme` is module scope, so its identity is already stable across
  // renders — there is nothing for `useCallback` to preserve.
  return { resolvedTheme, setTheme };
}

/**
 * Runs before first paint, inlined in the document head.
 *
 * Without it the page would paint light, then swap to dark once React had
 * hydrated and read storage — the flash `next-themes` existed to prevent.
 * Kept as a string so it can be emitted verbatim by the Astro layout.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  STORAGE_KEY
)});if(t!=="dark"&&t!=="light")t=${JSON.stringify(
  DEFAULT
)};var r=document.documentElement;if(t==="dark")r.classList.add("dark");r.style.colorScheme=t;var c=t==="dark"?${JSON.stringify(
  THEME_COLORS.dark
)}:${JSON.stringify(
  THEME_COLORS.light
)};var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++)m[i].setAttribute("content",c)}catch(e){}})();`;
