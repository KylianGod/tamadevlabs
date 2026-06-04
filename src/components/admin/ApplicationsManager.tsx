"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Trash2 } from "lucide-react";
import { deleteApplication } from "@/app/admin/actions/applications";
import { ApplicationDetailModal } from "@/components/admin/ApplicationDetailModal";
import type { JobApplication } from "@/lib/types/database";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ApplicationsManager({
  applications,
}: {
  applications: JobApplication[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<JobApplication | null>(null);

  function handleDeleted() {
    router.refresh();
  }

  return (
    <>
      <div className="space-y-8">
        <p className="text-sm text-[var(--ink-soft)]">
          {applications.length} application
          {applications.length === 1 ? "" : "s"} total
        </p>

        <div className="overflow-hidden rounded-xl border border-[var(--border-ink)] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border-ink)] bg-[var(--cream)]">
              <tr>
                <th className="px-4 py-3 font-medium">Applicant</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  Role
                </th>
                <th className="hidden px-4 py-3 font-medium lg:table-cell">
                  Submitted
                </th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-[var(--ink-soft)]"
                  >
                    No applications yet.
                  </td>
                </tr>
              ) : (
                applications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-t border-[var(--border-ink)]"
                  >
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setSelected(application)}
                        className="text-left hover:opacity-80"
                      >
                        <p className="font-medium">
                          {application.first_name} {application.last_name}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                          {application.email}
                        </p>
                        <p className="mt-1 text-xs text-[var(--ink-soft)] md:hidden">
                          {application.role_title}
                        </p>
                      </button>
                    </td>
                    <td className="hidden px-4 py-3 text-[var(--ink-soft)] md:table-cell">
                      {application.role_title}
                    </td>
                    <td className="hidden px-4 py-3 text-[var(--ink-soft)] lg:table-cell">
                      {formatDate(application.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelected(application)}
                          className="rounded-lg p-2 text-[var(--ink-soft)] hover:bg-[var(--cream-muted)] hover:text-[var(--ink)]"
                          aria-label={`View ${application.first_name} ${application.last_name}`}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <form
                          action={async (formData) => {
                            await deleteApplication(formData);
                            handleDeleted();
                          }}
                        >
                          <input
                            type="hidden"
                            name="id"
                            value={application.id}
                          />
                          <button
                            type="submit"
                            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                            aria-label={`Delete ${application.first_name} ${application.last_name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ApplicationDetailModal
        application={selected}
        onClose={() => setSelected(null)}
        onDeleted={handleDeleted}
      />
    </>
  );
}
