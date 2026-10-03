/**
 * The single source of truth for every permission the frontend knows about.
 *
 * Roles are data (created and edited at runtime); permissions are code. The UI
 * never checks a role name — it only asks whether the current member holds a
 * permission. The backend remains the final authority on every request.
 */
export const PERMISSION_GROUPS = [
  {
    id: "users",
    label: "Users",
    description: "Members of the organization and their invitations.",
    permissions: [
      { key: "users.view", label: "View users", description: "See members, their roles and status." },
      { key: "users.create", label: "Invite users", description: "Send and resend invitations." },
      { key: "users.update", label: "Edit users", description: "Change roles and suspend or reactivate members." },
      { key: "users.delete", label: "Remove users", description: "Remove members and revoke invitations." },
    ],
  },
  {
    id: "roles",
    label: "Roles",
    description: "Roles and the permissions they grant.",
    permissions: [
      { key: "roles.view", label: "View roles", description: "See roles and their permissions." },
      { key: "roles.create", label: "Create roles", description: "Create custom roles." },
      { key: "roles.update", label: "Edit roles", description: "Change a role's name and permissions." },
      { key: "roles.delete", label: "Delete roles", description: "Delete custom roles." },
    ],
  },
  {
    id: "organization",
    label: "Organization",
    description: "Organization profile and settings.",
    permissions: [
      { key: "organization.view", label: "View organization", description: "See organization details and settings." },
      { key: "organization.update", label: "Manage organization", description: "Change settings and security policies." },
    ],
  },
  {
    id: "applications",
    label: "Applications",
    description: "Applications available to the organization.",
    permissions: [
      { key: "applications.view", label: "View applications", description: "See which applications are enabled." },
      { key: "applications.manage", label: "Manage applications", description: "Enable, disable and configure applications." },
    ],
  },
] as const;

export type PermissionGroup = (typeof PERMISSION_GROUPS)[number];
export type PermissionGroupId = PermissionGroup["id"];
export type PermissionDefinition = PermissionGroup["permissions"][number];
export type Permission = PermissionDefinition["key"];

const DEFINITIONS: ReadonlyMap<Permission, PermissionDefinition> = new Map(
  PERMISSION_GROUPS.flatMap((group) => group.permissions.map((permission) => [permission.key, permission] as const)),
);

export const ALL_PERMISSIONS: readonly Permission[] = [...DEFINITIONS.keys()];

export function getPermissionDefinition(key: Permission): PermissionDefinition {
  // Every Permission key comes from PERMISSION_GROUPS, so the lookup always succeeds.
  return DEFINITIONS.get(key)!;
}
