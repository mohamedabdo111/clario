import { config } from "@/lib/config";
import { apiClient } from "@/services/api";
import type { DashboardOverview } from "../types";
import { mockDashboardService } from "./dashboard.service.mock";

export interface DashboardService {
  getOverview(organizationId: string, signal?: AbortSignal): Promise<DashboardOverview>;
}

const httpDashboardService: DashboardService = {
  getOverview: (organizationId, signal) =>
    apiClient.get<DashboardOverview>(`/organizations/${organizationId}/overview`, { signal }),
};

export const dashboardService = config.useMocks ? mockDashboardService : httpDashboardService;
