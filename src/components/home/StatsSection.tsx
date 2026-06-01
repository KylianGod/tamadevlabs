"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { STATS } from "@/lib/data/stats";

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const start = performance.now();

          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-serif text-5xl tracking-tight md:text-6xl">
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="heading-md text-[#f5f5f5]">
          More than a vendor. A technical partner.
        </h2>
      </div>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.index}
            className="border-t border-[#ff5533]/12 pt-6"
          >
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <p className="mt-4 text-sm leading-relaxed text-[#b8b8b8]">
              {stat.label}
            </p>
            <p className="mt-6 text-xs text-[#b8b8b8]">[{stat.index}]</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
