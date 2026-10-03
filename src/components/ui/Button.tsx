import type { ComponentProps } from "react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./button-styles";
import { Spinner } from "./Spinner";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Shows a spinner and disables the button while an action is in progress. */
  loading?: boolean;
}

export function Button({
  variant,
  size,
  fullWidth,
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
