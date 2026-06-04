import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { CASE_STUDIES } from "@/lib/data/case-studies";
import { getContactInfo } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "See how TamadevLabs delivers AI, SaaS, and full stack solutions with measurable outcomes.",
};

export default async function CaseStudiesPage() {
  const contact = await getContactInfo();

  return (
    <>
      <Section tone="cream" className="pt-16 md:pt-24">
        <PageHeader
          eyebrow="Portfolio"
          title={
            <>
              Featured <span className="text-[var(--accent)]">projects</span>
            </>
          }
          description="Real projects, real metrics, from AI support platforms to healthcare dashboards."
        />
      </Section>

      <Section tone="muted" className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} study={study} showcase />
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="surface-ink-panel">
          <h2 className="font-serif text-2xl !text-[var(--accent)] md:text-3xl">
            Have a similar challenge?
          </h2>
          <div className="mt-6">
            <Button href={contact.bookingUrl} external variant="dark" size="lg">
              Get started
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
