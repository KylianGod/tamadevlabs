import { Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export function TestimonialsSection() {
  return (
    <Section>
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
          Testimonials
        </p>
        <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Trusted by founders and engineering leaders
        </h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <blockquote
            key={t.author}
            className="glass flex flex-col rounded-2xl p-6"
          >
            <p className="flex-1 text-sm leading-relaxed text-zinc-300">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-6 border-t border-white/5 pt-4">
              <p className="font-medium text-white">{t.author}</p>
              <p className="text-sm text-zinc-500">
                {t.role}, {t.company}
              </p>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
