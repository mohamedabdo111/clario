import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}

/** For components rendered behind <RequireAuth>, where a session is guaranteed. */
export function useSession() {
  const { session } = useAuth();
  if (!session) throw new Error("useSession must be used inside an authenticated route");
  return session;
}
