import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { paths } from "@/lib/routes";
import { ApiError, getErrorMessage } from "@/services/api";
import { authService } from "../services/auth.service";
import { resetPasswordSchema, type ResetPasswordValues } from "../schemas/auth.schemas";
import { PasswordRequirements } from "./PasswordRequirements";

interface ResetPasswordFormProps {
  token: string;
  onSuccess: () => void;
}

export function ResetPasswordForm({ token, onSuccess }: ResetPasswordFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const password = useWatch({ control, name: "password" });

  const onSubmit = handleSubmit(async ({ password }) => {
    try {
      await authService.resetPassword({ token, password });
      onSuccess();
    } catch (error) {
      setError("root", {
        type: error instanceof ApiError ? error.code : undefined,
        message: getErrorMessage(error),
      });
    }
  });

  const tokenRejected = errors.root?.type === "invalid_token";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {errors.root?.message && (
        <Alert
          tone="danger"
          action={
            tokenRejected && (
              <Link to={paths.auth.forgotPassword} className="text-sm font-medium underline">
                Request new link
              </Link>
            )
          }
        >
          {errors.root.message}
        </Alert>
      )}

      <Field label="New password" error={errors.password?.message} hint={<PasswordRequirements value={password} />}>
        <PasswordInput size="lg" autoComplete="new-password" autoFocus disabled={isSubmitting} {...register("password")} />
      </Field>

      <Field label="Confirm new password" error={errors.confirmPassword?.message}>
        <PasswordInput size="lg" autoComplete="new-password" disabled={isSubmitting} {...register("confirmPassword")} />
      </Field>

      <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting} className="mt-1">
        {isSubmitting ? "Updating password…" : "Update password"}
      </Button>
    </form>
  );
}
