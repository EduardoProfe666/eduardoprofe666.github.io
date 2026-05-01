export type { Locale, Translations } from "./types";
export { I18nProvider, useTranslation } from "./provider";
export { default as en } from "./en";
export { default as es } from "./es";

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
