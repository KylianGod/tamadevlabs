export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  icon: "ai" | "fullstack" | "ui" | "team";
};

export const SERVICES: Service[] = [
  {
    slug: "ai-development",
    title: "AI Development",
    shortDescription: "Intelligent products that automate and scale your business.",
    description:
      "From proof of concept to production, we design and ship AI systems that integrate cleanly with your product and deliver measurable ROI.",
    features: [
      "AI chatbots & assistants",
      "RAG & knowledge systems",
      "Workflow automation",
      "Autonomous AI agents",
    ],
    icon: "ai",
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    shortDescription: "Subscription ready platforms built for growth.",
    description:
      "We architect multi tenant SaaS products with billing, auth, and analytics baked in from day one, so you can focus on customers, not infrastructure.",
    features: [
      "Multi tenant architecture",
      "Stripe billing integration",
      "Admin dashboards",
      "Analytics & reporting",
    ],
    icon: "fullstack",
  },
  {
    slug: "full-stack-engineering",
    title: "Full Stack Engineering",
    shortDescription: "End to end web applications that scale with your business.",
    description:
      "Modern full stack delivery across APIs, databases, and cloud infrastructure, optimized for performance, security, and maintainability.",
    features: [
      "SaaS applications",
      "Custom dashboards",
      "REST & GraphQL APIs",
      "Cloud deployment (AWS, Vercel)",
    ],
    icon: "fullstack",
  },
  {
    slug: "team-augmentation",
    title: "Team Augmentation",
    shortDescription: "Vetted developers embedded in your workflow.",
    description:
      "Scale your engineering capacity with dedicated TamadevLabs developers who ship in your stack, your process, and your timezone.",
    features: [
      "Hire vetted developers",
      "Dedicated remote teams",
      "Flexible engagement models",
      "Technical leadership included",
    ],
    icon: "team",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
