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
  {
    id: "react",
    name: "React",
    logo: "/logos/react.svg",
    width: 96,
    height: 32,
  },
  {
    id: "nextjs",
    name: "Next.js",
    logo: "/logos/nextjs.svg",
    width: 96,
    height: 32,
  },
  {
    id: "openai",
    name: "OpenAI",
    logo: "/logos/openai.svg",
    width: 96,
    height: 32,
  },
  {
    id: "aws",
    name: "AWS",
    logo: "/logos/aws.svg",
    width: 120,
    height: 32,
    wide: true,
  },
  {
    id: "nodejs",
    name: "Node.js",
    logo: "/logos/nodejs.svg",
    width: 96,
    height: 32,
  },
  {
    id: "langchain",
    name: "LangChain",
    logo: "/logos/langchain.svg",
    width: 120,
    height: 32,
    wide: true,
  },
  {
    id: "stripe",
    name: "Stripe",
    logo: "/logos/stripe.svg",
    width: 96,
    height: 32,
  },
  {
    id: "shopify",
    name: "Shopify",
    logo: "/logos/shopify.svg",
    width: 96,
    height: 32,
  },
] as const;

export type TrustTech = (typeof TRUST_TECH)[number];
