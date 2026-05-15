type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
};

export function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-cyan-400">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">{description}</p>
      )}
    </div>
  );
}
