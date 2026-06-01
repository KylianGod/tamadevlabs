import { Section } from "@/components/ui/Section";
import { PROCESS_STEPS } from "@/lib/data/process";

export function ProcessSection() {
  return (
    <Section className="bg-[#0f0f0f]">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-4">How we work</p>
        <h2 className="heading-md text-[#f5f5f5]">Simple, clear delivery</h2>
      </div>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((step) => (
          <div key={step.step} className="border-t border-[#ff5533]/12 pt-6">
            <span className="text-sm text-[#b8b8b8]">{step.step}</span>
            <h3 className="mt-3 font-serif text-xl text-[#f5f5f5]">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#b8b8b8]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
