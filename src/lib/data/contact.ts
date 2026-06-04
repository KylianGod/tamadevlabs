import { SITE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import type { ContactInfo } from "@/lib/types/database";

export type SiteContact = {
  email: string;
  bookingUrl: string;
};

const DEFAULT_CONTACT: SiteContact = {
  email: SITE.email,
  bookingUrl: SITE.bookingUrl,
};

export async function getContactInfo(): Promise<SiteContact> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return DEFAULT_CONTACT;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_info")
      .select("email, booking_url")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) {
      return DEFAULT_CONTACT;
    }

    return {
      email: data.email,
      bookingUrl: data.booking_url,
    };
  } catch {
    return DEFAULT_CONTACT;
  }
}

export async function getContactInfoRow(): Promise<ContactInfo | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as ContactInfo;
}
