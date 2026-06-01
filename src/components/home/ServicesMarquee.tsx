const SERVICE_MARQUEE_ITEMS = [
  { id: "ai", src: "/services-marquee/ai.svg", alt: "AI Development" },
  { id: "saas", src: "/services-marquee/saas.svg", alt: "SaaS Development" },
  {
    id: "fullstack",
    src: "/services-marquee/fullstack.svg",
    alt: "Full Stack Engineering",
  },
  { id: "team", src: "/services-marquee/team.svg", alt: "Team Augmentation" },
] as const;

export function ServicesMarquee() {
  const items = [...SERVICE_MARQUEE_ITEMS, ...SERVICE_MARQUEE_ITEMS];

  return (
    <div className="section-tone-cream overflow-hidden border-y border-[var(--border-ink)] py-8">
      <div className="marquee-track">
        {items.map((item, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${item.id}-${i}`}
            src={item.src}
            alt={item.alt}
            width={80}
            height={80}
            className="services-marquee-icon mx-10 shrink-0 md:mx-14"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
