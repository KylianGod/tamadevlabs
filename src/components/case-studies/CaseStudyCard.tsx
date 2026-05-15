import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/lib/data/case-studies";

type CaseStudyCardProps = {
  study: CaseStudy;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group glass block overflow-hidden rounded-2xl transition-all hover:border-white/15"
    >
      <div className={`bg-gradient-to-br ${study.gradient} p-6 pb-0`}>
        <span className="text-xs font-medium uppercase tracking-wider text-cyan-400/90">
          {study.category}
        </span>
        <h3 className="mt-2 text-xl font-semibold text-white">{study.title}</h3>
        <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{study.excerpt}</p>
      </div>
      <div className="flex items-center justify-between p-6 pt-4">
        <div className="flex gap-4">
          {study.metrics.slice(0, 2).map((m) => (
            <div key={m.label}>
              <p className="text-lg font-semibold text-white">{m.value}</p>
              <p className="text-xs text-zinc-500">{m.label}</p>
            </div>
          ))}
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors group-hover:border-cyan-500/50 group-hover:text-cyan-400">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
