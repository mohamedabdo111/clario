import type { ReactNode } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import type { PermissionMode, PermissionRequirement } from "@/lib/permissions";

interface CanProps {
  permission: PermissionRequirement;
  mode?: PermissionMode;
  /** Rendered when the permission is missing. Defaults to nothing. */
  fallback?: ReactNode;
  children: ReactNode;
}

/** Declarative permission gate: `<Can permission="users.create">…</Can>`. */
export function Can({ permission, mode, fallback = null, children }: CanProps) {
  const { can } = usePermissions();
  return can(permission, mode) ? children : fallback;
}
