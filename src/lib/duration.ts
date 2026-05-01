const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3,
  May: 4, June: 5, July: 6, August: 7,
  September: 8, October: 9, November: 10, December: 11,
};

function parseDate(str: string): Date {
  if (str === "Present") return new Date();
  const [month, year] = str.split(" ");
  return new Date(Number(year), MONTHS[month] ?? 0);
}

export function calcDuration(start: string, end: string): string {
  const s = parseDate(start);
  const e = parseDate(end);

  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (months < 1) months = 1;

  const y = Math.floor(months / 12);
  const m = months % 12;
  const suffix = end === "Present" ? " and counting" : "";

  if (y === 0) return `${m} month${m !== 1 ? "s" : ""}${suffix}`;
  if (m === 0) return `${y} year${y !== 1 ? "s" : ""}${suffix}`;
  return `${y} year${y !== 1 ? "s" : ""} ${m} month${m !== 1 ? "s" : ""}${suffix}`;
}
