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
    "w-full rounded-xl border border-[#ff5533]/20 bg-[#1a1a1a] px-4 py-3 text-[#f5f5f5] placeholder:text-[#b8b8b8] focus:border-[#ff5533]/40 focus:outline-none focus:ring-1 focus:ring-[#ff5533]/10";

  if (submitted) {
    return (
      <p className="rounded-2xl border border-[#ff5533]/20 bg-[#1a1a1a] p-6 text-center text-sm text-[#b8b8b8]">
        Your email client should open shortly. If it doesn&apos;t, email us at{" "}
        <a href={`mailto:${SITE.email}`} className="underline text-[#f5f5f5]">
          {SITE.email}
        </a>
        .
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-[#b8b8b8]\">
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
        <label htmlFor="email" className="mb-1.5 block text-sm text-[#b8b8b8]\">
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
        <label htmlFor="message" className="mb-1.5 block text-sm text-[#b8b8b8]\">
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
