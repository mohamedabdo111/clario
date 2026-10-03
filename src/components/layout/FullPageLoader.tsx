import { Spinner } from "@/components/ui/Spinner";

export function FullPageLoader() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-canvas text-fg-subtle">
      <Spinner label="Loading Clario" className="size-5" />
    </div>
  );
}
