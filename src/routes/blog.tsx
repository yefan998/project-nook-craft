import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";
import { pageMeta, canonicalLink, breadcrumbJsonLd } from "@/lib/seo";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: pageMeta({
      title: "Blog — Chinese Metaphysics & Destiny | Sìshén",
      description:
        "Guides and reflections on Chinese metaphysics: the Five Elements, the zodiac, lucky colors and numbers, compatibility and how to align daily life with your nature.",
      path: "/blog",
    }),
    links: canonicalLink("/blog"),
    scripts: [breadcrumbJsonLd(CRUMBS)],
  }),
  component: BlogPage,
});


function BlogPage() {
  return (
    <div className="px-6 py-20 md:py-28">
      <PageHeader
        eyebrow="The Journal"
        title={
          <>
            Notes from the <span className="text-primary">almanac</span>
          </>
        }
        description="Plain-language guides to Chinese metaphysics — written for the modern navigator."
      />

      <div className="animate-reveal mx-auto mt-16 max-w-4xl">
        <div className="grid gap-px bg-border">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group bg-background p-8 transition-colors hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-4">
                <span className="label-mono text-[10px] text-accent">{post.category}</span>
                <span className="label-mono text-[10px] text-muted-foreground">
                  {post.readingTime}
                </span>
              </div>
              <h2 className="display-italic mt-3 text-3xl text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
