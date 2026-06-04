"use client";

import { useActionState, useRef, useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  submitApplication,
  type ApplicationResult,
} from "@/app/careers/actions";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";

const inputClass =
  "w-full rounded-xl border border-[var(--border-ink)] bg-white px-4 py-3 text-[var(--ink)] placeholder:text-body-soft focus:border-[var(--ink)]/30 focus:outline-none focus:ring-1 focus:ring-[var(--ink)]/10";

const ACCEPTED_RESUME =
  ".pdf,.doc,.docx,.odt,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.oasis.opendocument.text,application/rtf,text/rtf";

type ApplicationFormProps = {
  roleTitle: string;
  roleId?: string;
};

const emptyPersonal = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export function ApplicationForm({ roleTitle, roleId }: ApplicationFormProps) {
  const { email } = useSiteSettings();
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, pending] = useActionState<
    ApplicationResult,
    FormData
  >(submitApplication, {});
  const [personal, setPersonal] = useState(emptyPersonal);
  const [linkedin, setLinkedin] = useState("");
  const [resumeLabel, setResumeLabel] = useState<string | null>(null);

  function clearPersonal() {
    setPersonal(emptyPersonal);
    setLinkedin("");
    setResumeLabel(null);
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  }

  function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setResumeLabel(file ? file.name : null);
  }

  if (state.success) {
    return (
      <p className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center text-sm text-green-900">
        Thank you! Your application for <strong>{roleTitle}</strong> has been
        submitted. We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="roleTitle" value={roleTitle} />
      {roleId ? <input type="hidden" name="roleId" value={roleId} /> : null}

      {state.error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
          {state.error.includes("email us") ? (
            <>
              {" "}
              <a
                href={`mailto:${email}?subject=${encodeURIComponent(`Application: ${roleTitle}`)}`}
                className="font-medium underline"
              >
                {email}
              </a>
            </>
          ) : null}
        </p>
      ) : null}

      <p className="text-sm text-body-soft">
        <span className="text-[var(--accent)]">*</span> Required fields
      </p>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg text-[var(--ink)]">
            Personal information
          </h2>
          <button
            type="button"
            onClick={clearPersonal}
            className="inline-flex items-center gap-1.5 text-sm text-body-soft transition-colors hover:text-[var(--ink)]"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm text-body">
              First name <span className="text-[var(--accent)]">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              required
              value={personal.firstName}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, firstName: e.target.value }))
              }
              className={inputClass}
              autoComplete="given-name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-sm text-body">
              Last name <span className="text-[var(--accent)]">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              required
              value={personal.lastName}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, lastName: e.target.value }))
              }
              className={inputClass}
              autoComplete="family-name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-body">
            Email <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={personal.email}
            onChange={(e) =>
              setPersonal((p) => ({ ...p, email: e.target.value }))
            }
            className={inputClass}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm text-body">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={personal.phone}
            onChange={(e) =>
              setPersonal((p) => ({ ...p, phone: e.target.value }))
            }
            className={inputClass}
            autoComplete="tel"
            placeholder="Optional"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-lg text-[var(--ink)]">Resume</h2>
        <p className="text-sm text-body-soft">
          Upload your resume in one of the following formats: .pdf, .doc, .docx,
          .odt, or .rtf (max 5 MB).
        </p>
        <div>
          <label htmlFor="resume" className="mb-1.5 block text-sm text-body">
            Resume file <span className="text-[var(--accent)]">*</span>
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              ref={resumeInputRef}
              id="resume"
              name="resume"
              type="file"
              required
              accept={ACCEPTED_RESUME}
              onChange={handleResumeChange}
              className="sr-only"
            />
            <label
              htmlFor="resume"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--border-ink)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)]/25 hover:bg-[var(--ink)]/5"
            >
              <Upload className="h-4 w-4" />
              Choose file
            </label>
            {resumeLabel ? (
              <span className="truncate text-sm text-body">{resumeLabel}</span>
            ) : (
              <span className="text-sm text-body-soft">No file chosen</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="linkedin" className="mb-1.5 block text-sm text-body">
            Portfolio or LinkedIn
          </label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className={inputClass}
            placeholder="https:// (optional)"
          />
        </div>
      </section>

      <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
