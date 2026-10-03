import { Badge } from "@/components/ui/Badge";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import type { Application } from "@/features/applications/types";

export function ApplicationsSummary({ applications }: { applications: Application[] }) {
  return (
    <Panel>
      <PanelHeader title="Applications" />
      {applications.length === 0 ? (
        <p className="px-4 py-6 text-center text-sm text-fg-muted">No applications are available for this organization.</p>
      ) : (
        <ul className="divide-y divide-border">
          {applications.map((app) => (
            <li key={app.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-fg">{app.name}</p>
                <p className="truncate text-xs text-fg-subtle">{app.description}</p>
              </div>
              {app.status === "enabled" ? (
                <Badge tone="success" dot>
                  Enabled
                </Badge>
              ) : (
                <Badge dot>Disabled</Badge>
              )}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
