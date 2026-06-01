import type { Metadata } from "next";
import Image from "next/image";
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

  return (
    <>
      <Section className="pt-16 md:pt-24">
        <PageBreadcrumb
          backHref="/case-studies"
          backLabel="All projects"
          crumbs={[{ label: "Projects", href: "/case-studies" }]}
          badge={study.category}
        />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="heading-lg text-[#f5f5f5]">{study.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-[#6b6b6b]">{study.excerpt}</p>
            <div className="mt-8 flex flex-wrap gap-8">
              {study.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-serif text-3xl text-[#f5f5f5]">{m.value}</p>
                  <p className="text-sm text-[#9a9a9a]">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-5">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
              priority
            />
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="font-serif text-xl text-[#f5f5f5]">The challenge</h2>
              <p className="mt-3 leading-relaxed text-[#6b6b6b]">{study.problem}</p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-[#f5f5f5]">Our solution</h2>
              <p className="mt-3 leading-relaxed text-[#6b6b6b]">{study.solution}</p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-[#f5f5f5]">The outcome</h2>
              <p className="mt-3 leading-relaxed text-[#6b6b6b]">{study.outcome}</p>
            </div>
          </div>
          <aside className="h-fit rounded-2xl border border-[#0a0a0a]/8 bg-white p-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-[#9a9a9a]">
              Tech stack
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-[#0a0a0a]/12 px-3 py-1 text-xs text-[#6b6b6b]"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={SITE.bookingUrl} external className="w-full">
                Get started
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
