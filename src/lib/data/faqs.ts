export type FAQ = {
  question: string;
  answer: string;
};

export const FAQS: FAQ[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most MVPs ship in 8–12 weeks. Larger SaaS builds or AI systems run 3–6 months. We scope clearly upfront so you know the timeline before we start.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. We offer ongoing maintenance, feature sprints, and team augmentation so your product keeps improving after go-live.",
  },
  {
    question: "Can you help with AI strategy, not just code?",
    answer:
      "Absolutely. We help you choose the right approach—agents, RAG, automation, or traditional APIs—and build what actually fits your product.",
  },
  {
    question: "What does working with TamadevLabs look like?",
    answer:
      "Discovery call, technical plan, weekly demos, and transparent delivery. You always know what's shipping and when.",
  },
];
