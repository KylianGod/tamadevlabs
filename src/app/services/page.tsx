import type { Metadata } from "next";
import { Bot, Code2, Layers, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/data/services";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI development, SaaS engineering, full-stack applications, and team augmentation from TamadevLabs.",
};

const ICONS = {
  ai: Bot,
  fullstack: Code2,
  ui: Layers,
  team: Users,
} as const;

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <PageHeader
          eyebrow="Services"
          title="End-to-end engineering for modern products"
          description="We partner with startups and growing businesses to design, build, and scale AI-powered software."
        />
      </Section>

      <Section className="pt-0">
        <div className="space-y-16">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 glass rounded-3xl p-8 md:p-10"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="shrink-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 p-4">
                    <Icon className="h-8 w-8 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                    <p className="mt-3 text-zinc-400">{service.description}</p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-zinc-300"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Not sure where to start?</h2>
          <p className="mx-auto mt-3 max-w-md text-zinc-400">
            Tell us about your product and we&apos;ll recommend the right engagement model.
          </p>
          <div className="mt-6">
            <Button href={SITE.bookingUrl} external size="lg">
              Book a Discovery Call
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
