import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { getErrorMessage } from "@/services/api";
import { authService } from "../services/auth.service";
import { forgotPasswordSchema, type ForgotPasswordValues } from "../schemas/auth.schemas";

interface ForgotPasswordFormProps {
  onSent: (email: string) => void;
}

export function ForgotPasswordForm({ onSent }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      await authService.requestPasswordReset(email);
      onSent(email);
    } catch (error) {
      setError("root", { message: getErrorMessage(error) });
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {errors.root?.message && <Alert tone="danger">{errors.root.message}</Alert>}
      <Field label="Work email" error={errors.email?.message}>
        <Input type="email" size="lg" autoComplete="email" autoFocus disabled={isSubmitting} {...register("email")} />
      </Field>
      <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
        {isSubmitting ? "Sending link…" : "Send reset link"}
      </Button>
    </form>
  );
}
