import { TRUST_TECH } from "@/lib/constants";
import { TechLogo } from "@/components/ui/TechLogo";

const SEGMENT_REPEAT = 3;

export function TrustBar() {
  const segment = Array.from({ length: SEGMENT_REPEAT }, () => TRUST_TECH).flat();
  const items = [...segment, ...segment];

  return (
    <section className="section-tone-ink overflow-hidden border-y border-[var(--border-cream)] py-6">
      <div className="marquee-track items-center gap-10 md:gap-12">
        {items.map((tech, i) => (
          <TechLogo
            key={`${tech.id}-${i}`}
            tech={tech}
            variant="on-dark"
          />
        ))}
      </div>
    </section>
  );
}
