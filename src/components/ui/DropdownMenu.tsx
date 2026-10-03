import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

export const DropdownMenu = DropdownPrimitive.Root;
export const DropdownMenuTrigger = DropdownPrimitive.Trigger;
export const DropdownMenuGroup = DropdownPrimitive.Group;

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  align = "end",
  ...props
}: ComponentProps<typeof DropdownPrimitive.Content>) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-44 overflow-y-auto rounded-md border border-border bg-surface p-1 shadow-popover",
          "origin-(--radix-dropdown-menu-content-transform-origin) data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in",
          className,
        )}
        {...props}
      />
    </DropdownPrimitive.Portal>
  );
}

interface DropdownMenuItemProps extends ComponentProps<typeof DropdownPrimitive.Item> {
  tone?: "default" | "danger";
}

export function DropdownMenuItem({ className, tone = "default", ...props }: DropdownMenuItemProps) {
  return (
    <DropdownPrimitive.Item
      className={cn(
        "flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-sm outline-none",
        "data-[highlighted]:bg-subtle data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        tone === "danger" ? "text-danger-fg [&_svg]:text-danger-fg" : "text-fg [&_svg]:text-fg-subtle",
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuLabel({ className, ...props }: ComponentProps<typeof DropdownPrimitive.Label>) {
  return <DropdownPrimitive.Label className={cn("px-2 py-1.5 text-xs font-medium text-fg-subtle", className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: ComponentProps<typeof DropdownPrimitive.Separator>) {
  return <DropdownPrimitive.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
}
