import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { BLOG_POSTS } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI, SaaS development, and engineering from the TamadevLabs team.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <PageHeader
          eyebrow="Blog"
          title="Engineering insights"
          description="Practical guides on AI, SaaS, and shipping products that scale."
        />
      </Section>

      <Section className="pt-0">
        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group glass rounded-2xl p-6 transition-all hover:border-white/15"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                <span className="rounded-full bg-cyan-500/10 px-3 py-0.5 text-cyan-400">
                  {post.category}
                </span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-white group-hover:text-cyan-50">
                {post.title}
              </h2>
              <p className="mt-2 text-zinc-400">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-400"
              >
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
