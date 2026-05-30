import { Section } from "@/components/ui/Section";
import { PROCESS_STEPS } from "@/lib/data/process";

export function ProcessSection() {
  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-4">How we work</p>
        <h2 className="heading-md text-[#0a0a0a]">Simple, clear delivery</h2>
      </div>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((step) => (
          <div key={step.step} className="border-t border-[#0a0a0a]/12 pt-6">
            <span className="text-sm text-[#9a9a9a]">{step.step}</span>
            <h3 className="mt-3 font-serif text-xl text-[#0a0a0a]">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
