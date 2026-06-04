"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getResumeDownloadUrl(
  resumePath: string,
): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase.storage
    .from("resumes")
    .createSignedUrl(resumePath, 3600);

  if (error || !data?.signedUrl) return null;

  return data.signedUrl;
}

export async function deleteApplication(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const { data: application, error: fetchError } = await supabase
    .from("job_applications")
    .select("resume_path")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !application) return;

  await supabase.storage.from("resumes").remove([application.resume_path]);

  const { error: deleteError } = await supabase
    .from("job_applications")
    .delete()
    .eq("id", id);

  if (deleteError) return;

  revalidatePath("/admin/applications");
  revalidatePath("/admin");
}
