"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { NAV_LINKS, SITE } from "@/lib/constants";

type HeaderProps = {
  variant?: "hero" | "inner";
};

export function Header({ variant = "inner" }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { bookingUrl } = useSiteSettings();
  const isHero = variant === "hero";

  const headerClass = isHero
    ? "absolute inset-x-0 top-0 z-30"
    : "sticky top-0 z-50 border-b border-[var(--border-ink)] bg-[var(--cream)]/90 backdrop-blur-md";

  const logoClass = isHero
    ? "flex items-center gap-3 text-[var(--cream)] drop-shadow-[0_1px_12px_rgba(6,20,37,0.45)]"
    : "flex items-center gap-3 text-[var(--ink)]";

  const pillClass = isHero
    ? "flex items-center gap-1 rounded-full border border-[var(--cream)]/20 bg-[#061425]/45 px-2 py-2 backdrop-blur-md"
    : "flex items-center gap-1 rounded-full border border-[var(--border-ink)] bg-[var(--ink)]/[0.04] px-2 py-2 backdrop-blur-md";

  const linkClass = (active: boolean) => {
    if (isHero) {
      return active
        ? "rounded-full bg-[var(--cream)]/15 px-4 py-2 text-sm font-medium text-[var(--cream)]"
        : "rounded-full px-4 py-2 text-sm text-[var(--cream)]/80 transition-colors hover:text-[var(--cream)]";
    }
    return active
      ? "rounded-full bg-[var(--ink)]/8 px-4 py-2 text-sm font-medium text-[var(--ink)]"
      : "rounded-full px-4 py-2 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]";
  };

  const ctaClass = isHero
    ? "hidden border-[var(--cream)]/15 bg-[#061425]/85 text-[var(--cream)] hover:bg-[#061425] lg:inline-flex"
    : undefined;

  const menuButtonClass = isHero
    ? "rounded-full border border-[var(--cream)]/20 bg-[#061425]/45 p-2.5 text-[var(--cream)] backdrop-blur-md lg:hidden"
    : "rounded-full border border-[var(--border-ink)] bg-[var(--ink)]/[0.04] p-2.5 text-[var(--ink)] backdrop-blur-md lg:hidden";

  const mobileNavClass = isHero
    ? "border-t border-[var(--cream)]/15 bg-[#061425]/75 px-6 py-4 backdrop-blur-xl lg:hidden"
    : "border-t border-[var(--border-ink)] bg-[var(--cream)] px-6 py-4 lg:hidden";

  const mobileLinkClass = (active: boolean) => {
    if (isHero) {
      return active
        ? "block rounded-lg px-3 py-3 text-sm font-medium text-[var(--cream)]"
        : "block rounded-lg px-3 py-3 text-sm text-[var(--cream)]/75";
    }
    return active
      ? "block rounded-lg px-3 py-3 text-sm font-semibold text-[var(--ink)]"
      : "block rounded-lg px-3 py-3 text-sm text-[var(--ink-soft)]";
  };

  const mobileCtaClass = isHero
    ? "w-full border-[var(--cream)]/15 bg-[#061425] text-[var(--cream)]"
    : "w-full";

  return (
    <header className={headerClass}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" className={logoClass}>
          <LogoMark className="h-10 w-10 md:h-11 md:w-11" />
          <span className="font-serif text-xl tracking-tight md:text-2xl">
            {SITE.name}
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className={pillClass}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={linkClass(pathname === link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href={bookingUrl}
            external
            size="sm"
            className={`${ctaClass ?? ""} hidden lg:inline-flex`}
          >
            Get started
          </Button>
          <button
            type="button"
            className={menuButtonClass}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className={mobileNavClass}>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={mobileLinkClass(pathname === link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button
                href={bookingUrl}
                external
                className={mobileCtaClass}
              >
                Get started
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
