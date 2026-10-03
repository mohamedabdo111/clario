import { CircleAlert, CircleCheck, Info, TriangleAlert, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type AlertTone = "info" | "success" | "warning" | "danger";

const tones: Record<AlertTone, { className: string; icon: LucideIcon }> = {
  info: { className: "border-info-border bg-info-subtle text-info-fg", icon: Info },
  success: { className: "border-success-border bg-success-subtle text-success-fg", icon: CircleCheck },
  warning: { className: "border-warning-border bg-warning-subtle text-warning-fg", icon: TriangleAlert },
  danger: { className: "border-danger-border bg-danger-subtle text-danger-fg", icon: CircleAlert },
};

interface AlertProps {
  tone?: AlertTone;
  title?: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/** Inline message about the current context. Errors are announced immediately. */
export function Alert({ tone = "info", title, children, action, className }: AlertProps) {
  const { className: toneClass, icon: Icon } = tones[tone];
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn("flex gap-2.5 rounded-md border px-3 py-2.5 text-sm", toneClass, className)}
    >
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {title && <p className="font-medium">{title}</p>}
        {children && <div className={cn(title && "text-fg-muted")}>{children}</div>}
      </div>
      {action && <div className="shrink-0 self-center">{action}</div>}
    </div>
  );
}
