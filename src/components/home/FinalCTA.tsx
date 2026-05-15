import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SITE } from "@/lib/constants";

export function FinalCTA() {
  return (
    <Section className="pb-28">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-violet-600/20 to-violet-900/30 p-10 text-center md:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)]" />
        <div className="relative">
          <Calendar className="mx-auto h-10 w-10 text-cyan-400" />
          <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl">
            Ready to build something great?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-300">
            Book a free discovery call. We&apos;ll discuss your goals, timeline, and how
            TamadevLabs can help you ship faster.
          </p>
          <div className="mt-8">
            <Button href={SITE.bookingUrl} external size="lg">
              Book a Call
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
