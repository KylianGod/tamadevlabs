import type { Metadata } from "next";
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

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <PageHeader
          eyebrow="Services"
          title="End-to-end engineering for modern products"
          description="We partner with startups to design, build, and scale AI-powered software."
        />
      </Section>

      <Section className="pt-0">
        <div className="divide-y divide-[#0a0a0a]/8 border-y border-[#0a0a0a]/8">
          {SERVICES.map((service, i) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 py-12 md:py-16"
            >
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <span className="text-sm text-[#9a9a9a]">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <h2 className="mt-2 font-serif text-3xl text-[#f5f5f5]">
                    {service.title}
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-lg text-[#6b6b6b]">{service.description}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-[#f5f5f5]"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#0a0a0a]" />
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

      <Section>
        <div className="rounded-2xl bg-[#0a0a0a] px-8 py-12 text-center md:px-12">
          <h2 className="font-serif text-2xl text-[#f4f3ee] md:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[#9a9a9a]">
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
