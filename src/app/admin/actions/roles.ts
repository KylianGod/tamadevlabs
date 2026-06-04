"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { OpenRoleInput } from "@/lib/types/database";

export type ActionResult = {
  error?: string;
  success?: boolean;
};

function parseRoleForm(formData: FormData): OpenRoleInput {
  return {
    title: String(formData.get("title") ?? "").trim(),
    role_type: String(formData.get("role_type") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0),
    published: formData.get("published") === "on",
  };
}

function validateRole(input: OpenRoleInput): string | null {
  if (!input.title) return "Title is required.";
  if (!input.role_type) return "Role type is required.";
  if (!input.description) return "Description is required.";
  return null;
}

export async function createRole(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const input = parseRoleForm(formData);
  const validationError = validateRole(input);
  if (validationError) return { error: validationError };

  const supabase = await createClient();
  const { error } = await supabase.from("open_roles").insert({
    title: input.title,
    role_type: input.role_type,
    description: input.description,
    sort_order: input.sort_order ?? 0,
    published: input.published ?? true,
  });

  if (error) return { error: error.message };

  revalidatePath("/careers");
  revalidatePath("/admin/roles");
  return { success: true };
}

export async function updateRole(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Role ID is missing." };

  const input = parseRoleForm(formData);
  const validationError = validateRole(input);
  if (validationError) return { error: validationError };

  const supabase = await createClient();
  const { error } = await supabase
    .from("open_roles")
    .update({
      title: input.title,
      role_type: input.role_type,
      description: input.description,
      sort_order: input.sort_order ?? 0,
      published: input.published ?? true,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/careers");
  revalidatePath("/admin/roles");
  return { success: true };
}

export async function deleteRole(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const { error } = await supabase.from("open_roles").delete().eq("id", id);

  if (error) return;

  revalidatePath("/careers");
  revalidatePath("/admin/roles");
}
