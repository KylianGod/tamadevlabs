"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const featured = TESTIMONIALS[active];

  return (
    <Section dark className="border-y border-[#0a0a0a]/8">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4 text-[#9a9a9a]">Testimonials</p>
          <h2 className="heading-md text-[#f4f3ee]">Stories from our clients</h2>
          <p className="mt-6 text-sm text-[#9a9a9a]">20+ happy clients</p>
        </div>

        <div className="lg:col-span-8">
          <blockquote className="border-l border-[#f4f3ee]/20 pl-6 md:pl-10">
            <p className="font-serif text-2xl leading-snug text-[#f4f3ee] md:text-3xl">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <footer className="mt-8">
              <p className="text-sm font-medium uppercase tracking-wider text-[#f4f3ee]">
                {featured.author}
              </p>
              <p className="mt-1 text-sm text-[#9a9a9a]">
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
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                  active === i
                    ? "border-[#f4f3ee] bg-[#f4f3ee] text-[#0a0a0a]"
                    : "border-[#f4f3ee]/20 text-[#9a9a9a] hover:border-[#f4f3ee]/40"
                }`}
              >
                [{String(i + 1).padStart(2, "0")}]
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {TESTIMONIALS.filter((_, i) => i !== active)
              .slice(0, 2)
              .map((t) => (
                <div
                  key={t.author}
                  className="rounded-xl border border-[#f4f3ee]/10 p-5"
                >
                  <p className="text-sm leading-relaxed text-[#9a9a9a]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-wider text-[#f4f3ee]">
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
