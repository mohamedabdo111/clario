import { config } from "@/lib/config";
import { cn } from "@/lib/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-6 shrink-0", className)}>
      <rect width="32" height="32" rx="6" className="fill-fg" />
      <path d="M21.5 11.2A7 7 0 1 0 21.5 20.8" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight text-fg">{config.productName}</span>
    </span>
  );
}
