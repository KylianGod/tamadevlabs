import { TRUST_TECH } from "@/lib/constants";

export function TrustBar() {
  const items = [...TRUST_TECH, ...TRUST_TECH];

  return (
    <section className="overflow-hidden border-b border-[#ff5533]/12 bg-[#0f0f0f] py-6">
      <div className="marquee-track">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="mx-8 shrink-0 text-sm font-medium uppercase tracking-wider text-[#b8b8b8]"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
