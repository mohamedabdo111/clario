import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Checkbox({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "group peer flex size-4 shrink-0 items-center justify-center rounded-sm border border-border-strong bg-surface text-white shadow-xs transition-colors",
        "hover:border-fg-subtle disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
        "data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check aria-hidden strokeWidth={3} className="size-3 group-data-[state=indeterminate]:hidden" />
        <Minus aria-hidden strokeWidth={3} className="hidden size-3 group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

interface CheckboxFieldProps extends ComponentProps<typeof CheckboxPrimitive.Root> {
  label: ReactNode;
  description?: ReactNode;
}

/** Checkbox with a clickable label and optional description. */
export function CheckboxField({ label, description, className, id, ...props }: CheckboxFieldProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const descriptionId = description ? `${checkboxId}-description` : undefined;
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <Checkbox id={checkboxId} aria-describedby={descriptionId} className="mt-0.5" {...props} />
      <div className="flex flex-col">
        <label htmlFor={checkboxId} className={cn("text-sm text-fg", props.disabled && "cursor-not-allowed opacity-60")}>
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="text-xs text-fg-subtle">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
