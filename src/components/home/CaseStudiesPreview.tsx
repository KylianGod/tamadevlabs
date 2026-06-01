import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Section } from "@/components/ui/Section";
import { CASE_STUDIES } from "@/lib/data/case-studies";

export function CaseStudiesPreview() {
  const featured = CASE_STUDIES.slice(0, 5);

  return (
    <Section id="case-studies" tone="cream">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow mb-4">Portfolio</p>
          <h2 className="heading-md">Explore some of our work</h2>
          <p className="mt-2 font-serif text-2xl text-body-soft md:text-3xl">
            Featured <span className="text-[var(--accent)]">projects</span>
          </p>
        </div>
        <Link href="/case-studies" className="link-underline text-[var(--ink)]">
          All projects
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </Section>
  );
}
