import type { ReactNode } from "react";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { cn } from "@/lib/utils/cn";

interface PageProps {
  title: string;
  description?: ReactNode;
  /** Primary and secondary page actions, aligned with the title. */
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Standard page frame: document title, page header and a width-constrained body. */
export function Page({ title, description, actions, className, children }: PageProps) {
  return (
    <div className={cn("mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8", className)}>
      <DocumentTitle title={title} />
      <PageHeader title={title} description={description} actions={actions} />
      {children}
    </div>
  );
}

export function PageHeader({ title, description, actions }: Pick<PageProps, "title" | "description" | "actions">) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-fg">{title}</h1>
        {description && <p className="mt-1 text-base text-fg-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
