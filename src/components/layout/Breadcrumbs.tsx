import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { Link, useMatches } from "react-router";
import { useOrganization } from "@/features/organization/hooks/useOrganization";
import { paths, type RouteHandle } from "@/lib/routes";

/** Organization, then each matched route that declares a `crumb` in its handle. */
export function Breadcrumbs() {
  const { organization } = useOrganization();
  const crumbs = useMatches()
    .filter((match) => (match.handle as RouteHandle | undefined)?.crumb)
    .map((match) => ({ id: match.id, label: (match.handle as RouteHandle).crumb!, to: match.pathname }));

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex min-w-0 items-center gap-1.5 text-sm">
        <li className="hidden min-w-0 sm:block">
          <Link to={paths.dashboard.home} className="block truncate text-fg-muted hover:text-fg">
            {organization.name}
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <Fragment key={crumb.id}>
              <li aria-hidden className={index === 0 ? "hidden sm:block" : undefined}>
                <ChevronRight className="size-3.5 text-fg-disabled" />
              </li>
              <li className="min-w-0">
                {isLast ? (
                  <span aria-current="page" className="block truncate font-medium text-fg">
                    {crumb.label}
                  </span>
                ) : (
                  <Link to={crumb.to} className="block truncate text-fg-muted hover:text-fg">
                    {crumb.label}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
