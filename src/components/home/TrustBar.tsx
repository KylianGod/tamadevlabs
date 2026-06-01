import { TRUST_TECH } from "@/lib/constants";
import { TechLogo } from "@/components/ui/TechLogo";

export function TrustBar() {
  const items = [...TRUST_TECH, ...TRUST_TECH];

  return (
    <section className="section-tone-ink overflow-hidden border-y border-[var(--border-cream)] py-6">
      <div className="marquee-track">
        {items.map((tech, i) => (
          <TechLogo
            key={`${tech.id}-${i}`}
            tech={tech}
            variant="on-dark"
            className="mx-10 md:mx-12"
          />
        ))}
      </div>
    </section>
  );
}
