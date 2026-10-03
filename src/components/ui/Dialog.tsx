import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

type DialogSize = "sm" | "md" | "lg";

const sizes: Record<DialogSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

interface DialogContentProps {
  title: ReactNode;
  description?: ReactNode;
  size?: DialogSize;
  /** Sticky action row, usually <DialogFooter>. */
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
  /** Prevents closing by clicking outside, e.g. while a request is in flight. */
  preventOutsideClose?: boolean;
}

export function DialogContent({
  title,
  description,
  size = "md",
  footer,
  className,
  children,
  preventOutsideClose,
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <DialogPrimitive.Content
        // Radix warns when a dialog has no description unless this is explicitly undefined.
        {...(description ? {} : { "aria-describedby": undefined })}
        onPointerDownOutside={preventOutsideClose ? (event) => event.preventDefault() : undefined}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col",
          "rounded-lg border border-border bg-surface shadow-dialog focus:outline-none",
          "data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in",
          sizes[size],
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 px-5 pb-1 pt-4">
          <div className="min-w-0">
            <DialogPrimitive.Title className="text-lg font-semibold text-fg">{title}</DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className="mt-1 text-sm text-fg-muted">{description}</DialogPrimitive.Description>
            )}
          </div>
          <DialogPrimitive.Close
            aria-label="Close"
            className="-mr-1.5 flex size-7 shrink-0 items-center justify-center rounded-md text-fg-subtle hover:bg-subtle hover:text-fg"
          >
            <X aria-hidden className="size-4" />
          </DialogPrimitive.Close>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">{children}</div>
        {footer}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogFooter({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 rounded-b-lg border-t border-border bg-canvas px-5 py-3 sm:flex-row sm:justify-end",
        className,
      )}
    >
      {children}
    </div>
  );
}
