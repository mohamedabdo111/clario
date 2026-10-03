import { Navigate, Outlet, useLocation, useMatches, type Location } from "react-router";
import { FullPageLoader } from "@/components/layout/FullPageLoader";
import { PermissionDenied } from "@/components/permissions/PermissionDenied";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import type { Permission } from "@/lib/permissions";
import { paths, type RouteHandle } from "@/lib/routes";

interface RedirectState {
  from?: Location;
}

/** Signed-in area. Anonymous visitors go to sign-in and come back afterwards. */
export function RequireAuth() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <FullPageLoader />;
  if (status === "unauthenticated") {
    return <Navigate to={paths.auth.signIn} replace state={{ from: location } satisfies RedirectState} />;
  }
  return <Outlet />;
}

/** Sign-in style pages. Signed-in users are sent on to where they were going. */
export function GuestOnly() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <FullPageLoader />;
  if (status === "authenticated") {
    const from = (location.state as RedirectState | null)?.from;
    const target = from ? `${from.pathname}${from.search}${from.hash}` : paths.dashboard.home;
    return <Navigate to={target} replace />;
  }
  return <Outlet />;
}

/**
 * Checks the `permission` declared in the handle of every matched route.
 * Explains what's missing rather than hiding the page without context.
 */
export function RequireRoutePermissions() {
  const matches = useMatches();
  const { can } = usePermissions();

  const missing = matches
    .map((match) => (match.handle as RouteHandle | undefined)?.permission)
    .filter((permission): permission is Permission => permission !== undefined && !can(permission));

  if (missing.length > 0) return <PermissionDenied missing={missing} />;
  return <Outlet />;
}
