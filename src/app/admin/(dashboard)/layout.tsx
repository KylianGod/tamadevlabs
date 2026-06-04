import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </>
  );
}
