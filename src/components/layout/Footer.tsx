"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { LogoMark } from "@/components/ui/LogoMark";
import { FOOTER_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const { email, bookingUrl } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-ink)] bg-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 text-[var(--ink)]">
              <LogoMark className="h-11 w-11" />
              <span className="font-serif text-2xl">{SITE.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--ink-muted)]">
              {SITE.description}
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-60"
            >
              {email}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="lg:col-span-3">
            <h3 className="eyebrow mb-5">Navigation</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="eyebrow mb-5">About</h3>
            <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
              TamadevLabs is an engineering studio specializing in AI, SaaS, and
              full stack products for founders who want to ship fast.
            </p>
            <Link
              href={bookingUrl}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-60"
            >
              Book a discovery call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--border-ink)] pt-8 text-sm text-[var(--ink-soft)]">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
