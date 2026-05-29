export const SITE = {
  name: "TamadevLabs",
  tagline: "AI & Full-Stack Engineering",
  description:
    "We build AI products, SaaS platforms, and modern web apps for startups ready to ship.",
  email: "hello@tamadevlabs.com",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/tamadevlabs/discovery",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
] as const;

export const TRUST_TECH = [
  "React",
  "Next.js",
  "OpenAI",
  "AWS",
  "Node.js",
  "LangChain",
  "Stripe",
  "Shopify",
] as const;
