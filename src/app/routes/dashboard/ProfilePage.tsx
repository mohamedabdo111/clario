import { Page } from "@/components/layout/Page";
import { Avatar } from "@/components/ui/Avatar";
import { DescriptionList } from "@/components/ui/DescriptionList";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/Panel";
import { useSession } from "@/features/auth/hooks/useAuth";

export function ProfilePage() {
  const { user, memberships } = useSession();
  return (
    <Page title="Your profile" description="Your account details and organization memberships.">
      <div className="flex items-center gap-3">
        <Avatar name={user.name} src={user.avatarUrl} size="md" className="size-10 text-sm" />
        <div>
          <p className="text-base font-medium text-fg">{user.name}</p>
          <p className="text-sm text-fg-muted">{user.email}</p>
        </div>
      </div>
      <Panel className="max-w-2xl">
        <PanelHeader title="Memberships" description="Organizations you belong to and your roles in each." />
        <PanelBody className="py-1">
          <DescriptionList
            items={memberships.map((m) => ({
              term: m.organization.name,
              value: m.roles.map((r) => r.name).join(", "),
            }))}
          />
        </PanelBody>
      </Panel>
    </Page>
  );
}
