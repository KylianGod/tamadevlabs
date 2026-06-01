"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";
import { HERO_NAV_LINKS, SITE } from "@/lib/constants";

export function HeroNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-3 text-[var(--cream)] drop-shadow-[0_1px_12px_rgba(6,20,37,0.45)]">
          <LogoMark className="h-10 w-10 md:h-11 md:w-11" />
          <span className="font-serif text-xl tracking-tight md:text-2xl">
            {SITE.name}
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-[var(--cream)]/20 bg-[#061425]/45 px-2 py-2 backdrop-blur-md">
            {HERO_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    pathname === link.href
                      ? "bg-[var(--cream)]/15 font-medium text-[var(--cream)]"
                      : "text-[var(--cream)]/80 hover:text-[var(--cream)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href={SITE.bookingUrl}
            external
            size="sm"
            className="hidden border-[var(--cream)]/15 bg-[#061425]/85 text-[var(--cream)] hover:bg-[#061425] lg:inline-flex"
          >
            Get started
          </Button>
          <button
            type="button"
            className="rounded-full border border-[var(--cream)]/20 bg-[#061425]/45 p-2.5 text-[var(--cream)] backdrop-blur-md lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--cream)]/15 bg-[#061425]/75 px-6 py-4 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {HERO_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-sm ${
                    pathname === link.href
                      ? "font-medium text-[var(--cream)]"
                      : "text-[var(--cream)]/75"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button
                href={SITE.bookingUrl}
                external
                className="w-full border-[var(--cream)]/15 bg-[#061425] text-[var(--cream)]"
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
