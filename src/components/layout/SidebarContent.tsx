import { NavLink } from "react-router";
import { primaryNavigation, secondaryNavigation, type NavItem } from "@/app/navigation";
import { usePermissions } from "@/hooks/usePermissions";
import { paths } from "@/lib/routes";
import { cn } from "@/lib/utils/cn";
import { Logo } from "./Logo";
import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { UserMenu } from "./UserMenu";

interface SidebarContentProps {
  /** Called after a link is followed, so the mobile drawer can close. */
  onNavigate?: () => void;
}

/** Sidebar body shared by the desktop sidebar and the mobile drawer. */
export function SidebarContent({ onNavigate }: SidebarContentProps) {
  const { can } = usePermissions();
  const visible = (items: NavItem[]) => items.filter((item) => !item.permission || can(item.permission));

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 shrink-0 items-center px-4">
        <NavLink to={paths.dashboard.home} onClick={onNavigate} className="rounded-sm" aria-label="Clario home">
          <Logo />
        </NavLink>
      </div>
      <div className="px-3 pb-3">
        <OrganizationSwitcher />
      </div>
      <nav aria-label="Main" className="flex-1 overflow-y-auto px-3">
        <NavList items={visible(primaryNavigation)} onNavigate={onNavigate} />
      </nav>
      <div className="flex flex-col gap-2 border-t border-border p-3">
        <NavList items={visible(secondaryNavigation)} onNavigate={onNavigate} />
        <UserMenu onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function NavList({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col gap-px">
      {items.map(({ label, to, icon: Icon, end }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex h-8 items-center gap-2.5 rounded-md px-2 text-sm transition-colors",
                isActive ? "bg-muted font-medium text-fg" : "text-fg-muted hover:bg-subtle hover:text-fg",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon aria-hidden className={cn("size-4 shrink-0", isActive ? "text-fg" : "text-fg-subtle")} />
                {label}
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
