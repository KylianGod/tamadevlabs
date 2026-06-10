import { createClient } from "@/lib/supabase/server";
import {
  sanitizeRoleDescription,
  sanitizeRoleField,
} from "@/lib/roles/parse-description";
import type { OpenRole } from "@/lib/types/database";

const FALLBACK_ROLES: Pick<OpenRole, "title" | "role_type" | "description">[] =
  [];

export type PublicRole = {
  id: string;
  title: string;
  type: string;
  description: string;
};

function toPublicRole(row: {
  id: string;
  title: string;
  role_type: string;
  description: string;
}): PublicRole {
  return {
    id: row.id,
    title: sanitizeRoleField(row.title),
    type: sanitizeRoleField(row.role_type),
    description: sanitizeRoleDescription(row.description),
  };
}

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
    return FALLBACK_ROLES.map((role, index) =>
      toPublicRole({
        id: `fallback-${index}`,
        title: role.title,
        role_type: role.role_type,
        description: role.description,
      }),
    );
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("open_roles")
      .select("id, title, role_type, description")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return FALLBACK_ROLES.map((role, index) =>
        toPublicRole({
          id: `fallback-${index}`,
          title: role.title,
          role_type: role.role_type,
          description: role.description,
        }),
      );
    }

    return data.map((row) => toPublicRole(row));
  } catch {
    return FALLBACK_ROLES.map((role, index) =>
      toPublicRole({
        id: `fallback-${index}`,
        title: role.title,
        role_type: role.role_type,
        description: role.description,
      }),
    );
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
