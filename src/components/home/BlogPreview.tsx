import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { BLOG_POSTS } from "@/lib/data/blog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function BlogPreview() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <Section className="border-t border-[#ff5533]/12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-4">Blog</p>
          <h2 className="heading-md text-[#f5f5f5]">Our blog</h2>
        </div>
        <Link href="/blog" className="link-underline text-[#f5f5f5]">
          View all posts
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`}>
              <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-wider text-[#b8b8b8]">
                <span>{post.category}</span>
                <span>·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <h3 className="font-serif text-xl leading-snug text-[#f5f5f5] transition-opacity group-hover:opacity-70 md:text-2xl">
                {post.title}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
