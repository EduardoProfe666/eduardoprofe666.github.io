"use client";

import { useEffect } from "react";
import { useTranslation } from "@/i18n/provider";

/**
 * Keeps `<html lang>` in sync with the selected locale.
 *
 * The document is statically exported as `lang="en"`, but the switcher swaps
 * the copy in place — so without this the attribute stayed wrong for four of
 * the five languages, which misleads screen readers, translation prompts and
 * search engines alike.
 */
export function HtmlLang() {
  const { locale } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
