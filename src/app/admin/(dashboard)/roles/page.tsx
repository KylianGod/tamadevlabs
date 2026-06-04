import type { Metadata } from "next";
import { RolesManager } from "@/components/admin/RolesManager";
import { getAllRoles } from "@/lib/data/roles";

export const metadata: Metadata = {
  title: "Open roles",
};

export default async function AdminRolesPage() {
  const roles = await getAllRoles();

  return (
    <div>
      <h1 className="font-serif text-3xl text-[var(--ink)]">Open roles</h1>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">
        Roles shown on the{" "}
        <a href="/careers" className="underline hover:text-[var(--ink)]">
          careers page
        </a>
        . Unpublished roles are hidden from the public site.
      </p>
      <div className="mt-10">
        <RolesManager roles={roles} />
      </div>
    </div>
  );
}
