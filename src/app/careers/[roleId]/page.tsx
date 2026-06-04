import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Button } from "@/components/ui/Button";
import { RoleJobHeader } from "@/components/careers/RoleJobHeader";
import { getPublishedRoleById } from "@/lib/data/roles";

type Props = { params: Promise<{ roleId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roleId } = await params;
  const role = await getPublishedRoleById(roleId);
  if (!role) return { title: "Role" };
  return { title: role.title, description: role.description };
}

export default async function RoleOverviewPage({ params }: Props) {
  const { roleId } = await params;
  const role = await getPublishedRoleById(roleId);
  if (!role) notFound();

  return (
    <Section tone="cream" className="!py-0 pt-12 md:pt-16 pb-12 md:pb-16">
      <div className="mx-auto max-w-2xl mt-4">
        <PageBreadcrumb
          backHref="/careers"
          backLabel="Back to careers"
          crumbs={[
            { label: "Careers", href: "/careers" },
            { label: role.title, href: `/careers/${role.id}` },
          ]}
        />
        <RoleJobHeader role={role} activeTab="overview" />
        <div className="mt-10 surface-card rounded-2xl p-6 md:p-8 mb-5">
          <h2 className="font-serif text-lg text-[var(--ink)]">
            About this role
          </h2>
          <p className="mt-1 text-sm text-body-soft">{role.type}</p>
          <p className="mt-4 text-body leading-relaxed">{role.description}</p>
          <div className="mt-8">
            <Button href={`/careers/${role.id}/apply`}>
              Apply for this role
            </Button>
          </div>
        </div>
        {/* <p className="mt-6 text-center text-sm text-body-soft">
          Ready to apply?{" "}
          <Link
            href={`/careers/${role.id}/apply`}
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            Go to application
          </Link>
        </p> */}
      </div>
    </Section>
  );
}
