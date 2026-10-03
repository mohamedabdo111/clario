import { Building2, House, Settings, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import type { Permission } from "@/lib/permissions";
import { paths } from "@/lib/routes";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  /** Hidden from navigation when the member lacks this permission. */
  permission?: Permission;
  /** Match the path exactly (for index routes). */
  end?: boolean;
}

export const primaryNavigation: NavItem[] = [
  { label: "Home", to: paths.dashboard.home, icon: House, end: true },
  { label: "Users & Invitations", to: paths.dashboard.users, icon: Users, permission: "users.view" },
  { label: "Roles & Access", to: paths.dashboard.roles, icon: ShieldCheck, permission: "roles.view" },
  { label: "Organization", to: paths.dashboard.organization, icon: Building2, permission: "organization.view" },
];

export const secondaryNavigation: NavItem[] = [{ label: "Settings", to: paths.dashboard.settings, icon: Settings }];
