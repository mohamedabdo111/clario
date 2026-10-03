import { ChevronsUpDown, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router";
import { Avatar } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useAuth, useSession } from "@/features/auth/hooks/useAuth";
import { paths } from "@/lib/routes";

export function UserMenu({ onNavigate }: { onNavigate?: () => void }) {
  const { user } = useSession();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  function goTo(path: string) {
    onNavigate?.();
    navigate(path);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex h-11 w-full items-center gap-2 rounded-md px-2 text-left hover:bg-subtle data-[state=open]:bg-subtle"
        aria-label={`Account menu for ${user.name}`}
      >
        <Avatar name={user.name} src={user.avatarUrl} size="md" className="size-7" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium leading-4 text-fg">{user.name}</span>
          <span className="truncate text-xs leading-4 text-fg-subtle">{user.email}</span>
        </span>
        <ChevronsUpDown aria-hidden className="size-4 shrink-0 text-fg-subtle" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-(--radix-dropdown-menu-trigger-width) min-w-56">
        <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => goTo(paths.dashboard.profile)}>
          <UserRound aria-hidden />
          Your profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => void signOut()}>
          <LogOut aria-hidden />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
