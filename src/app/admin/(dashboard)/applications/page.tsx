import type { Metadata } from "next";
import { ApplicationsManager } from "@/components/admin/ApplicationsManager";
import { getAllApplications } from "@/lib/data/applications";

export const metadata: Metadata = {
  title: "Applications",
};

export default async function AdminApplicationsPage() {
  const applications = await getAllApplications();

  return (
    <div>
      <h1 className="font-serif text-3xl text-[var(--ink)]">Applications</h1>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">
        Review and manage job applications submitted from the{" "}
        <a href="/careers" className="underline hover:text-[var(--ink)]">
          careers page
        </a>
        .
      </p>
      <div className="mt-10">
        <ApplicationsManager applications={applications} />
      </div>
    </div>
  );
}
