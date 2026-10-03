import { Link } from "react-router";
import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { usePermissions } from "@/hooks/usePermissions";
import type { Permission } from "@/lib/permissions";
import { paths } from "@/lib/routes";
import { cn } from "@/lib/utils/cn";
import { formatNumber } from "@/lib/utils/format";
import type { DashboardOverview } from "../types";

interface Stat {
  label: string;
  value: number;
  meta: ReactNode;
  to: string;
  permission: Permission;
}

function buildStats({ members, invitations, roles, applications }: DashboardOverview): Stat[] {
  const enabledApps = applications.filter((a) => a.status === "enabled").length;
  return [
    {
      label: "Members",
      value: members.total,
      meta: members.addedLast30Days > 0 ? `${members.addedLast30Days} new in last 30 days` : "None new in 30 days",
      to: paths.dashboard.users,
      permission: "users.view",
    },
    {
      label: "Pending invitations",
      value: invitations.pending,
      meta:
        invitations.expiringWithin7Days > 0 ? (
          <span className="text-warning-fg">{invitations.expiringWithin7Days} expire within 7 days</span>
        ) : (
          "None expiring soon"
        ),
      to: paths.dashboard.users,
      permission: "users.view",
    },
    {
      label: "Roles",
      value: roles.total,
      meta: `${roles.custom} custom`,
      to: paths.dashboard.roles,
      permission: "roles.view",
    },
    {
      label: "Applications",
      value: enabledApps,
      meta: `${enabledApps} of ${applications.length} enabled`,
      to: paths.dashboard.organization,
      permission: "applications.view",
    },
  ];
}

const gridClass =
  "grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4";

/** Key counts in one divided strip — a single summary, not four separate cards. */
export function OverviewStats({ overview }: { overview: DashboardOverview }) {
  const { can } = usePermissions();
  return (
    <section aria-label="Summary" className={gridClass}>
      {buildStats(overview).map((stat) => {
        const body = (
          <>
            <p className="text-sm text-fg-muted">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-fg">{formatNumber(stat.value)}</p>
            <p className="mt-0.5 truncate text-xs text-fg-subtle">{stat.meta}</p>
          </>
        );
        const cell = "block bg-surface px-4 py-3.5";
        return can(stat.permission) ? (
          <Link key={stat.label} to={stat.to} className={cn(cell, "transition-colors hover:bg-canvas")}>
            {body}
          </Link>
        ) : (
          <div key={stat.label} className={cell}>
            {body}
          </div>
        );
      })}
    </section>
  );
}

export function OverviewStatsSkeleton() {
  return (
    <div className={gridClass}>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="bg-surface px-4 py-3.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-2.5 h-6 w-12" />
          <Skeleton className="mt-2 h-3 w-36" />
        </div>
      ))}
    </div>
  );
}
