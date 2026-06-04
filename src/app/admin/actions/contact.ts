"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/app/admin/actions/roles";

export async function updateContactInfo(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  const bookingUrl = String(formData.get("booking_url") ?? "").trim();

  if (!email) return { error: "Email is required." };
  if (!bookingUrl) return { error: "Booking URL is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("contact_info").upsert({
    id: 1,
    email,
    booking_url: bookingUrl,
  });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/contact");
  revalidatePath("/careers");
  revalidatePath("/admin/contact");
  return { success: true };
}
