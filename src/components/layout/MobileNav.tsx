import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SidebarContent } from "./SidebarContent";

/** Slide-in navigation drawer for screens narrower than the `lg` breakpoint. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation" className="-ml-1.5 lg:hidden">
          <Menu aria-hidden />
        </Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-overlay data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in lg:hidden" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-border bg-canvas shadow-dialog focus:outline-none data-[state=closed]:animate-drawer-out data-[state=open]:animate-drawer-in lg:hidden"
        >
          <DialogPrimitive.Title className="sr-only">Navigation</DialogPrimitive.Title>
          <DialogPrimitive.Close asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Close navigation" className="absolute right-2 top-2.5">
              <X aria-hidden />
            </Button>
          </DialogPrimitive.Close>
          <SidebarContent onNavigate={close} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
