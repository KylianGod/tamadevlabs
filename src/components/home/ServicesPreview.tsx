import Link from "next/link";
import { ArrowRight, Bot, Code2, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SERVICES } from "@/lib/data/services";

const ICONS = {
  ai: Bot,
  fullstack: Code2,
  ui: Code2,
  team: Users,
} as const;

const FEATURED_SLUGS = ["ai-development", "saas-development", "team-augmentation"];

export function ServicesPreview() {
  const featured = SERVICES.filter((s) => FEATURED_SLUGS.includes(s.slug));

  return (
    <Section id="services">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
          What we do
        </p>
        <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Engineering services that scale
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          From AI systems to full-stack SaaS—we help you ship faster with senior talent
          and proven delivery.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {featured.map((service) => {
          const Icon = ICONS[service.icon];
          return (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              className="group glass rounded-2xl p-6 transition-all hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 p-3">
                <Icon className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {service.shortDescription}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
        >
          View all services <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
