export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  excerpt: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  image: string;
  coverImage: string;
  /** When false, showcase cards use the photo as-is without orange tint or accent backdrop. */
  coverShowcaseTint?: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ai-customer-support",
    title: "AI Customer Support Platform",
    category: "AI / SaaS",
    excerpt:
      "Reduced support ticket volume by 60% with an AI agent trained on product docs and past conversations.",
    problem:
      "A fast growing SaaS startup was drowning in repetitive support tickets, slowing response times and burning out their small support team.",
    solution:
      "We built a RAG powered support agent integrated into their help center and in app chat, with human handoff and analytics dashboards.",
    outcome:
      "60% fewer tier 1 tickets, sub 30 second first response, and support team refocused on high value customer issues.",
    stack: ["Next.js", "OpenAI", "LangChain", "Pinecone", "PostgreSQL"],
    metrics: [
      { label: "Ticket reduction", value: "60%" },
      { label: "First response", value: "under 30s" },
      { label: "CSAT improvement", value: "+24%" },
    ],
    tags: ["AI", "SaaS"],
    image: "/case-studies/ai-customer-support-cover.png",
    coverImage: "/case-studies/ai-customer-support-cover.png",
    coverShowcaseTint: false,
  },
  {
    slug: "ecommerce-saas",
    title: "eCommerce Operations SaaS",
    category: "SaaS / Full Stack",
    excerpt:
      "Unified inventory, orders, and analytics for Shopify merchants in a single dashboard.",
    problem:
      "Merchants juggled multiple tools for inventory sync, order management, and reporting, leading to errors and lost revenue.",
    solution:
      "We delivered a multi tenant SaaS with Shopify integration, real time sync, role based access, and executive reporting.",
    outcome:
      "Launched MVP in 10 weeks; 40+ merchants onboarded in the first quarter with 99.9% uptime.",
    stack: ["Next.js", "Node.js", "Shopify API", "Stripe", "AWS"],
    metrics: [
      { label: "Time to MVP", value: "10 weeks" },
      { label: "Merchants onboarded", value: "40+" },
      { label: "Uptime", value: "99.9%" },
    ],
    tags: ["SaaS", "Ecommerce"],
    image: "/case-studies/ecommerce-saas.svg",
    coverImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "healthcare-dashboard",
    title: "Healthcare Analytics Dashboard",
    category: "Full Stack / UI",
    excerpt:
      "HIPAA aware clinical dashboard giving care teams real time patient insights.",
    problem:
      "A healthcare network needed a secure, accessible dashboard to surface patient metrics without replacing their legacy EHR.",
    solution:
      "We built a responsive analytics portal with role based views, audit logging, and API integration to existing systems.",
    outcome:
      "Care teams save 4+ hours per week on reporting; leadership gets same day visibility into key outcomes.",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS"],
    metrics: [
      { label: "Time saved / week", value: "4+ hrs" },
      { label: "Active users", value: "120+" },
      { label: "Page load", value: "under 1.2s" },
    ],
    tags: ["Healthcare", "Dashboard"],
    image: "/case-studies/healthcare-dashboard.svg",
    coverImage:
      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "internal-ai-automation",
    title: "Internal AI Automation Tool",
    category: "AI / Automation",
    excerpt:
      "Automated document processing and workflow routing for an enterprise operations team.",
    problem:
      "Operations spent hours manually extracting data from invoices and routing approvals across email and spreadsheets.",
    solution:
      "We shipped an internal tool with document AI, custom approval workflows, and Slack notifications.",
    outcome:
      "85% reduction in manual processing time; errors dropped significantly within the first month.",
    stack: ["Python", "OpenAI", "Next.js", "Supabase", "Slack API"],
    metrics: [
      { label: "Processing time", value: "85% less" },
      { label: "Error rate", value: "70% less" },
      { label: "ROI timeline", value: "6 weeks" },
    ],
    tags: ["AI", "Automation"],
    image: "/case-studies/internal-ai-automation.svg",
    coverImage:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=85",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
