import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { sessionEvents } from "@/services/auth/session-events";
import { tokenStorage } from "@/services/auth/token-storage";
import { authService } from "../services/auth.service";
import type { Session } from "../types";
import { AuthContext, type AuthContextValue, type AuthStatus, type SignInParams } from "./auth-context";

interface AuthState {
  status: AuthStatus;
  session: Session | null;
}

const UNAUTHENTICATED: AuthState = { status: "unauthenticated", session: null };

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<AuthState>(() =>
    tokenStorage.get() ? { status: "loading", session: null } : UNAUTHENTICATED,
  );

  // Restore the session from a stored token on first load.
  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) return;
    let cancelled = false;
    authService
      .getSession(token)
      .then((session) => {
        if (!cancelled) setState({ status: "authenticated", session });
      })
      .catch(() => {
        tokenStorage.clear();
        if (!cancelled) setState(UNAUTHENTICATED);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const endSession = useCallback(() => {
    tokenStorage.clear();
    queryClient.clear();
    setState(UNAUTHENTICATED);
  }, [queryClient]);

  useEffect(() => sessionEvents.onUnauthorized(endSession), [endSession]);

  const signIn = useCallback(async ({ email, password, remember }: SignInParams) => {
    const session = await authService.signIn({ email, password });
    tokenStorage.set(session.token, remember);
    setState({ status: "authenticated", session });
    return session;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authService.signOut();
    } finally {
      endSession();
    }
  }, [endSession]);

  const value = useMemo<AuthContextValue>(
    () => ({ status: state.status, session: state.session, signIn, signOut }),
    [state, signIn, signOut],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
