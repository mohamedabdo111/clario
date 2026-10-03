import { Outlet } from "react-router";
import { Logo } from "@/components/layout/Logo";

/** Deliberately plain: the only job of these pages is getting people signed in. */
export function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-canvas">
      <header className="px-6 py-5">
        <Logo />
      </header>
      <main className="flex flex-1 justify-center px-4 pb-16 pt-[6vh] sm:pt-[10vh]">
        <div className="w-full max-w-100">
          <Outlet />
        </div>
      </main>
      <footer className="flex flex-col gap-1 px-6 py-5 text-xs text-fg-subtle sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Clario</span>
        <span>Having trouble signing in? Contact your organization's administrator.</span>
      </footer>
    </div>
  );
}
