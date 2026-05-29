import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/data/case-studies";

type CaseStudyCardProps = {
  study: CaseStudy;
  featured?: boolean;
};

export function CaseStudyCard({ study, featured = false }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`group block overflow-hidden rounded-2xl border border-[#0a0a0a]/8 bg-white transition-shadow hover:shadow-lg ${
        featured ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs uppercase tracking-wider text-[#9a9a9a]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-2 font-serif text-xl text-[#0a0a0a] md:text-2xl">
          {study.title}
        </h3>
        <span className="mt-4 inline-flex items-center gap-1 text-sm text-[#6b6b6b] transition-colors group-hover:text-[#0a0a0a]">
          View project
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
