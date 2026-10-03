import { Building2, Settings, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { Page } from "@/components/layout/Page";
import { EmptyState } from "@/components/ui/EmptyState";

/*
 * Temporary screens for areas scheduled in the next build phases. Each is
 * replaced by its feature page; routes, navigation and permissions are final.
 */

function Planned({ title, description, icon }: { title: string; description: string; icon: LucideIcon }) {
  return (
    <Page title={title} description={description}>
      <div className="rounded-lg border border-dashed border-border-strong">
        <EmptyState icon={icon} title="Not available yet" description="This area is part of the next release." />
      </div>
    </Page>
  );
}

export function UsersPage() {
  return <Planned title="Users & Invitations" description="Manage members and pending invitations." icon={Users} />;
}

export function RolesPage() {
  return <Planned title="Roles & Access" description="Define roles and what each role can do." icon={ShieldCheck} />;
}

export function OrganizationPage() {
  return <Planned title="Organization" description="Organization profile, defaults and security." icon={Building2} />;
}

export function SettingsPage() {
  return <Planned title="Settings" description="Your personal preferences." icon={Settings} />;
}
