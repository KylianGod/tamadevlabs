import { TRUST_TECH } from "@/lib/constants";

export function TrustBar() {
  const items = [...TRUST_TECH, ...TRUST_TECH];

  return (
    <section className="overflow-hidden border-b border-[#0a0a0a]/8 py-6">
      <div className="marquee-track">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="mx-8 shrink-0 text-sm font-medium uppercase tracking-wider text-[#9a9a9a]"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
