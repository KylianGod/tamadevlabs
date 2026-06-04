"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  pending = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !pending) onCancel();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, pending, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[var(--ink)]/40"
        onClick={pending ? undefined : onCancel}
        disabled={pending}
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-message"
        className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--border-ink)] bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="confirm-modal-title"
            className="font-serif text-xl text-[var(--ink)]"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="rounded-lg p-1.5 text-[var(--ink-soft)] transition-colors hover:bg-[var(--cream-muted)] hover:text-[var(--ink)] disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p id="confirm-modal-message" className="mt-3 text-sm text-[var(--ink-soft)]">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="rounded-lg border border-[var(--border-ink)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--cream-muted)] disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {pending ? "Deleting…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
