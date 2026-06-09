import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { BLOG_POSTS } from "@/lib/blog";

export interface ToolLink {
  to: string;
  label: string;
  desc: string;
}

const ALL_TOOLS: ToolLink[] = [
  { to: "/five-elements", label: "Five Elements Calculator", desc: "Find your Wu Xing element" },
  { to: "/zodiac", label: "Chinese Zodiac Calculator", desc: "Discover your zodiac animal" },
  { to: "/compatibility", label: "Love Compatibility", desc: "Compare two birth dates" },
  { to: "/daily-fortune", label: "Daily Fortune", desc: "Today's personalized forecast" },
];

interface RelatedContentProps {
  /** Tool paths to exclude (usually the current page). */
  excludeTool?: string;
  /** Blog slugs to feature; defaults to the first three posts. */
  articleSlugs?: string[];
  /** Optional heading for context. */
  heading?: string;
}

/**
 * Cross-links result pages and tools to blog articles and sibling tools.
 * Improves internal linking, engagement and average session duration.
 */
export function RelatedContent({
  excludeTool,
  articleSlugs,
  heading = "Keep exploring",
}: RelatedContentProps) {
  const tools = ALL_TOOLS.filter((t) => t.to !== excludeTool).slice(0, 3);
  const articles = articleSlugs
    ? BLOG_POSTS.filter((p) => articleSlugs.includes(p.slug))
    : BLOG_POSTS.slice(0, 3);

  return (
    <section className="mx-auto mt-20 max-w-5xl border-t border-border pt-12">
      <h2 className="display-italic mb-8 text-center text-3xl text-foreground">{heading}</h2>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="label-mono mb-5 text-[11px] text-accent">Related Tools</h3>
          <div className="grid gap-px bg-border">
            {tools.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="group flex items-center justify-between bg-background p-5 transition-colors hover:bg-white/[0.04]"
              >
                <span>
                  <span className="block text-foreground group-hover:text-accent">{t.label}</span>
                  <span className="block text-xs text-muted-foreground">{t.desc}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="label-mono mb-5 text-[11px] text-accent">Related Articles</h3>
          <div className="grid gap-px bg-border">
            {articles.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex items-center justify-between bg-background p-5 transition-colors hover:bg-white/[0.04]"
              >
                <span>
                  <span className="block text-foreground group-hover:text-accent">{p.title}</span>
                  <span className="block text-xs text-muted-foreground">{p.category}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
