"use client";

import { Calendar, Clock } from "lucide-react";
import { useMemo } from "react";

const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3,
  May: 4, June: 5, July: 6, August: 7,
  September: 8, October: 9, November: 10, December: 11,
};

function parseProjectDate(str: string): Date | null {
  const parts = str.trim().split(" ");
  if (parts.length === 2 && MONTHS[parts[0]] !== undefined) {
    return new Date(Number(parts[1]), MONTHS[parts[0]]);
  }
  if (parts.length === 1 && /^\d{4}$/.test(parts[0])) {
    return new Date(Number(parts[0]), 0);
  }
  return null;
}

function formatAgo(date: Date): string {
  const now = new Date();
  let months = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
  if (months < 1) return "this month";
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} month${m !== 1 ? "s" : ""} ago`;
  if (m === 0) return `${y} year${y !== 1 ? "s" : ""} ago`;
  return `${y} year${y !== 1 ? "s" : ""} ${m} month${m !== 1 ? "s" : ""} ago`;
}

export function TimeAgo({ dates }: { dates: string }) {
  const ago = useMemo(() => {
    // Handle ranges like "November 2022 - Present"
    const parts = dates.split(" - ");
    const startStr = parts[0].trim();
    const startDate = parseProjectDate(startStr);
    if (!startDate) return null;

    if (parts.length > 1 && parts[1].trim() === "Present") {
      const months = (new Date().getFullYear() - startDate.getFullYear()) * 12 + (new Date().getMonth() - startDate.getMonth());
      const y = Math.floor(months / 12);
      const m = months % 12;
      if (y === 0) return `${m} month${m !== 1 ? "s" : ""} and counting`;
      if (m === 0) return `${y} year${y !== 1 ? "s" : ""} and counting`;
      return `${y} year${y !== 1 ? "s" : ""} ${m} month${m !== 1 ? "s" : ""} and counting`;
    }

    return formatAgo(startDate);
  }, [dates]);

  if (!ago) {
    return (
      <div className="flex items-center gap-1.5">
        <Calendar className="size-3 text-muted-foreground" />
        <time className="text-xs text-muted-foreground">{dates}</time>
      </div>
    );
  }

  return (
    <div className="h-4 overflow-hidden clip-content">
      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-4">
        <div className="h-4 flex items-center gap-1.5">
          <Calendar className="size-3 text-muted-foreground" />
          <time className="text-xs text-muted-foreground">{dates}</time>
        </div>
        <div className="h-4 flex items-center gap-1.5">
          <Clock className="size-3 text-foreground/70" />
          <span className="text-xs font-medium text-foreground/70">{ago}</span>
        </div>
      </div>
    </div>
  );
}
