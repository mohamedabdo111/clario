import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { buttonStyles } from "@/components/ui/button-styles";
import { AuthPanel } from "@/features/auth/components/AuthPanel";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { paths } from "@/lib/routes";
import { BackToSignIn } from "./BackToSignIn";

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <AuthPanel
        title="This reset link isn't valid"
        description="The link is incomplete or has already been used. Request a new one to reset your password."
        footer={<BackToSignIn />}
      >
        <Link to={paths.auth.forgotPassword} className={buttonStyles({ variant: "primary", size: "lg", fullWidth: true })}>
          Request a new link
        </Link>
      </AuthPanel>
    );
  }

  if (done) {
    return (
      <AuthPanel title="Password updated">
        <div role="status" className="flex flex-col gap-5">
          <p className="flex items-start gap-2 text-base text-fg-muted">
            <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
            Your password has been changed. Other devices signed in to your account have been signed out.
          </p>
          <Link to={paths.auth.signIn} className={buttonStyles({ variant: "primary", size: "lg", fullWidth: true })}>
            Continue to sign in
          </Link>
        </div>
      </AuthPanel>
    );
  }

  return (
    <AuthPanel title="Choose a new password" description="Use a password you don't use for other sites." footer={<BackToSignIn />}>
      <ResetPasswordForm token={token} onSuccess={() => setDone(true)} />
    </AuthPanel>
  );
}
