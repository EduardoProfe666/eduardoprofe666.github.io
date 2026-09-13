"use client";

import { Calendar, Clock } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "@/i18n/store";
import {
  formatTimeAgo,
  formatYearMonth,
  type YearMonth,
} from "@/lib/duration";

/**
 * Shows a project's date, swapping to how long ago it was on hover.
 *
 * Both halves are localized: the date through `Intl.DateTimeFormat` and the
 * relative label through the `timeago.*` keys. The previous version received a
 * pre-rendered English string like `August 2024` and appended `ago` to it, so
 * neither half ever changed language.
 */
export function TimeAgo({ date }: { date: YearMonth }) {
  const { t, locale } = useTranslation();

  const formatted = useMemo(
    () => formatYearMonth(date, locale),
    [date, locale]
  );
  const ago = useMemo(() => formatTimeAgo(date, t), [date, t]);

  if (!ago) {
    return (
      <div className="flex items-center gap-1.5">
        <Calendar className="size-3 text-muted-foreground" />
        <time dateTime={date} className="text-xs text-muted-foreground">
          {formatted}
        </time>
      </div>
    );
  }

  return (
    <div className="h-4 overflow-hidden clip-content">
      <div className="flex flex-col transition-transform duration-400 ease-spring group-hover:-translate-y-4">
        <div className="h-4 flex items-center gap-1.5">
          <Calendar className="size-3 text-muted-foreground" />
          <time dateTime={date} className="text-xs text-muted-foreground">
            {formatted}
          </time>
        </div>
        <div className="h-4 flex items-center gap-1.5">
          <Clock className="size-3 text-foreground/70" />
          <span className="text-xs font-medium text-foreground/70">{ago}</span>
        </div>
      </div>
    </div>
  );
}
