import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Button } from "@/components/ui/Button";
import { BLOG_POSTS } from "@/lib/data/blog";
import { SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Section className="pt-16 md:pt-24">
        <PageBreadcrumb
          backHref="/blog"
          backLabel="Back to blog"
          crumbs={[{ label: "Blog", href: "/blog" }]}
          badge={post.category}
        />
        <h1 className="heading-lg max-w-3xl text-[#0a0a0a]">{post.title}</h1>
        <p className="mt-4 text-sm text-[#9a9a9a]">
          {post.readTime} read ·{" "}
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-2xl">
          <p className="text-lg leading-relaxed text-[#6b6b6b]">{post.excerpt}</p>
          <p className="mt-6 leading-relaxed text-[#6b6b6b]">
            Full article coming soon. In the meantime, book a call to discuss how
            these ideas apply to your product.
          </p>
        </div>
        <div className="mt-12 text-center">
          <Button href={SITE.bookingUrl} external>
            Get started
          </Button>
        </div>
      </Section>
    </>
  );
}
