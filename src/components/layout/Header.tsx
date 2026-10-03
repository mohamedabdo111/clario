import { Breadcrumbs } from "./Breadcrumbs";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-12 shrink-0 items-center gap-2 border-b border-border bg-surface px-4 lg:px-6">
      <MobileNav />
      <Breadcrumbs />
    </header>
  );
}
