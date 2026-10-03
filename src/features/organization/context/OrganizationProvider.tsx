import { useCallback, useMemo, useState, type ReactNode } from "react";
import { storageKeys } from "@/lib/constants/storage-keys";
import { storage } from "@/services/storage/storage";
import { useSession } from "@/features/auth/hooks/useAuth";
import { NoOrganizationState } from "../components/NoOrganizationState";
import { OrganizationContext, type OrganizationContextValue } from "./organization-context";

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { memberships } = useSession();
  const [activeId, setActiveId] = useState(() => storage.get<string>(storageKeys.activeOrganization));

  const membership = memberships.find((m) => m.organization.id === activeId) ?? memberships[0];

  const switchOrganization = useCallback((organizationId: string) => {
    setActiveId(organizationId);
    storage.set(storageKeys.activeOrganization, organizationId);
  }, []);

  const value = useMemo<OrganizationContextValue | null>(
    () =>
      membership ? { organization: membership.organization, membership, memberships, switchOrganization } : null,
    [membership, memberships, switchOrganization],
  );

  if (!value) return <NoOrganizationState />;

  return <OrganizationContext value={value}>{children}</OrganizationContext>;
}
