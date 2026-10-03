import { Check, ChevronsUpDown } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useOrganization } from "@/features/organization/hooks/useOrganization";

export function OrganizationSwitcher() {
  const { organization, membership, memberships, switchOrganization } = useOrganization();
  const roleNames = membership.roles.map((r) => r.name).join(", ");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex h-10 w-full items-center gap-2 rounded-md border border-border bg-surface px-2 text-left shadow-xs hover:bg-subtle data-[state=open]:bg-subtle"
        aria-label={`Current organization: ${organization.name}. Switch organization`}
      >
        <Avatar name={organization.name} src={organization.logoUrl} square size="sm" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium leading-4 text-fg">{organization.name}</span>
          <span className="truncate text-xs leading-4 text-fg-subtle">{roleNames}</span>
        </span>
        <ChevronsUpDown aria-hidden className="size-4 shrink-0 text-fg-subtle" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-(--radix-dropdown-menu-trigger-width) min-w-60">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        {memberships.map((m) => {
          const active = m.organization.id === organization.id;
          return (
            <DropdownMenuItem key={m.organization.id} onSelect={() => switchOrganization(m.organization.id)}>
              <Avatar name={m.organization.name} src={m.organization.logoUrl} square size="xs" />
              <span className="flex-1 truncate">{m.organization.name}</span>
              {active && <Check aria-label="Current organization" className="text-accent!" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
