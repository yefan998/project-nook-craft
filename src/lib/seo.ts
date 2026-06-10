// Centralized SEO helpers — single source of truth for the canonical site URL
// and reusable head() metadata builders so every route emits consistent,
// crawler-friendly absolute URLs, Open Graph, Twitter cards and JSON-LD.

export const SITE_URL = "https://project-nook-craft.lovable.app";
export const SITE_NAME = "Sìshén";
export const DEFAULT_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/385ef51c-b75b-45a9-878d-172b531688f9/id-preview-aad9d7e6--e62b36e6-e62a-4aff-b74b-0055a7e4efbc.lovable.app-1780437270955.png";

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

export interface MetaTag {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
}

/**
 * Returns a full meta array for a leaf route: title, description, Open Graph
 * and Twitter cards. Canonical lives in `links` (see canonicalLink) so it is
 * only emitted on leaves — never duplicated from the root.
 */
export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: PageSeoInput): MetaTag[] {
  const url = absoluteUrl(path);
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}

/** Canonical link for a leaf route — always absolute. */
export function canonicalLink(path: string) {
  return [{ rel: "canonical", href: absoluteUrl(path) }];
}

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList JSON-LD script object for use in head().scripts. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: absoluteUrl(c.path),
      })),
    }),
  };
}

/** Article JSON-LD script object — for blog posts. */
export function articleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  image = DEFAULT_OG_IMAGE,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline,
      description,
      image,
      datePublished,
      dateModified: dateModified ?? datePublished,
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    }),
  };
}

/** WebPage JSON-LD script object — for calculators and content pages. */
export function webPageJsonLd({
  name,
  description,
  path,
  datePublished = "2026-01-01",
  image = DEFAULT_OG_IMAGE,
}: {
  name: string;
  description: string;
  path: string;
  datePublished?: string;
  image?: string;
}) {
  const url = absoluteUrl(path);
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      url,
      name,
      headline: name,
      description,
      image,
      datePublished,
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      inLanguage: "en",
    }),
  };
}

/** FAQPage JSON-LD script object. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }),
  };
}
