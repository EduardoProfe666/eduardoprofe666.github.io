"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Locale, TranslationKey, Translations } from "./types";
import en from "./en";
import es from "./es";
import fr from "./fr";
import de from "./de";
import it from "./it";

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

/**
 * The cookie is the single source of truth for the selected locale, read
 * through `useSyncExternalStore`.
 *
 * The previous version mirrored it into `useState` and copied it across in an
 * effect, which meant an extra render after hydration on every page load — and
 * it is the pattern React's `set-state-in-effect` lint rule exists to catch.
 */
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

/** The server has no cookie jar, so SSG always renders the default locale. */
function readServerLocale(): Locale {
  return DEFAULT_LOCALE;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, readServerLocale);

  const setLocale = useCallback((next: Locale) => {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(next)};path=/;max-age=${ONE_YEAR};SameSite=Lax`;
    for (const listener of listeners) listener();
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => translations[locale][key] ?? en[key] ?? key,
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
