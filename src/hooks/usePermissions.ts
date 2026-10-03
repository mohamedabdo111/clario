import { useCallback, useMemo } from "react";
import { useOrganization } from "@/features/organization/hooks/useOrganization";
import { hasPermission, type Permission, type PermissionMode, type PermissionRequirement } from "@/lib/permissions";

/**
 * Permission checks for the current member in the active organization.
 * These decide what the UI shows; the API still authorizes every request.
 */
export function usePermissions() {
  const { membership } = useOrganization();
  const granted = useMemo(() => new Set<Permission>(membership.permissions), [membership.permissions]);

  const can = useCallback(
    (required: PermissionRequirement, mode: PermissionMode = "all") => hasPermission(granted, required, mode),
    [granted],
  );

  return { can, granted };
}
