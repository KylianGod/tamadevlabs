import { createClient } from "@/lib/supabase/server";
import type { OpenRole } from "@/lib/types/database";

const FALLBACK_ROLES: Pick<OpenRole, "title" | "role_type" | "description">[] =
  [
    {
      title: "Senior Full Stack Engineer",
      role_type: "Full time · Remote",
      description:
        "Build Next.js and Node.js applications end to end. 5+ years experience, strong TypeScript, and SaaS delivery background.",
    },
    {
      title: "AI / ML Engineer",
      role_type: "Full time · Remote",
      description:
        "Design RAG systems, agents, and LLM integrations. Experience with OpenAI, LangChain, and production AI deployments.",
    },
    {
      title: "Frontend Engineer",
      role_type: "Contract · Remote",
      description:
        "Craft polished React interfaces and design systems. Strong eye for UX and performance on modern web apps.",
    },
  ];

export type PublicRole = {
  id: string;
  title: string;
  type: string;
  description: string;
};

export async function getPublishedRoleById(
  id: string,
): Promise<PublicRole | null> {
  const roles = await getPublishedRoles();
  return roles.find((role) => role.id === id) ?? null;
}

export async function getPublishedRoles(): Promise<PublicRole[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return FALLBACK_ROLES.map((role, index) => ({
      id: `fallback-${index}`,
      title: role.title,
      type: role.role_type,
      description: role.description,
    }));
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("open_roles")
      .select("id, title, role_type, description")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return FALLBACK_ROLES.map((role, index) => ({
        id: `fallback-${index}`,
        title: role.title,
        type: role.role_type,
        description: role.description,
      }));
    }

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      type: row.role_type,
      description: row.description,
    }));
  } catch {
    return FALLBACK_ROLES.map((role, index) => ({
      id: `fallback-${index}`,
      title: role.title,
      type: role.role_type,
      description: role.description,
    }));
  }
}

export async function getAllRoles(): Promise<OpenRole[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("open_roles")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as OpenRole[];
}
