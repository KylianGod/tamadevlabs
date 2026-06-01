import type { Metadata } from "next";
import { Calendar, Mail, MessageSquare } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with TamadevLabs for AI development, SaaS engineering, or careers.",
};

const CONTACT_OPTIONS = [
  {
    icon: Calendar,
    title: "Book a discovery call",
    description: "Best for project inquiries. Pick a time that works for you.",
    action: (
      <Button href={SITE.bookingUrl} external>
        Book on Cal.com
      </Button>
    ),
  },
  {
    icon: Mail,
    title: "Email us",
    description: "For general questions, partnerships, or async communication.",
    action: (
      <Button href={`mailto:${SITE.email}`} variant="secondary">
        {SITE.email}
      </Button>
    ),
  },
  {
    icon: MessageSquare,
    title: "Send a message",
    description: "Tell us about your project. We respond within 1 business day.",
    action: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <Section tone="cream" className="pt-16 md:pt-24">
        <PageHeader
          eyebrow="Contact"
          title={
            <>
              Let&apos;s talk about your{" "}
              <span className="text-[var(--accent)]">project</span>
            </>
          }
          description="Whether you're a founder with an idea or a developer looking to join our team, we'd love to hear from you."
        />
      </Section>

      <Section tone="muted" className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {CONTACT_OPTIONS.map((option) => (
            <div key={option.title} className="surface-card rounded-2xl p-6">
              <option.icon className="h-7 w-7 text-[var(--ink)]" />
              <h2 className="mt-4 font-serif text-xl text-[var(--ink)]">{option.title}</h2>
              <p className="mt-2 text-sm text-body">{option.description}</p>
              {option.action && <div className="mt-6">{option.action}</div>}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center font-serif text-2xl text-[var(--ink)]">Quick message</h2>
          <p className="mt-2 text-center text-sm text-body">
            Fill out the form and we&apos;ll get back to you shortly.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
