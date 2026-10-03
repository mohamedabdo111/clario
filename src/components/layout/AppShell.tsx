import type { ReactNode } from "react";
import { Header } from "./Header";
import { SidebarContent } from "./SidebarContent";

const MAIN_ID = "main-content";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh">
      <a
        href={`#${MAIN_ID}`}
        className="sr-only z-50 rounded-md bg-surface px-3 py-2 text-sm font-medium shadow-popover focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
      <aside className="sticky top-0 hidden h-svh w-60 shrink-0 border-r border-border bg-canvas lg:block">
        <SidebarContent />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col bg-surface">
        <Header />
        <main id={MAIN_ID} tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
