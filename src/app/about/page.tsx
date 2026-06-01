import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { TRUST_TECH, SITE } from "@/lib/constants";
import { TechLogo } from "@/components/ui/TechLogo";

export const metadata: Metadata = {
  title: "About",
  description:
    "TamadevLabs is an AI-first engineering studio helping startups ship scalable products faster.",
};

const VALUES = [
  {
    title: "Speed without shortcuts",
    description:
      "We ship MVPs in weeks with production-grade code—not throwaway prototypes.",
  },
  {
    title: "Technical depth",
    description:
      "Senior engineers across AI, full-stack, and cloud who own outcomes end-to-end.",
  },
  {
    title: "Transparent partnership",
    description:
      "Weekly demos, clear communication, and no black-box delivery.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section tone="cream" className="pt-16 md:pt-24">
        <PageHeader
          eyebrow="About us"
          title="Engineering built for founders"
          description="TamadevLabs partners with startups to design, build, and scale modern software—from AI automation to full-stack SaaS."
        />
      </Section>

      <Section tone="muted" className="pt-0">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-body">
          <p>
            We started TamadevLabs because too many agencies overpromise and
            underdeliver. Our team is built around senior engineers who have
            shipped real products in production.
          </p>
          <p>
            Whether you need an AI support agent, a multi-tenant SaaS platform,
            or embedded developers in your stack, we bring clarity, velocity,
            and measurable results.
          </p>
        </div>
      </Section>

      <Section tone="cream">
        <h2 className="heading-md text-center">What we believe</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="surface-card rounded-2xl p-6">
              <h3 className="font-serif text-xl text-[var(--ink)]">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{v.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="blend">
        <h2 className="heading-md text-center text-[var(--cream)]">Our stack</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-on-dark-muted">
          Modern, battle-tested technologies.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {TRUST_TECH.map((tech) => (
            <span
              key={tech.id}
              className="flex items-center justify-center rounded-full border border-[var(--border-cream)] px-6 py-3"
            >
              <TechLogo tech={tech} variant="on-dark" size="sm" />
            </span>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="text-center">
          <Button href={SITE.bookingUrl} external variant="dark" size="lg">
            Work with us
          </Button>
        </div>
      </Section>
    </>
  );
}
