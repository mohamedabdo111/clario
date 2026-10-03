import { AuthPanel } from "@/features/auth/components/AuthPanel";
import { SignInForm } from "@/features/auth/components/SignInForm";

export function SignInPage() {
  return (
    <AuthPanel
      title="Sign in to Clario"
      description="Use your work email to continue."
      footer="Don't have an account? Ask your organization's administrator for an invitation."
    >
      <SignInForm />
    </AuthPanel>
  );
}
