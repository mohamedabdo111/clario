import { AppShell } from "@/components/layout/AppShell";
import { OrganizationProvider } from "@/features/organization/context/OrganizationProvider";
import { RequireRoutePermissions } from "../routes/guards";

/** Everything inside the dashboard is scoped to the active organization. */
export function DashboardLayout() {
  return (
    <OrganizationProvider>
      <AppShell>
        <RequireRoutePermissions />
      </AppShell>
    </OrganizationProvider>
  );
}
