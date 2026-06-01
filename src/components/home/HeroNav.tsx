"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HERO_NAV_LINKS, SITE } from "@/lib/constants";

export function HeroNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.18em] text-white md:text-base"
        >
          {SITE.name}
          <span className="text-white/50">®</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/15 bg-black/35 px-2 py-2 backdrop-blur-md">
            {HERO_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    pathname === link.href
                      ? "bg-white/10 font-medium text-white"
                      : "text-white/75 hover:text-white"
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
            className="hidden border-white/10 bg-black/80 text-white hover:bg-black lg:inline-flex"
          >
            Get started
          </Button>
          <button
            type="button"
            className="rounded-full border border-white/15 bg-black/35 p-2.5 text-white backdrop-blur-md lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-black/60 px-6 py-4 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {HERO_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-sm ${
                    pathname === link.href
                      ? "font-medium text-white"
                      : "text-white/70"
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
                className="w-full border-white/10 bg-black text-white"
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
