import type { Metadata } from "next";
import { ContactInfoForm } from "@/components/admin/ContactInfoForm";
import { getContactInfoRow } from "@/lib/data/contact";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact info",
};

export default async function AdminContactPage() {
  let contact = null;

  try {
    contact = await getContactInfoRow();
  } catch {
    contact = null;
  }

  const fallback = {
    id: 1,
    email: SITE.email,
    booking_url: SITE.bookingUrl,
    updated_at: new Date().toISOString(),
  };

  return (
    <div>
      <h1 className="font-serif text-3xl text-[var(--ink)]">Contact information</h1>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">
        Email and booking URL used across the marketing site.
      </p>
      <div className="mt-10 rounded-xl border border-[var(--border-ink)] bg-white p-6">
        <ContactInfoForm contact={contact ?? fallback} />
      </div>
    </div>
  );
}
