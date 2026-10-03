import { db } from "@/mocks/db";
import { isOlderThanDays, isWithinDays, mockDelay } from "@/mocks/utils";
import { ApiError } from "@/services/api";
import type { DashboardOverview } from "../types";
import type { DashboardService } from "./dashboard.service";

const RECENT_ACTIVITY_LIMIT = 8;

export const mockDashboardService: DashboardService = {
  async getOverview(organizationId): Promise<DashboardOverview> {
    await mockDelay();
    const organization = db.organizations.find((o) => o.id === organizationId);
    if (!organization) throw new ApiError(404, "not_found", "Organization not found.");

    const users = db.users[organizationId] ?? [];
    const roles = db.roles[organizationId] ?? [];
    const pending = (db.invitations[organizationId] ?? []).filter((i) => i.status === "pending");

    return {
      organization,
      members: {
        total: users.length,
        addedLast30Days: users.filter((u) => !isOlderThanDays(u.joinedAt, 30)).length,
        suspended: users.filter((u) => u.status === "suspended").length,
      },
      invitations: {
        pending: pending.length,
        expiringWithin7Days: pending.filter((i) => isWithinDays(i.expiresAt, 7)).length,
      },
      roles: { total: roles.length, custom: roles.filter((r) => !r.isSystem).length },
      applications: db.applications[organizationId] ?? [],
      recentActivity: [...(db.activity[organizationId] ?? [])]
        .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
        .slice(0, RECENT_ACTIVITY_LIMIT),
    };
  },
};
