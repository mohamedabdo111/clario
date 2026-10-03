type StorageArea = "local" | "session";

function getArea(area: StorageArea): Storage | null {
  try {
    return area === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    // Access can throw in private mode or when site data is blocked.
    return null;
  }
}

/** Browser storage that never throws. Values are stored as JSON. */
export const storage = {
  get<T>(key: string, area: StorageArea = "local"): T | null {
    try {
      const raw = getArea(area)?.getItem(key);
      return raw == null ? null : (JSON.parse(raw) as T);
    } catch {
      return null;
    }
  },
  set<T>(key: string, value: T, area: StorageArea = "local") {
    try {
      getArea(area)?.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota or access errors; storage is a convenience, not a guarantee.
    }
  },
  remove(key: string, area: StorageArea = "local") {
    try {
      getArea(area)?.removeItem(key);
    } catch {
      // Ignore.
    }
  },
};
