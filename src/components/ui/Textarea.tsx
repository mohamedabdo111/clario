import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";
import { useFieldControl } from "./field-context";
import { controlStyles } from "./input-styles";

export function Textarea({ className, rows = 3, ...props }: ComponentProps<"textarea">) {
  const field = useFieldControl();
  return (
    <textarea {...field} rows={rows} {...props} className={controlStyles("md", cn("h-auto resize-y py-1.5", className))} />
  );
}
