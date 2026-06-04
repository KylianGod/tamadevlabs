"use client";

import { useActionState } from "react";
import { updateContactInfo } from "@/app/admin/actions/contact";
import type { ActionResult } from "@/app/admin/actions/roles";
import type { ContactInfo } from "@/lib/types/database";

const inputClass =
  "w-full rounded-lg border border-[var(--border-ink)] bg-white px-4 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--ink)]/30 focus:outline-none focus:ring-1 focus:ring-[var(--ink)]/10";

export function ContactInfoForm({ contact }: { contact: ContactInfo | null }) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    updateContactInfo,
    {},
  );

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      {state.error ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
          Contact information updated across the site.
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Public email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={contact?.email ?? ""}
          className={inputClass}
          placeholder="hello@tamadevlabs.com"
        />
        <p className="mt-1 text-xs text-[var(--ink-soft)]">
          Used in footer, contact page, careers apply links, and the contact form.
        </p>
      </div>
      <div>
        <label htmlFor="booking_url" className="mb-1.5 block text-sm font-medium">
          Booking URL
        </label>
        <input
          id="booking_url"
          name="booking_url"
          type="url"
          required
          defaultValue={contact?.booking_url ?? ""}
          className={inputClass}
          placeholder="https://cal.com/tamadevlabs/discovery"
        />
        <p className="mt-1 text-xs text-[var(--ink-soft)]">
          Cal.com or other scheduling link shown in CTAs site-wide.
        </p>
      </div>
      {contact?.updated_at ? (
        <p className="text-xs text-[var(--ink-soft)]">
          Last updated: {new Date(contact.updated_at).toLocaleString()}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-[var(--cream)] disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save contact info"}
      </button>
    </form>
  );
}
