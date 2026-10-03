import { UserPlus } from "lucide-react";
import { Link } from "react-router";
import { Page } from "@/components/layout/Page";
import { Can } from "@/components/permissions/Can";
import { buttonStyles } from "@/components/ui/button-styles";
import { ErrorState } from "@/components/ui/ErrorState";
import { useSession } from "@/features/auth/hooks/useAuth";
import {
  DashboardOverviewSkeleton,
  DashboardOverviewView,
} from "@/features/dashboard/components/DashboardOverviewView";
import { useDashboardOverview } from "@/features/dashboard/hooks/useDashboardOverview";
import { useOrganization } from "@/features/organization/hooks/useOrganization";
import { paths } from "@/lib/routes";

export function HomePage() {
  const { user } = useSession();
  const { organization, membership } = useOrganization();
  const overview = useDashboardOverview();
  const firstName = user.name.split(" ")[0];
  const roles = membership.roles.map((r) => r.name).join(", ");

  return (
    <Page
      title="Overview"
      description={
        <>
          Welcome back, {firstName}. You're signed in to {organization.name} as {roles}.
        </>
      }
      actions={
        <Can permission="users.create">
          <Link to={paths.dashboard.users} className={buttonStyles({ variant: "primary" })}>
            <UserPlus aria-hidden />
            Invite user
          </Link>
        </Can>
      }
    >
      {overview.isPending ? (
        <DashboardOverviewSkeleton />
      ) : overview.isError ? (
        <ErrorState
          title="Couldn't load the overview"
          error={overview.error}
          onRetry={() => void overview.refetch()}
          retrying={overview.isFetching}
          className="rounded-lg border border-border"
        />
      ) : (
        <DashboardOverviewView overview={overview.data} />
      )}
    </Page>
  );
}
