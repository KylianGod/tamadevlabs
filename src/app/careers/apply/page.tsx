import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

export const metadata: Metadata = {
  title: "Apply",
  description: "Submit a general application to join TamadevLabs.",
};

export default function GeneralApplicationPage() {
  return (
    <Section tone="cream" className="!py-0 pt-12 md:pt-16 pb-12 md:pb-16">
      <div className="mx-auto max-w-2xl mt-2 mb-3">
        <PageBreadcrumb backHref="/careers" backLabel="Back to careers" />
        <header className="text-center">
          <h1 className="heading-md text-[var(--ink)]">General application</h1>
          <p className="mt-2 text-sm text-body-soft">
            Don&apos;t see your role? Tell us what you&apos;re great at.
          </p>
        </header>
        <div className="mt-10 surface-card rounded-2xl p-6 md:p-8">
          <ApplicationForm roleTitle="General Application" />
        </div>
      </div>
    </Section>
  );
}
