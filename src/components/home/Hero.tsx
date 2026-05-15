import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="mesh-bg absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            {SITE.tagline}
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.1]">
            Build AI products and{" "}
            <span className="gradient-text">scalable platforms</span> that ship fast
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {SITE.description} Partner with senior engineers who deliver production-ready
            software—from MVP to scale.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={SITE.bookingUrl} external size="lg">
              Book a Call
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/case-studies" variant="secondary" size="lg">
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
