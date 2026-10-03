import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { CheckboxField } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { paths } from "@/lib/routes";
import { getErrorMessage } from "@/services/api";
import { useAuth } from "../hooks/useAuth";
import { signInSchema, type SignInValues } from "../schemas/auth.schemas";

/** On success the auth state changes and the guest-only route redirects. */
export function SignInForm() {
  const { signIn } = useAuth();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signIn(values);
    } catch (error) {
      setError("root", { message: getErrorMessage(error) });
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {errors.root?.message && <Alert tone="danger">{errors.root.message}</Alert>}

      <Field label="Work email" error={errors.email?.message}>
        <Input
          type="email"
          size="lg"
          autoComplete="email"
          autoFocus
          disabled={isSubmitting}
          {...register("email")}
        />
      </Field>

      <Field
        label="Password"
        error={errors.password?.message}
        labelAction={
          <Link to={paths.auth.forgotPassword} className="text-sm text-accent hover:text-accent-hover hover:underline">
            Forgot password?
          </Link>
        }
      >
        <PasswordInput size="lg" autoComplete="current-password" disabled={isSubmitting} {...register("password")} />
      </Field>

      <Controller
        control={control}
        name="remember"
        render={({ field }) => (
          <CheckboxField
            label="Keep me signed in on this device"
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked === true)}
            disabled={isSubmitting}
          />
        )}
      />

      <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting} className="mt-1">
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
