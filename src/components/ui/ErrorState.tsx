import { TriangleAlert } from "lucide-react";
import { getErrorMessage } from "@/services/api";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";

interface ErrorStateProps {
  title?: string;
  error?: unknown;
  onRetry?: () => void;
  retrying?: boolean;
  className?: string;
}

export function ErrorState({ title = "Couldn't load this data", error, onRetry, retrying, className }: ErrorStateProps) {
  return (
    <div role="alert">
      <EmptyState
        icon={TriangleAlert}
        title={title}
        description={getErrorMessage(error, "Something went wrong on our side. Try again in a moment.")}
        className={className}
        action={
          onRetry && (
            <Button onClick={onRetry} loading={retrying}>
              Try again
            </Button>
          )
        }
      />
    </div>
  );
}
