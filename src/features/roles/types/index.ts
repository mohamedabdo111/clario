import type { Permission } from "@/lib/permissions";

export interface RoleSummary {
  id: string;
  name: string;
}

export interface Role extends RoleSummary {
  description: string;
  permissions: Permission[];
  /** Built-in roles can't be deleted or renamed. */
  isSystem: boolean;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}
