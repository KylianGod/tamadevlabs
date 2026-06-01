"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-xl border border-[var(--border-ink)] bg-white px-4 py-3 text-[var(--ink)] placeholder:text-body-soft focus:border-[var(--ink)]/30 focus:outline-none focus:ring-1 focus:ring-[var(--ink)]/10";

  if (submitted) {
    return (
      <p className="surface-card rounded-2xl p-6 text-center text-sm text-body">
        Your email client should open shortly. If it doesn&apos;t, email us at{" "}
        <a href={`mailto:${SITE.email}`} className="font-medium text-[var(--ink)] underline">
          {SITE.email}
        </a>
        .
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-body">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-body">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-body">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your project..."
        />
      </div>
      <Button type="submit" className="w-full">
        Send message
      </Button>
    </form>
  );
}
