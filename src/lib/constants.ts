export const SITE = {
  name: "TamadevLabs",
  tagline: "AI & Full Stack Engineering",
  description:
    "We build AI products, SaaS platforms, and modern web apps for startups ready to ship.",
  email: "hello@tamadevlabs.com",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    "https://calendly.com/tamadevlabs/discovery",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
] as const;

export type SocialPlatform = "linkedin" | "github" | "x";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

const SOCIAL_LINKS_RAW: SocialLink[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    href:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ??
      "https://www.linkedin.com/company/tamadevlabs",
  },
  {
    platform: "github",
    label: "GitHub",
    href:
      process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/tamadevlabs",
  },
  {
    platform: "x",
    label: "X",
    href: process.env.NEXT_PUBLIC_X_URL ?? "https://x.com/tamadevlabs",
  },
];

export const SOCIAL_LINKS = SOCIAL_LINKS_RAW.filter(
  (link) => link.href.length > 0,
);

export const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
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
