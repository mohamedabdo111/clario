import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

const tones: Record<BadgeTone, { badge: string; dot: string }> = {
  neutral: { badge: "border-border bg-subtle text-fg-muted", dot: "bg-fg-subtle" },
  accent: { badge: "border-accent/25 bg-accent-subtle text-accent-fg", dot: "bg-accent" },
  success: { badge: "border-success-border bg-success-subtle text-success-fg", dot: "bg-success" },
  warning: { badge: "border-warning-border bg-warning-subtle text-warning-fg", dot: "bg-warning" },
  danger: { badge: "border-danger-border bg-danger-subtle text-danger-fg", dot: "bg-danger" },
  info: { badge: "border-info-border bg-info-subtle text-info-fg", dot: "bg-info" },
};

interface BadgeProps {
  tone?: BadgeTone;
  /** A small status dot before the label, for states such as Active or Suspended. */
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = "neutral", dot, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1.5 whitespace-nowrap rounded-sm border px-1.5 text-xs font-medium",
        tones[tone].badge,
        className,
      )}
    >
      {dot && <span aria-hidden className={cn("size-1.5 rounded-full", tones[tone].dot)} />}
      {children}
    </span>
  );
}
