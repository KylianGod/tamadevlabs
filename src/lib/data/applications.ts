import { createClient } from "@/lib/supabase/server";
import type { JobApplication } from "@/lib/types/database";

export async function getAllApplications(): Promise<JobApplication[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as JobApplication[];
}

export async function getApplicationById(
  id: string,
): Promise<JobApplication | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as JobApplication | null) ?? null;
}

export async function getResumeSignedUrl(
  resumePath: string,
): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("resumes")
    .createSignedUrl(resumePath, 3600);

  if (error || !data?.signedUrl) {
    return null;
  }

  return data.signedUrl;
}
