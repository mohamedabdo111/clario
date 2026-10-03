import { apiClient } from "@/services/api";
import type { AuthService } from "./auth.service.types";
import type { Session } from "../types";

export const httpAuthService: AuthService = {
  signIn: (input) => apiClient.post<Session>("/auth/sign-in", input),
  getSession: () => apiClient.get<Session>("/auth/session"),
  signOut: () => apiClient.post<void>("/auth/sign-out"),
  requestPasswordReset: (email) => apiClient.post<void>("/auth/password/forgot", { email }),
  resetPassword: (input) => apiClient.post<void>("/auth/password/reset", input),
};
