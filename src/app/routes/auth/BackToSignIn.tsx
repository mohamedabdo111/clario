import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { paths } from "@/lib/routes";

export function BackToSignIn() {
  return (
    <Link to={paths.auth.signIn} className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
      <ArrowLeft aria-hidden className="size-3.5" />
      Back to sign in
    </Link>
  );
}
