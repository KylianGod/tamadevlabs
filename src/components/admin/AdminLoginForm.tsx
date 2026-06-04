"use client";

import { useActionState } from "react";
import { signIn, type AuthState } from "@/app/admin/actions/auth";

const inputClass =
  "w-full rounded-lg border border-[var(--border-ink)] bg-white px-4 py-2.5 text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus:border-[var(--ink)]/30 focus:outline-none focus:ring-1 focus:ring-[var(--ink)]/10";

export function AdminLoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    signIn,
    {},
  );

  return (
    <form action={formAction} className="space-y-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}
      {state.error ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="admin@tamadevlabs.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-[var(--cream)] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
