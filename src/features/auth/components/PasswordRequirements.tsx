import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { PASSWORD_RULES } from "../schemas/password-rules";

/** Live checklist of the password rules. Rendered as the password field's hint. */
export function PasswordRequirements({ value }: { value: string }) {
  return (
    <ul className="mt-0.5 grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
      {PASSWORD_RULES.map((rule) => {
        const met = rule.test(value);
        return (
          <li key={rule.id} className={cn("flex items-center gap-1.5", met ? "text-success-fg" : "text-fg-subtle")}>
            {met ? (
              <Check aria-hidden className="size-3.5 shrink-0" strokeWidth={2.5} />
            ) : (
              <Circle aria-hidden className="size-3 shrink-0 text-fg-disabled" />
            )}
            {rule.label}
            <span className="sr-only">{met ? "(met)" : "(not met)"}</span>
          </li>
        );
      })}
    </ul>
  );
}
