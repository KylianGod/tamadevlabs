import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
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
        <div className="divide-y divide-[#0a0a0a]/8 border-y border-[#0a0a0a]/8">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="group py-10">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-[#9a9a9a]">
                <span>{post.category}</span>
                <span>·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="flex items-center gap-1 normal-case\">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="mt-4 font-serif text-2xl text-[#f5f5f5] md:text-3xl\">
                {post.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[#b8b8b8]\">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-60"
              >
                Read article
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
