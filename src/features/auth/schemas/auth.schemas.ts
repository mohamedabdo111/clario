import { z } from "zod";
import { meetsPasswordRules } from "./password-rules";

const email = z
  .string()
  .trim()
  .min(1, "Enter your email address")
  .pipe(z.email("Enter a valid email address"));

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password"),
  remember: z.boolean(),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({ email });
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Enter a new password")
      .refine(meetsPasswordRules, "Password doesn't meet all the requirements"),
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
