import { cn } from "@/lib/utils/cn";

export type ControlSize = "md" | "lg";

const controlSizes: Record<ControlSize, string> = {
  md: "h-8 text-sm",
  lg: "h-9 text-base",
};

/** Shared look for text inputs, selects and textareas. */
export function controlStyles(size: ControlSize = "md", className?: string) {
  return cn(
    "w-full min-w-0 rounded-md border border-border-strong bg-surface px-2.5 text-fg shadow-xs transition-[border-color,box-shadow]",
    "placeholder:text-fg-disabled hover:border-fg-disabled",
    "focus-visible:border-accent focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent/15",
    "disabled:cursor-not-allowed disabled:bg-subtle disabled:text-fg-subtle disabled:hover:border-border-strong",
    "aria-invalid:border-danger aria-invalid:focus-visible:border-danger aria-invalid:focus-visible:ring-danger/15",
    controlSizes[size],
    className,
  );
}
