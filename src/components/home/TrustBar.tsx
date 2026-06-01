import { TRUST_TECH } from "@/lib/constants";

export function TrustBar() {
  const items = [...TRUST_TECH, ...TRUST_TECH];

  return (
    <section className="section-tone-ink overflow-hidden border-y border-[var(--border-cream)] py-6">
      <div className="marquee-track">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="mx-8 shrink-0 text-sm font-medium uppercase tracking-wider text-on-dark-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
