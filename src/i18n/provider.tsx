"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale, Translations } from "./types";
import en from "./en";
import es from "./es";
import fr from "./fr";
import de from "./de";
import it from "./it";

const translations: Record<string, Translations> = {
  en,
  es,
  fr,
  de,
  it,
};

function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? en;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
}

const COOKIE_NAME = "locale";
const ONE_YEAR = 60 * 60 * 24 * 365;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = getCookie(COOKIE_NAME);
    if (saved && ["en", "es", "fr", "de", "it"].includes(saved)) {
      setLocaleState(saved as Locale);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setCookie(COOKIE_NAME, newLocale, ONE_YEAR);
  }, []);

  const t = useCallback(
    (key: keyof Translations): string => {
      const dict = getTranslations(locale);
      if (key in dict) {
        return dict[key];
      }
      // Fallback to English
      return en[key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
