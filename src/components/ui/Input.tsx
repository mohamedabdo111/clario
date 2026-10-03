import type { ComponentProps } from "react";
import { useFieldControl } from "./field-context";
import { controlStyles, type ControlSize } from "./input-styles";

export interface InputProps extends Omit<ComponentProps<"input">, "size"> {
  size?: ControlSize;
}

export function Input({ size, className, ...props }: InputProps) {
  const field = useFieldControl();
  return <input {...field} {...props} className={controlStyles(size, className)} />;
}
