"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FileText, LayoutDashboard, LogOut, Mail } from "lucide-react";
import { signOut } from "@/app/admin/actions/auth";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/roles", label: "Open roles", icon: Briefcase },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/contact", label: "Contact info", icon: Mail },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--border-ink)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-8">
          <Link
            href="/admin"
            className="font-serif text-lg font-semibold text-[var(--ink)]"
          >
            TamadevLabs Admin
          </Link>
          <nav className="flex flex-wrap gap-1">
            {LINKS.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[var(--ink)] text-[var(--cream)]"
                      : "text-[var(--ink-soft)] hover:bg-[var(--cream-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]"
          >
            View site
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-ink)] px-3 py-2 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--cream-muted)]"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
