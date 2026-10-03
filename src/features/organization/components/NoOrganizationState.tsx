import { Building2 } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuth } from "@/features/auth/hooks/useAuth";

/** Signed in, but not an active member of any organization. */
export function NoOrganizationState() {
  const { session, signOut } = useAuth();
  return (
    <div className="flex min-h-svh flex-col bg-canvas">
      <DocumentTitle title="No organization" />
      <header className="px-6 py-5">
        <Logo />
      </header>
      <main className="flex flex-1 items-start justify-center px-4 pt-[10vh]">
        <EmptyState
          icon={Building2}
          title="You're not a member of any organization"
          description={
            <>
              {session?.user.email} doesn't belong to an active organization. Ask an administrator to invite you, then
              open the link in the invitation email.
            </>
          }
          action={<Button onClick={() => void signOut()}>Sign out</Button>}
        />
      </main>
    </div>
  );
}
