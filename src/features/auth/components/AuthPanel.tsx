import type { ReactNode } from "react";
import { DocumentTitle } from "@/components/ui/DocumentTitle";

interface AuthPanelProps {
  title: string;
  description?: ReactNode;
  /** Shown below the panel, e.g. "Back to sign in". */
  footer?: ReactNode;
  children: ReactNode;
}

export function AuthPanel({ title, description, footer, children }: AuthPanelProps) {
  return (
    <>
      <DocumentTitle title={title} />
      <div className="rounded-lg border border-border bg-surface px-5 py-6 shadow-xs sm:px-8 sm:py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight text-fg">{title}</h1>
          {description && <p className="mt-1.5 text-base text-fg-muted">{description}</p>}
        </div>
        {children}
      </div>
      {footer && <div className="mt-5 text-center text-sm text-fg-muted">{footer}</div>}
    </>
  );
}
