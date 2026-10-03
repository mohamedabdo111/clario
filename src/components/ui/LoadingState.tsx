import { cn } from "@/lib/utils/cn";
import { Spinner } from "./Spinner";

interface LoadingStateProps {
  label?: string;
  className?: string;
}

/** Centered spinner for areas where a skeleton would not match the content. */
export function LoadingState({ label = "Loading", className }: LoadingStateProps) {
  return (
    <div role="status" className={cn("flex items-center justify-center gap-2 py-12 text-sm text-fg-subtle", className)}>
      <Spinner />
      <span>{label}…</span>
    </div>
  );
}
