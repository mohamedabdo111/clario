import { createContext } from "react";
import type { Membership, OrganizationSummary } from "../types";

export interface OrganizationContextValue {
  /** The organization every request and screen is currently scoped to. */
  organization: OrganizationSummary;
  /** The current user's roles and resolved permissions in that organization. */
  membership: Membership;
  /** Every organization the current user belongs to. */
  memberships: Membership[];
  switchOrganization(organizationId: string): void;
}

export const OrganizationContext = createContext<OrganizationContextValue | null>(null);
