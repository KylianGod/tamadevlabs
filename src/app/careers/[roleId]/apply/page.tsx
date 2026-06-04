import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { RoleJobHeader } from "@/components/careers/RoleJobHeader";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { getPublishedRoleById } from "@/lib/data/roles";

type Props = { params: Promise<{ roleId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roleId } = await params;
  const role = await getPublishedRoleById(roleId);
  if (!role) return { title: "Apply" };
  return {
    title: `Apply — ${role.title}`,
    description: `Submit your application for ${role.title} at TamadevLabs.`,
  };
}

export default async function RoleApplicationPage({ params }: Props) {
  const { roleId } = await params;
  const role = await getPublishedRoleById(roleId);
  if (!role) notFound();

  return (
    <Section tone="cream" className="!py-0 pt-12 md:pt-16 pb-12 md:pb-16">
      <div className="mx-auto max-w-2xl mt-3 mb-3">
        <PageBreadcrumb
          backHref="/careers"
          backLabel="Back to careers"
          crumbs={[
            { label: "Careers", href: "/careers" },
            { label: role.title, href: `/careers/${role.id}` },
          ]}
        />
        <RoleJobHeader role={role} activeTab="application" />
        <div className="mt-10 surface-card rounded-2xl p-6 md:p-8">
          <ApplicationForm roleTitle={role.title} roleId={role.id} />
        </div>
      </div>
    </Section>
  );
}
