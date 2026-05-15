import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { TRUST_TECH, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "TamadevLabs is an AI-first engineering agency helping startups ship scalable products faster.",
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
      <Section className="pt-16 md:pt-24">
        <PageHeader
          eyebrow="About us"
          title="AI-first engineering, built for founders"
          description="TamadevLabs partners with startups and growing businesses to design, build, and scale modern software—from intelligent automation to full-stack SaaS."
        />
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-zinc-400">
          <p>
            We started TamadevLabs because too many agencies overpromise and underdeliver.
            Our team is built around senior engineers who have shipped real products in
            production—not slide decks.
          </p>
          <p>
            Whether you need an AI support agent, a multi-tenant SaaS platform, or embedded
            developers in your stack, we bring the same focus: clarity, velocity, and
            measurable results.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="text-center text-2xl font-bold text-white">What we believe</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="glass rounded-2xl p-6">
              <h3 className="font-semibold text-white">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-center text-2xl font-bold text-white">Our stack</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-zinc-400">
          We work with modern, battle-tested technologies.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {TRUST_TECH.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <Button href={SITE.bookingUrl} external size="lg">
            Work with us
          </Button>
        </div>
      </Section>
    </>
  );
}
