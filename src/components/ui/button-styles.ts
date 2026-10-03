import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon-sm" | "icon";

const base =
  "inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium " +
  "transition-colors disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white shadow-xs hover:bg-accent-hover",
  secondary: "border border-border-strong bg-surface text-fg shadow-xs hover:bg-subtle",
  ghost: "text-fg-muted hover:bg-subtle hover:text-fg",
  danger: "bg-danger text-white shadow-xs hover:bg-danger-hover",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-7 px-2.5 text-sm",
  md: "h-8 px-3 text-sm",
  lg: "h-9 px-4 text-base",
  "icon-sm": "size-7",
  icon: "size-8",
};

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

/** Button classes, also used to style links that act as buttons. */
export function buttonStyles({ variant = "secondary", size = "md", fullWidth, className }: ButtonStyleOptions = {}) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
}
