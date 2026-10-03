const DAY_MS = 24 * 60 * 60 * 1000;

/** Simulated network latency so loading states are exercised during development. */
export function mockDelay(min = 250, max = 650) {
  const ms = Math.round(min + Math.random() * (max - min));
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function daysAgo(days: number, hours = 0) {
  return new Date(Date.now() - days * DAY_MS - hours * 60 * 60 * 1000).toISOString();
}

export function daysFromNow(days: number) {
  return new Date(Date.now() + days * DAY_MS).toISOString();
}

export function isWithinDays(iso: string, days: number) {
  const diff = new Date(iso).getTime() - Date.now();
  return diff >= 0 && diff <= days * DAY_MS;
}

export function isOlderThanDays(iso: string, days: number) {
  return Date.now() - new Date(iso).getTime() > days * DAY_MS;
}

let counter = 1000;
export function createId(prefix: string) {
  counter += 1;
  return `${prefix}_${counter.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
