"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#0a0a0a]/8 bg-[#f4f3ee]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-[#0a0a0a]"
        >
          <LogoMark className="h-10 w-10 md:h-11 md:w-11" />
          <span className="font-serif text-xl tracking-tight md:text-2xl">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-opacity ${
                pathname === link.href
                  ? "font-medium text-[#0a0a0a]"
                  : "text-[#6b6b6b] hover:text-[#0a0a0a]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={SITE.bookingUrl} external size="sm">
            Get started
          </Button>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-[#0a0a0a] hover:bg-[#0a0a0a]/5 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-[#0a0a0a]/8 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-sm ${
                  pathname === link.href
                    ? "font-medium text-[#0a0a0a]"
                    : "text-[#6b6b6b]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button href={SITE.bookingUrl} external className="mt-4 w-full">
              Get started
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
