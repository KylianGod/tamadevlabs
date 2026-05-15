import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Button } from "@/components/ui/Button";
import {
  CASE_STUDIES,
  getCaseStudyBySlug,
} from "@/lib/data/case-studies";
import { SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study" };
  return {
    title: study.title,
    description: study.excerpt,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <Section className="pt-16 md:pt-24">
        <PageBreadcrumb
          backHref="/case-studies"
          backLabel="All case studies"
          crumbs={[{ label: "Case Studies", href: "/case-studies" }]}
          badge={study.category}
        />
        <h1 className="text-4xl font-bold text-white md:text-5xl">
          {study.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">{study.excerpt}</p>
        <div className="mt-8 flex flex-wrap gap-8">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <p className="text-3xl font-bold text-white">{m.value}</p>
              <p className="text-sm text-zinc-500">{m.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-lg font-semibold text-white">The challenge</h2>
              <p className="mt-3 leading-relaxed text-zinc-400">{study.problem}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Our solution</h2>
              <p className="mt-3 leading-relaxed text-zinc-400">{study.solution}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">The outcome</h2>
              <p className="mt-3 leading-relaxed text-zinc-400">{study.outcome}</p>
            </div>
          </div>
          <aside className="glass h-fit rounded-2xl p-6">
            <h3 className="text-sm font-medium text-white">Tech stack</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={SITE.bookingUrl} external className="w-full">
                Book a Call
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
