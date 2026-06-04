"use client";

import { useEffect, useState } from "react";
import { Download, Trash2, X } from "lucide-react";
import {
  deleteApplication,
  getResumeDownloadUrl,
} from "@/app/admin/actions/applications";
import type { JobApplication } from "@/lib/types/database";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type ApplicationDetailModalProps = {
  application: JobApplication | null;
  onClose: () => void;
  onDeleted: () => void;
};

export function ApplicationDetailModal({
  application,
  onClose,
  onDeleted,
}: ApplicationDetailModalProps) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState(false);

  useEffect(() => {
    if (!application) {
      setResumeUrl(null);
      setResumeError(false);
      return;
    }

    let cancelled = false;
    setResumeUrl(null);
    setResumeError(false);

    getResumeDownloadUrl(application.resume_path).then((url) => {
      if (cancelled) return;
      if (url) {
        setResumeUrl(url);
      } else {
        setResumeError(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [application]);

  useEffect(() => {
    if (!application) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [application, onClose]);

  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[var(--ink)]/40"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-modal-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[var(--border-ink)] bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-ink)] px-6 py-5">
          <div>
            <h2
              id="application-modal-title"
              className="font-serif text-2xl text-[var(--ink)]"
            >
              {application.first_name} {application.last_name}
            </h2>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">
              Applied for{" "}
              <span className="font-medium text-[var(--ink)]">
                {application.role_title}
              </span>
            </p>
            <p className="mt-0.5 text-sm text-[var(--ink-soft)]">
              Submitted {formatDate(application.created_at)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--ink-soft)] transition-colors hover:bg-[var(--cream-muted)] hover:text-[var(--ink)]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <div className="grid gap-6 sm:grid-cols-2">
            <section>
              <h3 className="font-serif text-lg text-[var(--ink)]">
                Personal information
              </h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-[var(--ink-soft)]">Email</dt>
                  <dd className="mt-0.5 font-medium">
                    <a
                      href={`mailto:${application.email}`}
                      className="text-[var(--ink)] underline-offset-2 hover:underline"
                    >
                      {application.email}
                    </a>
                  </dd>
                </div>
                {application.phone ? (
                  <div>
                    <dt className="text-[var(--ink-soft)]">Phone</dt>
                    <dd className="mt-0.5 font-medium">{application.phone}</dd>
                  </div>
                ) : null}
                {application.linkedin ? (
                  <div>
                    <dt className="text-[var(--ink-soft)]">
                      Portfolio / LinkedIn
                    </dt>
                    <dd className="mt-0.5 font-medium">
                      <a
                        href={application.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-[var(--ink)] underline-offset-2 hover:underline"
                      >
                        {application.linkedin}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </section>

            <section>
              <h3 className="font-serif text-lg text-[var(--ink)]">Resume</h3>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                {application.resume_filename}
              </p>
              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={application.resume_filename}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--cream)] transition-colors hover:opacity-90"
                >
                  <Download className="h-4 w-4" />
                  Download resume
                </a>
              ) : resumeError ? (
                <p className="mt-4 text-sm text-red-600">
                  Resume file could not be loaded.
                </p>
              ) : (
                <p className="mt-4 text-sm text-[var(--ink-soft)]">
                  Loading resume…
                </p>
              )}
            </section>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[var(--border-ink)] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[var(--border-ink)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--cream-muted)]"
          >
            Close
          </button>
          <form
            action={async (formData) => {
              await deleteApplication(formData);
              onDeleted();
              onClose();
            }}
          >
            <input type="hidden" name="id" value={application.id} />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
