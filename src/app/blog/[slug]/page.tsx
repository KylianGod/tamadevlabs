import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
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
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
        <span className="text-sm font-medium text-cyan-400">{post.category}</span>
        <h1 className="mt-3 text-4xl font-bold text-white">{post.title}</h1>
        <p className="mt-4 text-zinc-500">
          {post.readTime} read · {new Date(post.date).toLocaleDateString("en-US")}
        </p>
      </Section>

      <Section className="pt-0">
        <div className="prose prose-invert mx-auto max-w-2xl">
          <p className="text-lg leading-relaxed text-zinc-300">{post.excerpt}</p>
          <p className="mt-6 leading-relaxed text-zinc-400">
            Full article content coming soon. In the meantime, book a call to discuss
            how these ideas apply to your product.
          </p>
        </div>
        <div className="mt-12 text-center">
          <Button href={SITE.bookingUrl} external>
            Book a Call
          </Button>
        </div>
      </Section>
    </>
  );
}
