import Link from "next/link";
import type { PublicRole } from "@/lib/data/roles";

type RoleJobHeaderProps = {
  role: PublicRole;
  activeTab: "overview" | "application";
};

export function RoleJobHeader({ role, activeTab }: RoleJobHeaderProps) {
  const basePath = `/careers/${role.id}`;

  return (
    <header className="text-center">
      <h1 className="heading-md text-[var(--ink)]">{role.title}</h1>
      <p className="mt-2 text-sm text-body-soft">{role.type}</p>

      <nav
        aria-label="Job sections"
        className="mt-8 flex justify-center gap-8 border-b border-[var(--border-ink)]"
      >
        <Link
          href={basePath}
          className={`pb-3 text-xs font-medium uppercase tracking-wider transition-colors ${
            activeTab === "overview"
              ? "border-b-2 border-[var(--accent)] text-[var(--accent)]"
              : "text-body-soft hover:text-[var(--ink)]"
          }`}
          aria-current={activeTab === "overview" ? "page" : undefined}
        >
          Overview
        </Link>
        <Link
          href={`${basePath}/apply`}
          className={`pb-3 text-xs font-medium uppercase tracking-wider transition-colors ${
            activeTab === "application"
              ? "border-b-2 border-[var(--accent)] text-[var(--accent)]"
              : "text-body-soft hover:text-[var(--ink)]"
          }`}
          aria-current={activeTab === "application" ? "page" : undefined}
        >
          Application
        </Link>
      </nav>
    </header>
  );
}
