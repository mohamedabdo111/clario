import { History } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { formatDateTime, formatRelativeTime } from "@/lib/utils/format";
import type { ActivityEvent } from "../types";
import { ActivityDescription } from "./ActivityDescription";

export function RecentActivity({ events }: { events: ActivityEvent[] }) {
  return (
    <Panel>
      <PanelHeader title="Recent activity" description="Changes to members, roles and settings." />
      {events.length === 0 ? (
        <EmptyState
          icon={History}
          title="No activity yet"
          description="Invitations, role changes and setting updates will appear here."
        />
      ) : (
        <ol className="divide-y divide-border">
          {events.map((event) => (
            <li key={event.id} className="flex items-start gap-3 px-4 py-3">
              <Avatar name={event.actor.name} size="sm" className="mt-px" />
              <p className="min-w-0 flex-1 text-sm text-fg-muted">
                <ActivityDescription event={event} />
              </p>
              <time
                dateTime={event.occurredAt}
                title={formatDateTime(event.occurredAt)}
                className="shrink-0 whitespace-nowrap pt-px text-xs text-fg-subtle"
              >
                {formatRelativeTime(event.occurredAt)}
              </time>
            </li>
          ))}
        </ol>
      )}
    </Panel>
  );
}
