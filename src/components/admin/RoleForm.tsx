"use client";

import { useActionState } from "react";
import {
  createRole,
  updateRole,
  type ActionResult,
} from "@/app/admin/actions/roles";
import type { OpenRole } from "@/lib/types/database";

const inputClass =
  "w-full rounded-lg border border-[var(--border-ink)] bg-white px-3 py-2 text-sm text-[var(--ink)] focus:border-[var(--ink)]/30 focus:outline-none focus:ring-1 focus:ring-[var(--ink)]/10";

type RoleFormProps = {
  role?: OpenRole;
  onCancel?: () => void;
};

export function RoleForm({ role, onCancel }: RoleFormProps) {
  const action = role ? updateRole : createRole;
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    action,
    {},
  );

  return (
    <form action={formAction} className="space-y-4">
      {role ? <input type="hidden" name="id" value={role.id} /> : null}
      {state.error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
          Saved successfully.
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={role?.title}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="role_type" className="mb-1 block text-sm font-medium">
            Type
          </label>
          <input
            id="role_type"
            name="role_type"
            required
            defaultValue={role?.role_type ?? "Full time · Remote"}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="sort_order"
            className="mb-1 block text-sm font-medium"
          >
            Sort order
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={role?.sort_order ?? 0}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={14}
            defaultValue={role?.description}
            className={`${inputClass}`}
          />
        </div>
        <div className="flex items-center gap-2 sm:col-span-2">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={role?.published ?? true}
            className="h-4 w-4 rounded border-[var(--border-ink)]"
          />
          <label htmlFor="published" className="text-sm">
            Published (visible on careers page)
          </label>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--cream)] disabled:opacity-50"
        >
          {pending ? "Saving…" : role ? "Update role" : "Create role"}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[var(--border-ink)] px-4 py-2 text-sm font-medium"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
