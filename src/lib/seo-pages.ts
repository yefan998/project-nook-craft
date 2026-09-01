// Unified SEO metadata registry.
// Every static route declares its own title, description, canonical path,
// Open Graph / Twitter data and JSON-LD here. Routes then call
// `routeHead("/path")` inside `head()` so metadata is generated from a single
// source of truth and can never fall back to a shared/duplicate title.

import {
  pageMeta,
  canonicalLink,
  breadcrumbJsonLd,
  webPageJsonLd,
  DEFAULT_OG_IMAGE,
  type Crumb,
} from "./seo";

export interface PageSeoEntry {
  /** Breadcrumb label / short page name. */
  name: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  /** Emit WebApplication JSON-LD (calculator tools). */
  app?: string;
  /** Breadcrumb trail; "Home" is prepended automatically for non-root pages. */
  crumbs?: Crumb[];
  /** Set false to skip WebPage JSON-LD (e.g. legal pages already minimal). */
  webPage?: boolean;
}

export const PAGE_SEO = {
  "/": {
    name: "Home",
    title: "Chinese Zodiac & Five Elements Calculator | Free Wu Xing Analysis",
    description:
      "Discover your Chinese Zodiac sign and Five Elements (Wu Xing) with free calculators. Explore zodiac compatibility, personality traits, lucky colors, lucky numbers, and daily fortune readings.",
  },
  "/zodiac": {
    name: "Chinese Zodiac Calculator",
    title: "Chinese Zodiac Calculator | Sign, Personality & Lucky Numbers",
    description:
      "Find your Chinese zodiac animal from your birth date and read your personality analysis, strengths, weaknesses, best matches, career insights and lucky colors, numbers and directions.",
    app: "Chinese Zodiac Calculator",
  },
  "/five-elements": {
    name: "Five Elements Calculator",
    title: "Five Elements Calculator (Wu Xing) | Wood, Fire, Earth, Metal, Water",
    description:
      "Calculate your Chinese Five Elements (Wu Xing) profile from your birth date — element type, personality analysis, strengths, weaknesses, career suggestions, relationship insights and lucky colors, numbers and directions.",
    app: "Five Elements Calculator",
  },
  "/compatibility": {
    name: "Zodiac Compatibility",
    title: "Chinese Zodiac Compatibility Chart | Love & Relationship Matches",
    description:
      "Compare two birth dates to reveal your Chinese zodiac and Five Elements compatibility score, love match summary, relationship strengths and personalized advice.",
    app: "Chinese Zodiac Compatibility Calculator",
  },
  "/daily-fortune": {
    name: "Daily Fortune",
    title: "Daily Chinese Fortune | Love, Career, Wealth & Health Reading",
    description:
      "Your daily Chinese fortune for love, career, wealth and health — a personalized forecast based on your birth date and today's energy, with lucky colors, numbers and directions.",
    app: "Daily Fortune Reading",
  },
  "/blog": {
    name: "Blog",
    title: "Chinese Astrology Blog | Zodiac, Wu Xing & Feng Shui Guides",
    description:
      "Plain-language guides to Chinese metaphysics: zodiac signs, the Five Elements, feng shui basics, compatibility and how to read your own chart.",
  },
  "/about": {
    name: "About",
    title: "About SiShen | Ancient Chinese Wisdom, Modern Clarity",
    description:
      "SiShen makes traditional Chinese metaphysics approachable — how we build our zodiac and Five Elements tools, what they are based on, and how we treat your data.",
  },
  "/contact": {
    name: "Contact",
    title: "Contact SiShen | Questions, Feedback & Suggestions",
    description:
      "Get in touch with the SiShen team about our Chinese zodiac and Five Elements calculators, report an issue, or suggest a new feature.",
  },
  "/faq": {
    name: "FAQ",
    title: "Chinese Zodiac & Five Elements FAQ | Common Questions Answered",
    description:
      "Answers to common questions about Chinese zodiac signs, the Five Elements, how our calculators work, their accuracy, and how we protect your privacy.",
  },
  "/privacy": {
    name: "Privacy Policy",
    title: "Privacy Policy | How SiShen Handles Your Data",
    description:
      "SiShen is private by design. Read exactly what information we collect, how birth dates are processed, and which third-party services we use.",
    webPage: false,
  },
  "/terms": {
    name: "Terms of Service",
    title: "Terms of Service | Using the SiShen Astrology Tools",
    description:
      "The terms that govern your use of SiShen's Chinese zodiac, Five Elements, compatibility and daily fortune tools, including disclaimers and limitations.",
    webPage: false,
  },
} satisfies Record<string, PageSeoEntry>;

export type PageSeoPath = keyof typeof PAGE_SEO;

/** Breadcrumb trail for a registered page (Home first). */
export function crumbsFor(path: PageSeoPath): Crumb[] {
  const entry = PAGE_SEO[path] as PageSeoEntry;
  if (path === "/") return [{ name: "Home", path: "/" }];
  return entry.crumbs ?? [
    { name: "Home", path: "/" },
    { name: entry.name, path },
  ];
}

/**
 * Full `head()` payload for a registered route: unique title, description,
 * canonical, Open Graph, Twitter card and JSON-LD.
 */
export function routeHead(path: PageSeoPath) {
  const entry = PAGE_SEO[path] as PageSeoEntry;
  const scripts: Array<{ type: string; children: string }> = [];

  if (entry.app) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: entry.app,
        description: entry.description,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }),
    });
  }

  if (entry.webPage !== false) {
    scripts.push(
      webPageJsonLd({
        name: entry.title,
        description: entry.description,
        path,
        image: entry.image ?? DEFAULT_OG_IMAGE,
      }),
    );
  }

  if (path !== "/") scripts.push(breadcrumbJsonLd(crumbsFor(path)));

  return {
    meta: pageMeta({
      title: entry.title,
      description: entry.description,
      path,
      image: entry.image ?? DEFAULT_OG_IMAGE,
      type: entry.type ?? "website",
    }),
    links: canonicalLink(path),
    scripts,
  };
}
