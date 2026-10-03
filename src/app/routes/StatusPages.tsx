import { FileQuestion, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { buttonStyles } from "@/components/ui/button-styles";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { EmptyState } from "@/components/ui/EmptyState";
import { paths } from "@/lib/routes";

function StandaloneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-canvas">
      <header className="px-6 py-5">
        <Logo />
      </header>
      <main className="flex flex-1 items-start justify-center px-4 pt-[10vh]">{children}</main>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <StandaloneFrame>
      <DocumentTitle title="Page not found" />
      <EmptyState
        icon={FileQuestion}
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        action={
          <Link to={paths.dashboard.home} className={buttonStyles()}>
            Go to dashboard
          </Link>
        }
      />
    </StandaloneFrame>
  );
}

/** Last-resort boundary for unexpected render or loader errors. */
export function RouteErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />;

  return (
    <StandaloneFrame>
      <DocumentTitle title="Something went wrong" />
      <div role="alert">
        <EmptyState
          icon={TriangleAlert}
          title="Something went wrong"
          description="An unexpected error occurred. Reload the page to try again. If it keeps happening, contact support."
          action={<Button onClick={() => window.location.reload()}>Reload page</Button>}
        />
      </div>
    </StandaloneFrame>
  );
}
