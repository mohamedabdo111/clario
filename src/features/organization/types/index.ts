import type { Permission } from "@/lib/permissions";
import type { RoleSummary } from "@/features/roles/types";

export type OrganizationPlan = "free" | "team" | "enterprise";

export interface OrganizationSummary {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
}

export interface Organization extends OrganizationSummary {
  plan: OrganizationPlan;
  region: string;
  createdAt: string;
}

/**
 * The current user's membership in one organization. `permissions` is the
 * resolved union of all the member's roles, computed by the backend.
 */
export interface Membership {
  organization: OrganizationSummary;
  roles: RoleSummary[];
  permissions: Permission[];
}
