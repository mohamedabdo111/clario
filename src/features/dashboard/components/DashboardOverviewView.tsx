import { Panel, PanelHeader } from "@/components/ui/Panel";
import { Skeleton } from "@/components/ui/Skeleton";
import { usePermissions } from "@/hooks/usePermissions";
import type { DashboardOverview } from "../types";
import { ApplicationsSummary } from "./ApplicationsSummary";
import { OrganizationDetails } from "./OrganizationDetails";
import { OverviewStats, OverviewStatsSkeleton } from "./OverviewStats";
import { RecentActivity } from "./RecentActivity";

const columns = "grid grid-cols-1 items-start gap-6 lg:grid-cols-3";

export function DashboardOverviewView({ overview }: { overview: DashboardOverview }) {
  const { can } = usePermissions();
  return (
    <>
      <OverviewStats overview={overview} />
      <div className={columns}>
        <div className="lg:col-span-2">
          <RecentActivity events={overview.recentActivity} />
        </div>
        <div className="flex flex-col gap-6">
          <OrganizationDetails organization={overview.organization} />
          {can("applications.view") && <ApplicationsSummary applications={overview.applications} />}
        </div>
      </div>
    </>
  );
}

export function DashboardOverviewSkeleton() {
  return (
    <div role="status" aria-label="Loading overview" className="flex flex-col gap-6">
      <OverviewStatsSkeleton />
      <div className={columns}>
        <Panel className="lg:col-span-2">
          <PanelHeader title="Recent activity" />
          <div className="divide-y divide-border">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Organization" />
          <div className="flex flex-col gap-3 px-4 py-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-4" />
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
