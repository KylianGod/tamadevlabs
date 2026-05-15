import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Section } from "@/components/ui/Section";
import { CASE_STUDIES } from "@/lib/data/case-studies";

export function CaseStudiesPreview() {
  const featured = CASE_STUDIES.slice(0, 3);

  return (
    <Section id="case-studies">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
            Portfolio
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Featured case studies
          </h2>
          <p className="mt-4 max-w-xl text-zinc-400">
            Real outcomes from AI, SaaS, and full-stack projects we&apos;ve shipped for
            startups and growing teams.
          </p>
        </div>
        <Link
          href="/case-studies"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {featured.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </Section>
  );
}
