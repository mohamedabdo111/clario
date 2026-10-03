import { config } from "@/lib/config";
import { tokenStorage } from "@/services/auth/token-storage";
import { ApiError, codeFromStatus, type ApiErrorCode } from "./errors";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type QueryValue = string | number | boolean | undefined | null;

export interface RequestOptions {
  body?: unknown;
  query?: Record<string, QueryValue>;
  signal?: AbortSignal;
}

interface ErrorBody {
  code?: ApiErrorCode;
  message?: string;
  fieldErrors?: Record<string, string>;
}

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const url = new URL(`${config.apiBaseUrl}${path}`, window.location.origin);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  }
  return url.toString();
}

async function request<T>(method: HttpMethod, path: string, options: RequestOptions = {}): Promise<T> {
  const token = tokenStorage.get();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (options.body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(buildUrl(path, options.query), {
      method,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: options.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(0, "network_error", "Network request failed");
  }

  if (response.status === 204) return undefined as T;

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const body = (data ?? {}) as ErrorBody;
    throw new ApiError(
      response.status,
      body.code ?? codeFromStatus(response.status),
      body.message ?? response.statusText,
      body.fieldErrors,
    );
  }
  return data as T;
}

/** The only place the app talks HTTP. Feature services build on top of this. */
export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>("POST", path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>("PUT", path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>("PATCH", path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options),
};
