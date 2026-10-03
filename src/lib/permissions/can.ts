import type { Permission } from "./catalog";

export type PermissionRequirement = Permission | readonly Permission[];

export type PermissionMode = "all" | "any";

/**
 * Pure permission check, usable outside React (route config, services, tests).
 * An array requirement needs every permission by default, or one of them with mode "any".
 */
export function hasPermission(
  granted: ReadonlySet<Permission>,
  required: PermissionRequirement,
  mode: PermissionMode = "all",
) {
  const list: readonly Permission[] = typeof required === "string" ? [required] : required;
  if (list.length === 0) return true;
  return mode === "all" ? list.every((p) => granted.has(p)) : list.some((p) => granted.has(p));
}
