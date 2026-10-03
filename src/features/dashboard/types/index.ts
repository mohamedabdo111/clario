import type { Application } from "@/features/applications/types";
import type { Organization } from "@/features/organization/types";

export const ACTIVITY_TYPES = [
  "member.joined",
  "member.invited",
  "member.removed",
  "member.suspended",
  "member.role_changed",
  "role.created",
  "role.updated",
  "organization.updated",
  "application.enabled",
] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  actor: { id: string; name: string };
  /** Human-readable subject of the event, e.g. a member's email or a role name. */
  target: string;
  /** Extra context, e.g. the new role name for a role change. */
  detail: string | null;
  occurredAt: string;
}

export interface DashboardOverview {
  organization: Organization;
  members: { total: number; addedLast30Days: number; suspended: number };
  invitations: { pending: number; expiringWithin7Days: number };
  roles: { total: number; custom: number };
  applications: Application[];
  recentActivity: ActivityEvent[];
}
