type MarqueeProps = {
  text: string;
  className?: string;
};

export function Marquee({ text, className = "" }: MarqueeProps) {
  const repeated = Array.from({ length: 6 }, (_, i) => (
    <span
      key={i}
      className="mx-10 shrink-0 font-serif text-5xl tracking-tight text-[#0a0a0a]/10 md:text-7xl"
    >
      {text}
    </span>
  ));

  return (
    <div className={`overflow-hidden border-y border-[#0a0a0a]/8 py-8 ${className}`}>
      <div className="marquee-track">
        {repeated}
        {repeated}
      </div>
    </div>
  );
}
