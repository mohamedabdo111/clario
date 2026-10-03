import { cn } from "@/lib/utils/cn";

interface SpinnerProps {
  className?: string;
  /** Announced to screen readers. Omit when the spinner sits next to visible text. */
  label?: string;
}

export function Spinner({ className, label }: SpinnerProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={cn("size-4 animate-spin", className)}
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
