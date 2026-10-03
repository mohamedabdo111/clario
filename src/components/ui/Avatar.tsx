import { getInitials } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

type AvatarSize = "xs" | "sm" | "md";

const sizes: Record<AvatarSize, string> = {
  xs: "size-5 text-[10px]",
  sm: "size-6 text-[11px]",
  md: "size-8 text-xs",
};

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: AvatarSize;
  /** Square corners, used for organizations rather than people. */
  square?: boolean;
  className?: string;
}

export function Avatar({ name, src, size = "sm", square, className }: AvatarProps) {
  const shape = square ? "rounded-sm" : "rounded-full";
  if (src) {
    return <img src={src} alt="" className={cn("shrink-0 object-cover", shape, sizes[size], className)} />;
  }
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center bg-muted font-semibold text-fg-muted",
        shape,
        sizes[size],
        className,
      )}
    >
      {square ? getInitials(name).charAt(0) : getInitials(name)}
    </span>
  );
}
