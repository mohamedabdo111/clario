import { QueryCache, QueryClient } from "@tanstack/react-query";
import { ApiError } from "@/services/api";
import { sessionEvents } from "@/services/auth/session-events";

const MAX_RETRIES = 2;

function isClientError(error: unknown) {
  return error instanceof ApiError && error.status >= 400 && error.status < 500;
}

export function createQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof ApiError && error.code === "unauthorized") sessionEvents.emitUnauthorized();
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        // 4xx responses won't succeed on retry; network and server errors might.
        retry: (failureCount, error) => !isClientError(error) && failureCount < MAX_RETRIES,
      },
      mutations: { retry: false },
    },
  });
}
