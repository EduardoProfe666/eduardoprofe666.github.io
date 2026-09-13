export type { Locale, TranslationKey, Translations } from "./types";
export { setLocale, translate, useTranslation } from "./store";

export interface LocaleConfig {
  code: string;
  name: string;
  nativeName: string;
}

export const locales: LocaleConfig[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
];
