import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { FinalCTAAnimation } from "@/components/home/FinalCTAAnimation";

export function FinalCTA() {
  return (
    <Section tone="cream" className="pb-28">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--ink)] px-8 py-16 md:px-16 md:py-20">
        <FinalCTAAnimation />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[var(--ink)]/80 via-[var(--ink)]/50 to-[var(--ink)]/80"
        />

        <div className="relative z-10">
          <h2 className="heading-md text-center text-[var(--cream)]">
            Ready to build something great?
          </h2>

          <div className="mx-auto mt-8 flex w-full max-w-md flex-col items-center text-center">
            <p className="text-on-dark-muted">
              Book a free discovery call. We&apos;ll talk goals, timeline, and how
              we can help you ship.
            </p>

            <Button
              href={SITE.bookingUrl}
              external
              variant="dark"
              size="lg"
              className="mt-8"
            >
              Get started
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
