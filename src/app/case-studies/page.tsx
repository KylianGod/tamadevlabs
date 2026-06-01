import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { CASE_STUDIES } from "@/lib/data/case-studies";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "See how TamadevLabs delivers AI, SaaS, and full stack solutions with measurable outcomes.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Section tone="cream" className="pt-16 md:pt-24">
        <PageHeader
          eyebrow="Portfolio"
          title="Featured projects"
          description="Real projects, real metrics, from AI support platforms to healthcare dashboards."
        />
      </Section>

      <Section tone="muted" className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="text-center">
          <p className="text-on-dark-muted">Have a similar challenge?</p>
          <div className="mt-4">
            <Button href={SITE.bookingUrl} external variant="dark">
              Get started
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
