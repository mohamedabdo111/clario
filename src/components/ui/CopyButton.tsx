import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./Button";

interface CopyButtonProps {
  value: string;
  /** What is being copied, for the accessible label, e.g. "organization ID". */
  label: string;
}

export function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access can be denied; the value stays visible and selectable.
    }
  }

  return (
    <>
      <Button variant="ghost" size="icon-sm" onClick={copy} aria-label={`Copy ${label}`} className="size-6">
        {copied ? <Check aria-hidden className="text-success" /> : <Copy aria-hidden />}
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? `Copied ${label}` : ""}
      </span>
    </>
  );
}
