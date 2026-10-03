import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";
import { useFieldControl } from "./field-context";
import { controlStyles, type ControlSize } from "./input-styles";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface SelectProps<T extends string> extends Omit<ComponentProps<"select">, "size" | "children"> {
  options: readonly SelectOption<T>[];
  size?: ControlSize;
  /** Adds an empty first option, e.g. "Select a role". */
  placeholder?: string;
}

/** Native select: accessible and mobile-friendly by default. */
export function Select<T extends string>({ options, size, placeholder, className, ...props }: SelectProps<T>) {
  const field = useFieldControl();
  return (
    <div className={cn("relative", className)}>
      <select {...field} {...props} className={controlStyles(size, "appearance-none pr-8")}>
        {placeholder !== undefined && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
      />
    </div>
  );
}
