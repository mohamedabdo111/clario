import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * A bordered surface for a self-contained block of content (a table, a list,
 * a form section). Don't wrap everything in panels — plain sections are fine.
 */
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("rounded-lg border border-border bg-surface", className)}>{children}</section>;
}

interface PanelHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PanelHeader({ title, description, actions, className }: PanelHeaderProps) {
  return (
    <header className={cn("flex items-start justify-between gap-4 border-b border-border px-4 py-3", className)}>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-fg">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-fg-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}

export function PanelBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("px-4 py-3", className)}>{children}</div>;
}
