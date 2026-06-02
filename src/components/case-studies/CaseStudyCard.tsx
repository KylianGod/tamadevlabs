import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyVisual } from "@/components/case-studies/CaseStudyVisual";
import type { CaseStudy } from "@/lib/data/case-studies";

type CaseStudyCardProps = {
  study: CaseStudy;
  featured?: boolean;
  showcase?: boolean;
};

export function CaseStudyCard({
  study,
  featured = false,
  showcase = false,
}: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`group block overflow-hidden rounded-2xl transition-shadow hover:shadow-lg ${
        showcase
          ? "border border-[var(--border-ink)] bg-[var(--cream)]"
          : "surface-card"
      } ${featured ? "sm:col-span-2 lg:col-span-2" : ""}`}
    >
      <CaseStudyVisual
        src={showcase ? study.coverImage : study.image}
        alt={study.title}
        featured={featured}
        variant={showcase ? "showcase" : "card"}
        sizes={
          showcase
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            : undefined
        }
      />
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
