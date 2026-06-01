"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const featured = TESTIMONIALS[active];

  return (
    <Section tone="ink">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">Testimonials</p>
          <h2 className="heading-md !text-[var(--accent)]">Stories from our clients</h2>
          <p className="mt-6 text-sm text-on-dark-muted">20+ happy clients</p>
        </div>

        <div className="lg:col-span-8">
          <blockquote className="border-l border-[var(--border-cream)] pl-6 md:pl-10">
            <p className="font-serif text-2xl leading-snug text-[var(--cream)] md:text-3xl">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <footer className="mt-8">
              <p className="text-sm font-medium uppercase tracking-wider text-[var(--cream)]">
                {featured.author}
              </p>
              <p className="mt-1 text-sm text-on-dark-muted">
                {featured.role} at {featured.company}
              </p>
            </footer>
          </blockquote>

          <div className="mt-10 flex flex-wrap gap-3">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.author}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active === i
                    ? "border-[var(--cream)] bg-[var(--cream)] text-[var(--ink)]"
                    : "border-[var(--border-cream)] text-on-dark-muted hover:border-[var(--cream)]/40"
                }`}
              >
                {t.author.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {TESTIMONIALS.filter((_, i) => i !== active)
              .slice(0, 2)
              .map((t) => (
                <div key={t.author} className="surface-card-dark rounded-xl p-5">
                  <p className="text-sm leading-relaxed text-on-dark-muted">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-wider text-[var(--cream)]">
                    {t.author}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
