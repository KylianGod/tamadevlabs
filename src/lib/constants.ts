export const SITE = {
  name: "TamadevLabs",
  tagline: "AI & Full-Stack Engineering Agency",
  description:
    "We build scalable AI products, SaaS platforms, and modern web applications for startups and growing businesses.",
  email: "hello@tamadevlabs.com",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/tamadevlabs/discovery",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
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
