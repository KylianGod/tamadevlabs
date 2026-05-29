import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { FOOTER_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#0a0a0a]/8 bg-[#f4f3ee]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 text-[#0a0a0a]">
              <LogoMark className="h-11 w-11" />
              <span className="font-serif text-2xl">{SITE.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6b6b6b]">
              {SITE.description}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-60"
            >
              {SITE.email}
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
                    className="text-sm text-[#6b6b6b] transition-colors hover:text-[#0a0a0a]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="eyebrow mb-5">About</h3>
            <p className="text-sm leading-relaxed text-[#6b6b6b]">
              TamadevLabs is an engineering studio specializing in AI, SaaS, and
              full-stack products for founders who want to ship fast.
            </p>
            <Link
              href={SITE.bookingUrl}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-60"
            >
              Book a discovery call
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#0a0a0a]/8 pt-8 text-sm text-[#9a9a9a] sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
