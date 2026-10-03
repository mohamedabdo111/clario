import { useQuery } from "@tanstack/react-query";
import { useOrganization } from "@/features/organization/hooks/useOrganization";
import { dashboardService } from "../services/dashboard.service";

export const dashboardKeys = {
  all: (organizationId: string) => ["organizations", organizationId, "dashboard"] as const,
  overview: (organizationId: string) => [...dashboardKeys.all(organizationId), "overview"] as const,
};

export function useDashboardOverview() {
  const { organization } = useOrganization();
  return useQuery({
    queryKey: dashboardKeys.overview(organization.id),
    queryFn: ({ signal }) => dashboardService.getOverview(organization.id, signal),
  });
}
