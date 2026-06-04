import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-body transition-colors hover:bg-[var(--ink)]/5"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-body-soft opacity-50"
          aria-hidden
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}

      <div className="flex items-center gap-1">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <Link
              key={page}
              href={pageHref(basePath, page)}
              aria-label={`Page ${page}`}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm transition-colors ${
                isActive
                  ? "bg-[var(--ink)] text-[var(--cream)]"
                  : "text-body hover:bg-[var(--ink)]/5"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-body transition-colors hover:bg-[var(--ink)]/5"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-body-soft opacity-50"
          aria-hidden
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
