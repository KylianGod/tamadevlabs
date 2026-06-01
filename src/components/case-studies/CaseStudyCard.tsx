import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyVisual } from "@/components/case-studies/CaseStudyVisual";
import type { CaseStudy } from "@/lib/data/case-studies";

type CaseStudyCardProps = {
  study: CaseStudy;
  featured?: boolean;
};

export function CaseStudyCard({ study, featured = false }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`group surface-card block overflow-hidden rounded-2xl transition-shadow hover:shadow-lg ${
        featured ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <CaseStudyVisual src={study.image} alt={study.title} featured={featured} />
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span key={tag} className="text-xs uppercase tracking-wider text-body-soft">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-2 font-serif text-xl text-[var(--ink)] md:text-2xl">{study.title}</h3>
        <span className="mt-4 inline-flex items-center gap-1 text-sm text-body transition-colors group-hover:text-[var(--ink)]">
          View project
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
