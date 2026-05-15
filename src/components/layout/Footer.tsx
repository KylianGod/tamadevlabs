import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#030712]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-semibold text-white">
              {SITE.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
              {SITE.description}
            </p>
            <div className="mt-6">
              <Button href={SITE.bookingUrl} external size="sm">
                Book a Call
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-white"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <Link href="/careers" className="transition-colors hover:text-white">
                  Join our team
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-zinc-500 sm:flex-row">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p className="text-zinc-600">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
