import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { FinalCTAAnimation } from "@/components/home/FinalCTAAnimation";

export function FinalCTA() {
  return (
    <Section tone="cream" className="pb-28">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--ink)] px-8 py-16 md:px-16 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,20,37,0.35)_0%,var(--ink)_70%)]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center justify-center text-center">
          <h2 className="heading-md text-[var(--cream)]">
            Ready to build something great?
          </h2>

          <div className="my-6 md:my-8">
            <FinalCTAAnimation />
          </div>

          <p className="max-w-md text-on-dark-muted">
            Book a free discovery call. We&apos;ll talk goals, timeline, and how
            we can help you ship.
          </p>

          <Button
            href={SITE.bookingUrl}
            external
            variant="dark"
            size="lg"
            className="relative z-10 mt-8"
          >
            Get started
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
