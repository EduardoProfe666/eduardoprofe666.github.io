import { useCallback, useSyncExternalStore } from "react";
import type { Locale, TranslationKey, Translations } from "./types";
import en from "./en";
import es from "./es";
import fr from "./fr";
import de from "./de";
import it from "./it";

/**
 * The selected locale, as a module-level store rather than a React context.
 *
 * Astro gives each island its own React root, so a provider at the top of one
 * island is invisible to the next one. Module state is shared across all of
 * them — Vite emits one instance of this file and every island imports it — so
 * the switcher in the dock updates the hero, the job cards and the ⌘K palette
 * alike, with no provider and no prop threading.
 *
 * The cookie stays the single source of truth, read through
 * `useSyncExternalStore` so there is no extra render after hydration.
 */
const translations: Record<Locale, Translations> = { en, es, fr, de, it };

const LOCALES = Object.keys(translations) as Locale[];

const COOKIE_NAME = "locale";
const ONE_YEAR = 60 * 60 * 24 * 365;
const DEFAULT_LOCALE: Locale = "en";

function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (LOCALES as string[]).includes(value);
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function readLocale(): Locale {
  const saved = getCookie(COOKIE_NAME);
  return isLocale(saved) ? saved : DEFAULT_LOCALE;
}

/** The build has no cookie jar, so the prerendered HTML is always the default. */
function readServerLocale(): Locale {
  return DEFAULT_LOCALE;
}

export function setLocale(next: Locale): void {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(next)};path=/;max-age=${ONE_YEAR};SameSite=Lax`;
  // Keeping `<html lang>` honest is not cosmetic: it is what screen readers
  // pick a voice from, what "translate this page?" keys off, and what search
  // engines read the copy as.
  document.documentElement.lang = next;
  for (const listener of listeners) listener();
}

export function translate(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] ?? en[key] ?? key;
}

export interface I18n {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

export function useTranslation(): I18n {
  const locale = useSyncExternalStore(subscribe, readLocale, readServerLocale);
  const t = useCallback((key: TranslationKey) => translate(locale, key), [locale]);
  return { locale, setLocale, t };
}

/**
 * Runs before first paint, inlined in the document head.
 *
 * The document is built with `lang="en"`. Previously a React effect corrected
 * the attribute after hydration, which left it wrong for the first paint in
 * four of the five languages; setting it here closes that window entirely.
 */
export const LOCALE_INIT_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )${COOKIE_NAME}=([^;]*)/);if(!m)return;var l=decodeURIComponent(m[1]);if(${JSON.stringify(
  LOCALES
)}.indexOf(l)>-1)document.documentElement.lang=l}catch(e){}})();`;
