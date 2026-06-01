import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/data/services";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI development, SaaS engineering, full stack applications, and team augmentation from TamadevLabs.",
};

export default function ServicesPage() {
  return (
    <>
      <Section tone="cream" className="pt-16 md:pt-24">
        <PageHeader
          eyebrow="Services"
          title="End to end engineering for modern products"
          description="We partner with startups to design, build, and scale AI powered software."
        />
      </Section>

      <Section tone="muted" className="pt-0">
        <div className="divide-y divide-[var(--border-ink)] border-y border-[var(--border-ink)]">
          {SERVICES.map((service, i) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 py-12 md:py-16"
            >
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <span className="text-sm text-body-soft">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <h2 className="mt-2 font-serif text-3xl text-[var(--ink)]">
                    {service.title}
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-lg text-body">{service.description}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-[var(--ink)]"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--ink)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="rounded-2xl border border-[var(--border-cream)] bg-[var(--surface-dark-muted)] px-8 py-12 text-center md:px-12">
          <h2 className="font-serif text-2xl text-[var(--cream)] md:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-on-dark-muted">
            Tell us about your product and we&apos;ll recommend the right approach.
          </p>
          <div className="mt-6">
            <Button href={SITE.bookingUrl} external variant="dark" size="lg">
              Book a discovery call
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
