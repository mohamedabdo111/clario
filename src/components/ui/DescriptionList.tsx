import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface DescriptionItem {
  term: string;
  value: ReactNode;
}

/** Label/value pairs, e.g. organization details. */
export function DescriptionList({ items, className }: { items: DescriptionItem[]; className?: string }) {
  return (
    <dl className={cn("divide-y divide-border text-sm", className)}>
      {items.map((item) => (
        <div key={item.term} className="flex items-center justify-between gap-4 py-2.5">
          <dt className="shrink-0 text-fg-muted">{item.term}</dt>
          <dd className="min-w-0 text-right text-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
