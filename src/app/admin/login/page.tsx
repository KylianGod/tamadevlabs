import type { Metadata } from "next";
import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Sign in",
};

type PageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="eyebrow mb-2">TamadevLabs</p>
          <h1 className="font-serif text-2xl text-[var(--ink)]">Admin sign in</h1>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Manage open roles and contact information.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border-ink)] bg-white p-8 shadow-sm">
          <AdminLoginForm next={next} />
        </div>
        <p className="mt-6 text-center text-sm text-[var(--ink-soft)]">
          <Link href="/" className="underline hover:text-[var(--ink)]">
            Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
