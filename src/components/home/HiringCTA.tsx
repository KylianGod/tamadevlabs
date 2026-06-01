import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function HiringCTA() {
  return (
    <Section>
      <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-[#ff5533]/20 bg-[#1a1a1a] p-8 md:flex-row md:items-center md:p-12">
        <div className="max-w-xl">
          <p className="eyebrow mb-4">Careers</p>
          <h2 className="font-serif text-2xl text-[#f5f5f5] md:text-3xl">
            Join our remote engineering team
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#b8b8b8]">
            We&apos;re looking for developers who love AI, clean code, and
            shipping fast.
          </p>
        </div>
        <Button href="/careers" size="lg">
          View open roles
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}
