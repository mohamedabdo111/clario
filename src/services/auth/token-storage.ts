import { storageKeys } from "@/lib/constants/storage-keys";
import { storage } from "@/services/storage/storage";

/**
 * Persists the session token. "Remember me" keeps it in localStorage;
 * otherwise it lives in sessionStorage and ends with the browser session.
 */
export const tokenStorage = {
  get(): string | null {
    return storage.get<string>(storageKeys.sessionToken, "local") ?? storage.get<string>(storageKeys.sessionToken, "session");
  },
  set(token: string, remember: boolean) {
    this.clear();
    storage.set(storageKeys.sessionToken, token, remember ? "local" : "session");
  },
  clear() {
    storage.remove(storageKeys.sessionToken, "local");
    storage.remove(storageKeys.sessionToken, "session");
  },
};
