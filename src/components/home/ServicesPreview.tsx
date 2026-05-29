import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { SERVICES } from "@/lib/data/services";

export function ServicesPreview() {
  return (
    <>
      <Section id="services">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Our services</p>
            <h2 className="heading-md text-[#0a0a0a]">What we build</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-[#6b6b6b]">
              We design and ship AI systems, SaaS platforms, and full-stack
              products that connect with users and drive real business results.
            </p>
          </div>
        </div>

        <div className="mt-16 divide-y divide-[#0a0a0a]/8 border-y border-[#0a0a0a]/8">
          {SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              className="group flex flex-col gap-4 py-8 transition-colors hover:bg-[#0a0a0a]/[0.02] sm:flex-row sm:items-center sm:justify-between sm:px-4 md:py-10"
            >
              <div className="flex items-start gap-6 md:gap-10">
                <span className="text-sm text-[#9a9a9a]">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-[#0a0a0a] md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm text-[#6b6b6b]">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-[#6b6b6b] opacity-0 transition-opacity group-hover:opacity-100 sm:pr-4">
                Explore
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/services" className="link-underline text-[#0a0a0a]">
            View all services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Marquee text="SERVICES" />
    </>
  );
}
