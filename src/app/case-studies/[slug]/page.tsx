import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyVisual } from "@/components/case-studies/CaseStudyVisual";
import { Section } from "@/components/ui/Section";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Button } from "@/components/ui/Button";
import {
  CASE_STUDIES,
  getCaseStudyBySlug,
} from "@/lib/data/case-studies";
import { getContactInfo } from "@/lib/data/contact";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Project" };
  return {
    title: study.title,
    description: study.excerpt,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const contact = await getContactInfo();
  const showcaseHero = study.coverShowcaseTint !== false;

  return (
    <>
      <Section tone="cream" className="pt-16 md:pt-24">
        <PageBreadcrumb
          backHref="/case-studies"
          backLabel="All projects"
          crumbs={[{ label: "Projects", href: "/case-studies" }]}
          badge={study.category}
        />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="heading-lg">{study.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-body">{study.excerpt}</p>
            <div className="mt-8 flex flex-wrap gap-8">
              {study.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-serif text-3xl text-[var(--ink)]">{m.value}</p>
                  <p className="text-sm text-body-soft">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl lg:col-span-5">
            <CaseStudyVisual
              src={study.coverImage}
              alt={study.title}
              variant={showcaseHero ? "hero-showcase" : "hero"}
              showcaseTint={showcaseHero ? true : undefined}
              priority
              sizes="(max-width: 1024px) 100vw, 500px"
            />
          </div>
        </div>
      </Section>

      <Section tone="muted" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="font-serif text-xl text-[var(--ink)]">The challenge</h2>
              <p className="mt-3 leading-relaxed text-body">{study.problem}</p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-[var(--ink)]">Our solution</h2>
              <p className="mt-3 leading-relaxed text-body">{study.solution}</p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-[var(--ink)]">The outcome</h2>
              <p className="mt-3 leading-relaxed text-body">{study.outcome}</p>
            </div>
          </div>
          <aside className="surface-card h-fit rounded-2xl p-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-body-soft">
              Tech stack
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-[var(--border-ink)] px-3 py-1 text-xs text-body"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={contact.bookingUrl} external className="w-full">
                Get started
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
