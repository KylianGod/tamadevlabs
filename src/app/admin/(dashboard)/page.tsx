import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, FileText, Mail } from "lucide-react";
import { getAllRoles } from "@/lib/data/roles";
import { getAllApplications } from "@/lib/data/applications";
import { getContactInfoRow } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  let roleCount = 0;
  let applicationCount = 0;
  let contactEmail = "—";

  try {
    const roles = await getAllRoles();
    roleCount = roles.length;
  } catch {
    roleCount = 0;
  }

  try {
    const applications = await getAllApplications();
    applicationCount = applications.length;
  } catch {
    applicationCount = 0;
  }

  try {
    const contact = await getContactInfoRow();
    contactEmail = contact?.email ?? "—";
  } catch {
    contactEmail = "—";
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-[var(--ink)]">Dashboard</h1>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">
        Manage careers listings, applications, and site-wide contact details.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/roles"
          className="group rounded-xl border border-[var(--border-ink)] bg-white p-6 transition-shadow hover:shadow-md"
        >
          <Briefcase className="h-8 w-8 text-[var(--accent)]" />
          <h2 className="mt-4 font-serif text-xl">Open roles</h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            {roleCount} role{roleCount === 1 ? "" : "s"} in database
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-[var(--ink)] group-hover:underline">
            Manage roles →
          </span>
        </Link>

        <Link
          href="/admin/applications"
          className="group rounded-xl border border-[var(--border-ink)] bg-white p-6 transition-shadow hover:shadow-md"
        >
          <FileText className="h-8 w-8 text-[var(--accent)]" />
          <h2 className="mt-4 font-serif text-xl">Applications</h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            {applicationCount} application
            {applicationCount === 1 ? "" : "s"} received
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-[var(--ink)] group-hover:underline">
            View applications →
          </span>
        </Link>

        <Link
          href="/admin/contact"
          className="group rounded-xl border border-[var(--border-ink)] bg-white p-6 transition-shadow hover:shadow-md"
        >
          <Mail className="h-8 w-8 text-[var(--accent)]" />
          <h2 className="mt-4 font-serif text-xl">Contact info</h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)] truncate">
            {contactEmail}
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-[var(--ink)] group-hover:underline">
            Edit contact →
          </span>
        </Link>
      </div>
    </div>
  );
}
