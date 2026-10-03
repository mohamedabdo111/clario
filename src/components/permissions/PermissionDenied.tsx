import { Lock } from "lucide-react";
import { Link } from "react-router";
import { buttonStyles } from "@/components/ui/button-styles";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { EmptyState } from "@/components/ui/EmptyState";
import { useOrganization } from "@/features/organization/hooks/useOrganization";
import { getPermissionDefinition, type Permission } from "@/lib/permissions";
import { paths } from "@/lib/routes";

interface PermissionDeniedProps {
  /** The permissions that were missing, used to explain what access is needed. */
  missing: Permission[];
}

/** Shown in place of a page the current member can't open, instead of silently redirecting. */
export function PermissionDenied({ missing }: PermissionDeniedProps) {
  const { organization } = useOrganization();
  const needed = missing.map((key) => getPermissionDefinition(key).label.toLowerCase()).join(", ");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
      <DocumentTitle title="No access" />
      <EmptyState
        icon={Lock}
        title="You don't have access to this page"
        description={
          <>
            Your role in {organization.name} doesn't include permission to {needed}. Ask an organization owner or
            admin if you need access.
          </>
        }
        action={
          <Link to={paths.dashboard.home} className={buttonStyles()}>
            Back to home
          </Link>
        }
      />
    </div>
  );
}
