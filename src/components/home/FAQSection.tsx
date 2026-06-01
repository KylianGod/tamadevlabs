"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { FAQS } from "@/lib/data/faqs";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section tone="muted">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">FAQs</p>
          <h2 className="heading-md">
            <span className="text-[var(--accent)]">Got a question?</span> We&apos;ve
            got the answer.
          </h2>
        </div>

        <div className="divide-y divide-[var(--border-ink)] border-y border-[var(--border-ink)] lg:col-span-8">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="font-serif text-lg text-[var(--ink)] md:text-xl">
                    {faq.question}
                  </span>
                  <span className="mt-1 shrink-0 text-body-soft">
                    {isOpen ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-6 text-sm leading-relaxed text-body">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
