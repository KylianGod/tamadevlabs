type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "center" | "left";
};

export function PageHeader({
  title,
  description,
  eyebrow,
  align = "center",
}: PageHeaderProps) {
  const alignClass = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  return (
    <div className={alignClass}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1 className="heading-lg text-[#0a0a0a]">{title}</h1>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-[#6b6b6b]">{description}</p>
      )}
    </div>
  );
}
