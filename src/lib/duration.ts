import type { Locale, TranslationKey } from "@/i18n/types";

export type Translate = (key: TranslationKey) => string;

/** `YYYY-MM`, as stored in `src/data/resume.tsx`. */
export type YearMonth = `${number}-${number}`;

export function parseYearMonth(value: YearMonth): Date {
  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

/** Whole months between two dates, never less than one. */
export function monthsBetween(from: Date, to: Date): number {
  const months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  return Math.max(1, months);
}

/**
 * `Intl.DateTimeFormat` instances are comparatively expensive to build, and the
 * page renders a few dozen dates, so one is kept per locale.
 */
const formatters = new Map<Locale, Intl.DateTimeFormat>();

function monthYearFormatter(locale: Locale): Intl.DateTimeFormat {
  let formatter = formatters.get(locale);
  if (!formatter) {
    // `long` keeps the English output byte-for-byte identical to the hardcoded
    // strings this replaced, and gives real month names everywhere else.
    formatter = new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    });
    formatters.set(locale, formatter);
  }
  return formatter;
}

/** e.g. `May 2024`, `mayo de 2024`, `Mai 2024`. */
export function formatYearMonth(value: YearMonth, locale: Locale): string {
  return monthYearFormatter(locale).format(parseYearMonth(value));
}

/** e.g. `May 2024 - September 2026`, or `December 2025 - Present`. */
export function formatPeriod(
  start: YearMonth,
  end: YearMonth | null,
  locale: Locale,
  t: Translate
): string {
  const to = end === null ? t("date.present") : formatYearMonth(end, locale);
  return `${formatYearMonth(start, locale)} - ${to}`;
}

/**
 * Formats a month count using the active locale's unit labels.
 *
 * These `duration.*` keys existed in all five dictionaries but nothing read
 * them: the units were hardcoded in English.
 */
export function formatMonths(months: number, t: Translate): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;

  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${t(years === 1 ? "duration.year" : "duration.years")}`);
  }
  if (rest > 0 || years === 0) {
    const value = rest || 1;
    parts.push(`${value} ${t(value === 1 ? "duration.month" : "duration.months")}`);
  }
  return parts.join(" ");
}

/** e.g. `2 yrs 4 mos`, or `9 mos and counting` while a role is ongoing. */
export function calcDuration(
  start: YearMonth,
  end: YearMonth | null,
  t: Translate
): string {
  const to = end === null ? new Date() : parseYearMonth(end);
  const label = formatMonths(monthsBetween(parseYearMonth(start), to), t);
  return end === null ? `${label} ${t("duration.andCounting")}` : label;
}

/** e.g. `2 years ago`, `hace 2 años`. `null` for the current month. */
export function formatTimeAgo(
  value: YearMonth,
  t: Translate
): string | null {
  const from = parseYearMonth(value);
  const now = new Date();
  const months =
    (now.getFullYear() - from.getFullYear()) * 12 +
    (now.getMonth() - from.getMonth());

  if (months < 1) return null;
  return t("timeago.ago").replace("{value}", formatMonths(months, t));
}
