import { cn } from "@/lib/utils/cn";

/** Placeholder block shaped like the content that is loading. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-sm bg-muted", className)} />;
}
