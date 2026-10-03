import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AuthPanel } from "@/features/auth/components/AuthPanel";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { BackToSignIn } from "./BackToSignIn";

const RESET_LINK_LIFETIME = "30 minutes";

export function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  if (sentTo) {
    return (
      <AuthPanel title="Check your email" footer={<BackToSignIn />}>
        <div role="status" className="flex flex-col gap-4 text-base text-fg-muted">
          <p>
            If an account exists for <span className="font-medium text-fg">{sentTo}</span>, we've sent a link to reset
            your password. The link expires in {RESET_LINK_LIFETIME}.
          </p>
          <p className="text-sm">
            Didn't get it? Check your spam folder, or make sure you used the email address your organization invited.
          </p>
          <Button onClick={() => setSentTo(null)} fullWidth size="lg">
            Use a different email
          </Button>
        </div>
      </AuthPanel>
    );
  }

  return (
    <AuthPanel
      title="Reset your password"
      description="Enter your work email and we'll send you a link to choose a new password."
      footer={<BackToSignIn />}
    >
      <ForgotPasswordForm onSent={setSentTo} />
    </AuthPanel>
  );
}
