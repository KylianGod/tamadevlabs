"use server";

import { createClient } from "@/lib/supabase/server";

export type ApplicationResult = {
  error?: string;
  success?: boolean;
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx", "odt", "rtf"]);

const MIME_BY_EXTENSION: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  odt: "application/vnd.oasis.opendocument.text",
  rtf: "application/rtf",
};

const SETUP_ERROR =
  "Applications are not set up yet. Run supabase/migrations/002_job_applications.sql in the Supabase SQL editor, then try again.";

function getExtension(filename: string): string | null {
  const ext = filename.split(".").pop()?.toLowerCase();
  return ext && ALLOWED_EXTENSIONS.has(ext) ? ext : null;
}

async function assertApplicationsReady(
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<ApplicationResult | null> {
  const { error } = await supabase.from("job_applications").select("id").limit(1);

  if (error?.code === "PGRST205") {
    return { error: SETUP_ERROR };
  }

  return null;
}

export async function submitApplication(
  _prev: ApplicationResult,
  formData: FormData,
): Promise<ApplicationResult> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {
      error:
        "Applications are not available right now. Please email us directly.",
    };
  }

  const roleTitle = String(formData.get("roleTitle") ?? "").trim();
  const roleId = String(formData.get("roleId") ?? "").trim() || null;
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const linkedin = String(formData.get("linkedin") ?? "").trim() || null;
  const resume = formData.get("resume");

  if (!roleTitle) return { error: "Invalid application." };
  if (!firstName) return { error: "First name is required." };
  if (!lastName) return { error: "Last name is required." };
  if (!email) return { error: "Email is required." };
  if (!email.includes("@")) return { error: "Enter a valid email address." };

  if (!(resume instanceof File) || resume.size === 0) {
    return { error: "Resume file is required." };
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return { error: "Resume must be 5 MB or smaller." };
  }

  const ext = getExtension(resume.name);
  if (!ext) {
    return {
      error: "Resume must be a .pdf, .doc, .docx, .odt, or .rtf file.",
    };
  }

  const supabase = await createClient();
  const setupError = await assertApplicationsReady(supabase);
  if (setupError) return setupError;

  const folder = roleId ?? "general";
  const storagePath = `${folder}/${crypto.randomUUID()}.${ext}`;
  const contentType = MIME_BY_EXTENSION[ext];
  const fileBuffer = Buffer.from(await resume.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (uploadError) {
    if (
      uploadError.message.includes("row-level security") ||
      uploadError.message.includes("Bucket not found")
    ) {
      return { error: SETUP_ERROR };
    }

    return {
      error:
        process.env.NODE_ENV === "development"
          ? `Failed to upload resume: ${uploadError.message}`
          : "Failed to upload resume. Please try again.",
    };
  }

  const { error: insertError } = await supabase.from("job_applications").insert({
    role_id: roleId,
    role_title: roleTitle,
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    linkedin,
    resume_path: storagePath,
    resume_filename: resume.name,
  });

  if (insertError) {
    await supabase.storage.from("resumes").remove([storagePath]);
    return {
      error:
        process.env.NODE_ENV === "development"
          ? `Failed to submit application: ${insertError.message}`
          : "Failed to submit application. Please try again.",
    };
  }

  return { success: true };
}
