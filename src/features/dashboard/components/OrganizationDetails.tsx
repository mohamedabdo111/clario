import { Link } from "react-router";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { DescriptionList } from "@/components/ui/DescriptionList";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/Panel";
import { Can } from "@/components/permissions/Can";
import type { Organization, OrganizationPlan } from "@/features/organization/types";
import { paths } from "@/lib/routes";
import { formatDate } from "@/lib/utils/format";

const PLAN_LABELS: Record<OrganizationPlan, string> = {
  free: "Free",
  team: "Team",
  enterprise: "Enterprise",
};

export function OrganizationDetails({ organization }: { organization: Organization }) {
  return (
    <Panel>
      <PanelHeader
        title="Organization"
        actions={
          <Can permission="organization.view">
            <Link to={paths.dashboard.organization} className="text-sm text-accent hover:text-accent-hover hover:underline">
              Settings
            </Link>
          </Can>
        }
      />
      <PanelBody className="py-1">
        <DescriptionList
          items={[
            { term: "Name", value: organization.name },
            {
              term: "Organization ID",
              value: (
                <span className="inline-flex items-center gap-1">
                  <code className="font-mono text-xs text-fg-muted">{organization.id}</code>
                  <CopyButton value={organization.id} label="organization ID" />
                </span>
              ),
            },
            { term: "Plan", value: <Badge>{PLAN_LABELS[organization.plan]}</Badge> },
            { term: "Data region", value: organization.region },
            { term: "Created", value: formatDate(organization.createdAt) },
          ]}
        />
      </PanelBody>
    </Panel>
  );
}
