import { createContext } from "react";
import type { Session } from "../types";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface SignInParams {
  email: string;
  password: string;
  remember: boolean;
}

export interface AuthContextValue {
  status: AuthStatus;
  session: Session | null;
  signIn(params: SignInParams): Promise<Session>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
