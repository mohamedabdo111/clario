import type { ResetPasswordInput, Session, SignInInput } from "../types";

export interface AuthService {
  signIn(input: SignInInput): Promise<Session>;
  /** Restores a session from a stored token. Rejects with `unauthorized` when the token is no longer valid. */
  getSession(token: string): Promise<Session>;
  signOut(): Promise<void>;
  /** Always resolves for a well-formed email so the response doesn't reveal which accounts exist. */
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(input: ResetPasswordInput): Promise<void>;
}
