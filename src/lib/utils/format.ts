const LOCALE = undefined; // use the browser locale

const dateFormatter = new Intl.DateTimeFormat(LOCALE, { year: "numeric", month: "short", day: "numeric" });
const dateTimeFormatter = new Intl.DateTimeFormat(LOCALE, {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});
const numberFormatter = new Intl.NumberFormat(LOCALE);
const relativeFormatter = new Intl.RelativeTimeFormat(LOCALE, { numeric: "auto" });

const RELATIVE_UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
];

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

export function formatDateTime(iso: string) {
  return dateTimeFormatter.format(new Date(iso));
}

export function formatNumber(value: number) {
  return numberFormatter.format(value);
}

/** "3 hours ago", "yesterday", "in 2 days". Falls back to "just now" under a minute. */
export function formatRelativeTime(iso: string, now: Date = new Date()) {
  const diffSeconds = (new Date(iso).getTime() - now.getTime()) / 1000;
  for (const [unit, seconds] of RELATIVE_UNITS) {
    if (Math.abs(diffSeconds) >= seconds) {
      return relativeFormatter.format(Math.round(diffSeconds / seconds), unit);
    }
  }
  return "just now";
}

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
