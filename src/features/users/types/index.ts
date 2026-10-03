import type { RoleSummary } from "@/features/roles/types";

export const USER_STATUSES = ["active", "invited", "suspended"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  status: UserStatus;
  roles: RoleSummary[];
  joinedAt: string;
  lastActiveAt: string | null;
}

export const INVITATION_STATUSES = ["pending", "expired"] as const;
export type InvitationStatus = (typeof INVITATION_STATUSES)[number];

export interface Invitation {
  id: string;
  email: string;
  role: RoleSummary;
  status: InvitationStatus;
  invitedBy: { id: string; name: string };
  message: string | null;
  createdAt: string;
  expiresAt: string;
}
