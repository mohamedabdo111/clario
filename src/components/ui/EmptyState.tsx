import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center px-6 py-12 text-center", className)}>
      {Icon && (
        <div className="mb-3 flex size-9 items-center justify-center rounded-md border border-border bg-surface text-fg-subtle shadow-xs">
          <Icon aria-hidden className="size-4" />
        </div>
      )}
      <h3 className="text-base font-medium text-fg">{title}</h3>
      {description && <div className="mt-1 max-w-sm text-sm text-fg-muted">{description}</div>}
      {action && <div className="mt-4 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  );
}
