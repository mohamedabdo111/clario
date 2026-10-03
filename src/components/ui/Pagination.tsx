import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatNumber } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Button";

interface PaginationProps {
  /** 1-based page index. */
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  /** What is being paginated, e.g. "users". */
  itemLabel?: string;
  className?: string;
}

export function Pagination({ page, pageSize, total, onPageChange, itemLabel = "results", className }: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-between gap-4 text-sm text-fg-muted", className)}>
      <p aria-live="polite">
        {total === 0 ? (
          `No ${itemLabel}`
        ) : (
          <>
            <span className="font-medium text-fg">{formatNumber(from)}</span>–
            <span className="font-medium text-fg">{formatNumber(to)}</span> of{" "}
            <span className="font-medium text-fg">{formatNumber(total)}</span> {itemLabel}
          </>
        )}
      </p>
      <div className="flex items-center gap-1.5">
        <span className="hidden sm:inline">
          Page {page} of {pageCount}
        </span>
        <Button size="icon-sm" onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
          <ChevronLeft aria-hidden />
        </Button>
        <Button size="icon-sm" onClick={() => onPageChange(page + 1)} disabled={page >= pageCount} aria-label="Next page">
          <ChevronRight aria-hidden />
        </Button>
      </div>
    </nav>
  );
}
