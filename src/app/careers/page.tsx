import type { Metadata } from "next";
import Link from "next/link";
import { CAREERS_PERKS } from "@/lib/careers/icons";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { getPublishedRoles } from "@/lib/data/roles";
import { getRoleExcerpt, hasMoreDescription } from "@/lib/roles/description";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join TamadevLabs as a remote developer. Work on AI and full stack projects with global clients.",
};

const ROLES_PER_PAGE = 5;

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function CareersPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const roles = await getPublishedRoles();

  const totalPages = Math.max(1, Math.ceil(roles.length / ROLES_PER_PAGE));
  const requestedPage = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const currentPage = Math.min(requestedPage, totalPages);
  const start = (currentPage - 1) * ROLES_PER_PAGE;
  const paginatedRoles = roles.slice(start, start + ROLES_PER_PAGE);

  return (
    <>
      <Section tone="cream" className="!pt-28 md:!pt-40 !pb-10 md:!pb-14">
        <PageHeader
          eyebrow="Careers"
          title={
            <>
              Build with us from{" "}
              <span className="text-[var(--accent)]">anywhere</span>
            </>
          }
          description="We're a distributed team of senior engineers shipping AI and full stack products for clients worldwide."
        />

        <div className="mt-5 flex flex-wrap justify-center gap-6 md:gap-8">
          {CAREERS_PERKS.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-body">
              <Icon className="h-5 w-5 text-[var(--ink)]" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-8 font-serif text-2xl text-[var(--ink)]">
          Open roles
        </h2>
        <div className="mt-5 space-y-4">
          {paginatedRoles.map((role) => (
            <article
              key={role.id}
              className="surface-card flex flex-col gap-4 rounded-2xl p-6 md:flex-row md:items-start md:justify-between"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-xl text-[var(--ink)]">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm text-body-soft">{role.type}</p>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  {getRoleExcerpt(role.description)}
                </p>
                {hasMoreDescription(role.description) ? (
                  <Link
                    href={`/careers/${role.id}`}
                    className="mt-2 inline-block text-sm font-medium text-[var(--accent)] underline-offset-2 hover:underline"
                  >
                    Read full description
                  </Link>
                ) : null}
              </div>
              <Button
                href={`/careers/${role.id}/apply`}
                variant="secondary"
                className="shrink-0"
              >
                Apply
              </Button>
            </article>
          ))}
        </div>
        <div className="mb-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/careers"
          />
        </div>
      </Section>

      <Section tone="blend">
        <div className="surface-card-dark rounded-2xl p-8 text-center md:p-12">
          <h2 className="font-serif text-2xl text-[var(--cream)] md:text-3xl">
            Don&apos;t see your role?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-on-dark-muted">
            Send your portfolio and tell us what you&apos;re great at.
            We&apos;re always open to exceptional talent.
          </p>
          <div className="mt-6">
            <Button href="/careers/apply" variant="dark" size="lg">
              Send application
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
