import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Scroll container so wide tables never break the page layout on small screens. */
export function TableContainer({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("w-full overflow-x-auto", className)} {...props} />;
}

export function Table({ className, ...props }: ComponentProps<"table">) {
  return <table className={cn("w-full border-collapse text-sm", className)} {...props} />;
}

export function TableHeader(props: ComponentProps<"thead">) {
  return <thead {...props} />;
}

export function TableBody(props: ComponentProps<"tbody">) {
  return <tbody {...props} />;
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      className={cn("border-b border-border last:border-b-0 data-[selected=true]:bg-accent-subtle/60", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      scope="col"
      className={cn(
        "h-9 whitespace-nowrap border-b border-border bg-canvas px-3 text-left align-middle text-xs font-medium text-fg-subtle",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn("h-11 px-3 py-2 align-middle text-fg", className)} {...props} />;
}

export type SortDirection = "asc" | "desc";

interface SortableTableHeadProps extends Omit<ComponentProps<"th">, "onClick"> {
  direction: SortDirection | null;
  onSort: () => void;
  children: ReactNode;
}

export function SortableTableHead({ direction, onSort, children, className, ...props }: SortableTableHeadProps) {
  const Icon = direction === "asc" ? ArrowUp : direction === "desc" ? ArrowDown : ArrowUpDown;
  return (
    <TableHead
      aria-sort={direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}
      className={cn("px-1.5", className)}
      {...props}
    >
      <button
        type="button"
        onClick={onSort}
        className="inline-flex h-7 items-center gap-1 rounded-sm px-1.5 hover:bg-subtle hover:text-fg"
      >
        {children}
        <Icon aria-hidden className={cn("size-3.5", !direction && "opacity-50")} />
      </button>
    </TableHead>
  );
}
