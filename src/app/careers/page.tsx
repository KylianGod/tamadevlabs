import type { Metadata } from "next";
import { MapPin, Clock, Laptop } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join TamadevLabs as a remote developer. Work on AI and full-stack projects with global clients.",
};

const ROLES = [
  {
    title: "Senior Full-Stack Engineer",
    type: "Full-time · Remote",
    description:
      "Build Next.js and Node.js applications end-to-end. 5+ years experience, strong TypeScript, and SaaS delivery background.",
  },
  {
    title: "AI / ML Engineer",
    type: "Full-time · Remote",
    description:
      "Design RAG systems, agents, and LLM integrations. Experience with OpenAI, LangChain, and production AI deployments.",
  },
  {
    title: "Frontend Engineer",
    type: "Contract · Remote",
    description:
      "Craft polished React interfaces and design systems. Strong eye for UX and performance on modern web apps.",
  },
];

const PERKS = [
  { icon: Laptop, label: "Fully remote" },
  { icon: Clock, label: "Flexible hours" },
  { icon: MapPin, label: "Global team" },
];

export default function CareersPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <PageHeader
          eyebrow="Careers"
          title="Build with us from anywhere"
          description="We're a distributed team of senior engineers shipping AI and full-stack products for clients worldwide."
        />
      </Section>

      <Section className="pt-0">
        <div className="flex flex-wrap justify-center gap-8">
          {PERKS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-[#b8b8b8]">
              <Icon className="h-5 w-5 text-[#f5f5f5]" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <h2 className="font-serif text-2xl text-[#f5f5f5]">Open roles</h2>
        <div className="mt-8 space-y-4">
          {ROLES.map((role) => (
            <article
              key={role.title}
              className="flex flex-col gap-4 rounded-2xl border border-[#ff5533]/20 bg-[#1a1a1a] p-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-serif text-xl text-[#f5f5f5]">{role.title}</h3>
                <p className="mt-1 text-sm text-[#b8b8b8]">{role.type}</p>
                <p className="mt-2 text-sm text-[#b8b8b8]">{role.description}</p>
              </div>
              <Button
                href={`mailto:${SITE.email}?subject=Application: ${encodeURIComponent(role.title)}`}
                variant="secondary"
                className="shrink-0"
              >
                Apply
              </Button>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-[#0a0a0a]/8 bg-white p-8 text-center md:p-12">
          <h2 className="font-serif text-2xl text-[#f5f5f5] md:text-3xl">
            Don&apos;t see your role?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[#6b6b6b]">
            Send your portfolio and tell us what you&apos;re great at—we&apos;re always
            open to exceptional talent.
          </p>
          <div className="mt-6">
            <Button
              href={`mailto:${SITE.email}?subject=General Application`}
              size="lg"
            >
              Send application
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
