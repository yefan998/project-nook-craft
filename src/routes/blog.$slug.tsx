import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { getPost, BLOG_POSTS, formatPostDate } from "@/lib/blog-helpers";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedContent } from "@/components/RelatedContent";
import { absoluteUrl, breadcrumbJsonLd, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Sìshén` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { property: "og:url", content: absoluteUrl(`/blog/${loaderData.slug}`) },
          { property: "og:image", content: DEFAULT_OG_IMAGE },
          { property: "og:site_name", content: "Sìshén" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: loaderData.title },
          { name: "twitter:description", content: loaderData.excerpt },
          { name: "twitter:image", content: DEFAULT_OG_IMAGE },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: absoluteUrl(`/blog/${loaderData.slug}`) }]
      : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: loaderData.title,
              description: loaderData.excerpt,
              datePublished: loaderData.date,
              image: DEFAULT_OG_IMAGE,
              author: { "@type": "Organization", name: "Sìshén" },
              publisher: { "@type": "Organization", name: "Sìshén" },
              mainEntityOfPage: absoluteUrl(`/blog/${loaderData.slug}`),
            }),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: loaderData.title, path: `/blog/${loaderData.slug}` },
          ]),
        ]
      : [],
  }),
  component: BlogPostPage,
  errorComponent: PostError,
  notFoundComponent: PostNotFound,
});


function BlogPostPage() {
  const post = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <Link
        to="/blog"
        className="label-mono inline-flex items-center gap-2 text-[10px] text-accent hover:gap-3"
      >
        <ArrowLeft className="size-3" /> All articles
      </Link>
      <div className="mt-8 flex items-center gap-4">
        <span className="label-mono text-[10px] text-accent">{post.category}</span>
        <span className="label-mono text-[10px] text-muted-foreground">
          {formatPostDate(post.date)} · {post.readingTime}
        </span>
      </div>
      <h1 className="display-italic mt-4 text-balance text-5xl leading-[1.05] text-foreground">
        {post.title}
      </h1>
      <div className="mt-10 space-y-6">
        {post.body.map((para: string, i: number) => (
          <p key={i} className="text-lg leading-relaxed text-muted-foreground">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-16 border-t border-border pt-10">
        <h2 className="label-mono mb-6 text-[11px] text-accent">Continue reading</h2>
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {BLOG_POSTS.filter((p) => p.slug !== post.slug)
            .slice(0, 2)
            .map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group bg-background p-6 transition-colors hover:bg-white/[0.04]"
              >
                <h3 className="display-italic text-xl text-foreground group-hover:text-accent">
                  {p.title}
                </h3>
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
}

function PostError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="px-6 py-28 text-center">
      <h1 className="display-italic text-3xl text-foreground">This article didn't load</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="mt-6 bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
      >
        Try again
      </button>
    </div>
  );
}

function PostNotFound() {
  return (
    <div className="px-6 py-28 text-center">
      <h1 className="display-italic text-4xl text-accent">Article not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">This piece may have been moved or removed.</p>
      <Link
        to="/blog"
        className="mt-6 inline-block bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
      >
        Back to blog
      </Link>
    </div>
  );
}
