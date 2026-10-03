import type { ComponentType } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { FullPageLoader } from "@/components/layout/FullPageLoader";
import { paths, type RouteHandle } from "@/lib/routes";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { GuestOnly, RequireAuth } from "./routes/guards";
import { NotFoundPage, RouteErrorPage } from "./routes/StatusPages";

/** Code-splits a page: `page(() => import("./x"), "XPage")`. */
function page<M extends Record<string, unknown>>(load: () => Promise<M>, name: keyof M) {
  return async () => ({ Component: (await load())[name] as ComponentType });
}

const handle = (h: RouteHandle) => h;

export const router = createBrowserRouter([
  {
    path: paths.root,
    errorElement: <RouteErrorPage />,
    hydrateFallbackElement: <FullPageLoader />,
    children: [
      { index: true, element: <Navigate to={paths.dashboard.home} replace /> },
      {
        element: <AuthLayout />,
        children: [
          {
            element: <GuestOnly />,
            children: [
              { path: paths.auth.signIn, lazy: page(() => import("./routes/auth/SignInPage"), "SignInPage") },
              {
                path: paths.auth.forgotPassword,
                lazy: page(() => import("./routes/auth/ForgotPasswordPage"), "ForgotPasswordPage"),
              },
            ],
          },
          // Reachable while signed in too, e.g. from an email opened in another tab.
          {
            path: paths.auth.resetPassword,
            lazy: page(() => import("./routes/auth/ResetPasswordPage"), "ResetPasswordPage"),
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: paths.dashboard.home,
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                handle: handle({ crumb: "Overview" }),
                lazy: page(() => import("./routes/dashboard/HomePage"), "HomePage"),
              },
              {
                path: paths.dashboard.users,
                handle: handle({ crumb: "Users & Invitations", permission: "users.view" }),
                lazy: page(() => import("./routes/dashboard/PlannedPages"), "UsersPage"),
              },
              {
                path: paths.dashboard.roles,
                handle: handle({ crumb: "Roles & Access", permission: "roles.view" }),
                lazy: page(() => import("./routes/dashboard/PlannedPages"), "RolesPage"),
              },
              {
                path: paths.dashboard.organization,
                handle: handle({ crumb: "Organization", permission: "organization.view" }),
                lazy: page(() => import("./routes/dashboard/PlannedPages"), "OrganizationPage"),
              },
              {
                path: paths.dashboard.settings,
                handle: handle({ crumb: "Settings" }),
                lazy: page(() => import("./routes/dashboard/PlannedPages"), "SettingsPage"),
              },
              {
                path: paths.dashboard.profile,
                handle: handle({ crumb: "Your profile" }),
                lazy: page(() => import("./routes/dashboard/ProfilePage"), "ProfilePage"),
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
