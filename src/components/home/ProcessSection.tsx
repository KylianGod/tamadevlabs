import { Section } from "@/components/ui/Section";
import { PROCESS_STEPS } from "@/lib/data/process";

export function ProcessSection() {
  return (
    <Section className="border-t border-white/5">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
          How we work
        </p>
        <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Simple, transparent delivery
        </h2>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((step) => (
          <div key={step.step} className="relative">
            <span className="text-4xl font-bold text-white/10">{step.step}</span>
            <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
