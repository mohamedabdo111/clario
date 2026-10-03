export type ApiErrorCode =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "validation_failed"
  | "rate_limited"
  | "server_error"
  | "network_error"
  | "invalid_credentials"
  | "invalid_token";

export class ApiError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;
  /** Field-level messages from the server, keyed by field name. */
  readonly fieldErrors: Record<string, string>;

  constructor(status: number, code: ApiErrorCode, message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

const STATUS_CODES: Record<number, ApiErrorCode> = {
  400: "bad_request",
  401: "unauthorized",
  403: "forbidden",
  404: "not_found",
  409: "conflict",
  422: "validation_failed",
  429: "rate_limited",
};

export function codeFromStatus(status: number): ApiErrorCode {
  return STATUS_CODES[status] ?? "server_error";
}

/** A message that is safe to show to the user for any thrown value. */
export function getErrorMessage(error: unknown, fallback = "Something went wrong. Try again.") {
  if (error instanceof ApiError) {
    if (error.code === "network_error") return "Can't reach the server. Check your connection and try again.";
    if (error.code === "server_error") return fallback;
    return error.message;
  }
  return fallback;
}
