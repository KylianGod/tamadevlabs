import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

type Crumb = {
  label: string;
  href?: string;
};

type PageBreadcrumbProps = {
  backHref: string;
  backLabel: string;
  crumbs?: Crumb[];
  badge?: string;
};

export function PageBreadcrumb({
  backHref,
  backLabel,
  crumbs,
  badge,
}: PageBreadcrumbProps) {
  const hasTrail = (crumbs && crumbs.length > 0) || badge;

  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-zinc-400 transition-all hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" />
        {backLabel}
      </Link>

      {hasTrail && (
        <ol className="mt-4 flex flex-wrap items-center gap-y-1 text-sm">
          {crumbs?.map((crumb, index) => (
            <li key={crumb.label} className="flex items-center">
              {index > 0 && (
                <ChevronRight
                  className="mx-2 h-3.5 w-3.5 shrink-0 text-zinc-600"
                  aria-hidden
                />
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-zinc-500 transition-colors hover:text-white"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-zinc-500">{crumb.label}</span>
              )}
            </li>
          ))}
          {badge && (
            <li className="flex items-center">
              {crumbs && crumbs.length > 0 && (
                <ChevronRight
                  className="mx-2 h-3.5 w-3.5 shrink-0 text-zinc-600"
                  aria-hidden
                />
              )}
              <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cyan-400">
                {badge}
              </span>
            </li>
          )}
        </ol>
      )}
    </nav>
  );
}
