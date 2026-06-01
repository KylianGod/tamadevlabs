type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "center" | "left";
  onDark?: boolean;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  align = "center",
  onDark = false,
}: PageHeaderProps) {
  const alignClass = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";
  const titleClass = onDark ? "heading-lg text-[var(--cream)]" : "heading-lg";
  const descClass = onDark ? "text-on-dark-muted" : "text-body";

  return (
    <div className={alignClass}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1 className={titleClass}>{title}</h1>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${descClass}`}>{description}</p>
      )}
    </div>
  );
}
