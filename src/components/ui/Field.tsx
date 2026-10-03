import { CircleAlert } from "lucide-react";
import { useId, useMemo, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { FieldContext, type FieldControlProps } from "./field-context";
import { Label } from "./Label";

interface FieldProps {
  label: ReactNode;
  /** Shown next to the label, e.g. a "Forgot password?" link. */
  labelAction?: ReactNode;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  /** Marks the label as optional. Prefer this over marking every required field. */
  optional?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Label, control, hint and error message, wired together for assistive tech.
 * The control (Input, Select, Textarea…) picks up its id and aria props automatically.
 */
export function Field({ label, labelAction, hint, error, required, optional, className, children }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const control = useMemo<FieldControlProps>(() => {
    const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");
    return {
      id,
      "aria-describedby": describedBy || undefined,
      "aria-invalid": error ? true : undefined,
      "aria-required": required ? true : undefined,
    };
  }, [id, hint, hintId, error, errorId, required]);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={id}>
          {label}
          {optional && <span className="ml-1 font-normal text-fg-subtle">(optional)</span>}
        </Label>
        {labelAction}
      </div>
      <FieldContext value={control}>{children}</FieldContext>
      {hint && (
        <div id={hintId} className="text-xs text-fg-subtle">
          {hint}
        </div>
      )}
      {error && (
        <p id={errorId} className="flex items-start gap-1 text-xs text-danger-fg">
          <CircleAlert aria-hidden className="mt-px size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
