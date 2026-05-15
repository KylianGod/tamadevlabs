export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "rag-production-checklist",
    title: "RAG in Production: A Practical Checklist",
    excerpt:
      "What we learned shipping retrieval-augmented systems for real users—not just demos.",
    date: "2026-04-12",
    readTime: "8 min",
    category: "AI",
  },
  {
    slug: "saas-mvp-in-10-weeks",
    title: "How We Ship SaaS MVPs in 10 Weeks",
    excerpt:
      "Our playbook for scope, stack choices, and milestones that get founders to revenue faster.",
    date: "2026-03-28",
    readTime: "6 min",
    category: "SaaS",
  },
  {
    slug: "choosing-ai-agents-vs-automation",
    title: "AI Agents vs. Workflow Automation: When to Use What",
    excerpt:
      "Not every problem needs an agent. Here's how we decide for client projects.",
    date: "2026-03-05",
    readTime: "5 min",
    category: "AI",
  },
];
