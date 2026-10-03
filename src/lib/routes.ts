import type { Permission } from "@/lib/permissions";

/** Metadata attached to route definitions via `handle`. */
export interface RouteHandle {
  /** Breadcrumb label for this route. */
  crumb?: string;
  /** Permission needed to open the page. Missing it shows a "no access" state, not a redirect. */
  permission?: Permission;
}

/** Every route path in the app. Never hardcode a path string in a component. */
export const paths = {
  root: "/",
  auth: {
    signIn: "/sign-in",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
  dashboard: {
    home: "/dashboard",
    users: "/dashboard/users",
    roles: "/dashboard/roles",
    organization: "/dashboard/organization",
    settings: "/dashboard/settings",
    profile: "/dashboard/profile",
  },
} as const;
