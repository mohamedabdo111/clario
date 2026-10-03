import { useId, useState, type ReactNode } from "react";
import { getErrorMessage } from "@/services/api";
import { Alert } from "./Alert";
import { Button } from "./Button";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "./Dialog";
import { Input } from "./Input";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  tone?: "default" | "danger";
  /** May return a promise; the dialog stays open and shows the error if it rejects. */
  onConfirm: () => unknown;
  /** For irreversible actions: the user must type this text before confirming. */
  confirmationText?: string;
  children?: ReactNode;
}

export function ConfirmDialog(props: ConfirmDialogProps) {
  // Remount the body each time the dialog opens so typed text and errors reset.
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      {props.open && <ConfirmDialogBody {...props} />}
    </Dialog>
  );
}

function ConfirmDialogBody({
  onOpenChange,
  title,
  description,
  confirmLabel,
  tone = "default",
  onConfirm,
  confirmationText,
  children,
}: ConfirmDialogProps) {
  const inputId = useId();
  const [typed, setTyped] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const confirmed = !confirmationText || typed.trim() === confirmationText;

  async function handleConfirm() {
    setPending(true);
    setError(null);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (err) {
      setError(err);
    } finally {
      setPending(false);
    }
  }

  return (
    <DialogContent
      size="sm"
      title={title}
      description={description}
      preventOutsideClose={pending}
      footer={
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={pending}>Cancel</Button>
          </DialogClose>
          <Button
            variant={tone === "danger" ? "danger" : "primary"}
            onClick={handleConfirm}
            loading={pending}
            disabled={!confirmed}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      }
    >
      <div className="flex flex-col gap-3">
        {children}
        {confirmationText && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={inputId} className="text-sm text-fg-muted">
              Type <span className="font-mono font-medium text-fg">{confirmationText}</span> to confirm.
            </label>
            <Input
              id={inputId}
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              disabled={pending}
            />
          </div>
        )}
        {error !== null && <Alert tone="danger">{getErrorMessage(error)}</Alert>}
      </div>
    </DialogContent>
  );
}
