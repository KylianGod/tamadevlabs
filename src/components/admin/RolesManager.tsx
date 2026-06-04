"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteRole } from "@/app/admin/actions/roles";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { RoleForm } from "@/components/admin/RoleForm";
import type { OpenRole } from "@/lib/types/database";

export function RolesManager({ roles }: { roles: OpenRole[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<OpenRole | null>(null);

  const editingRole = roles.find((r) => r.id === editingId);

  function handleConfirmDelete() {
    if (!roleToDelete) return;

    const formData = new FormData();
    formData.set("id", roleToDelete.id);

    startTransition(async () => {
      await deleteRole(formData);
      setRoleToDelete(null);
      router.refresh();
    });
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--ink-soft)]">
            {roles.length} role{roles.length === 1 ? "" : "s"} total
          </p>
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setShowCreate((v) => !v);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--cream)]"
          >
            <Plus className="h-4 w-4" />
            Add role
          </button>
        </div>

        {showCreate ? (
          <section className="rounded-xl border border-[var(--border-ink)] bg-white p-6">
            <h2 className="mb-4 font-serif text-lg">New role</h2>
            <RoleForm onCancel={() => setShowCreate(false)} />
          </section>
        ) : null}

        {editingRole ? (
          <section className="rounded-xl border border-[var(--border-ink)] bg-white p-6">
            <h2 className="mb-4 font-serif text-lg">Edit role</h2>
            <RoleForm role={editingRole} onCancel={() => setEditingId(null)} />
          </section>
        ) : null}

        <div className="overflow-hidden rounded-xl border border-[var(--border-ink)] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border-ink)] bg-[var(--cream)]">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  Type
                </th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-[var(--ink-soft)]"
                  >
                    No roles yet. Add your first open role.
                  </td>
                </tr>
              ) : (
                roles.map((role) => (
                  <tr
                    key={role.id}
                    className="border-t border-[var(--border-ink)]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium">{role.title}</p>
                      <p className="mt-0.5 text-xs text-[var(--ink-soft)] md:hidden">
                        {role.role_type}
                      </p>
                    </td>
                    <td className="hidden px-4 py-3 text-[var(--ink-soft)] md:table-cell">
                      {role.role_type}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          role.published
                            ? "bg-green-100 text-green-800"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {role.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowCreate(false);
                            setEditingId(role.id);
                          }}
                          className="rounded-lg p-2 text-[var(--ink-soft)] hover:bg-[var(--cream-muted)] hover:text-[var(--ink)]"
                          aria-label={`Edit ${role.title}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setRoleToDelete(role)}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          aria-label={`Delete ${role.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        open={roleToDelete !== null}
        title="Delete role?"
        message={
          roleToDelete
            ? `"${roleToDelete.title}" will be permanently removed from the careers page. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete role"
        pending={isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!isPending) setRoleToDelete(null);
        }}
      />
    </>
  );
}
