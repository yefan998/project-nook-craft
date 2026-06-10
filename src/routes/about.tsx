import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMeta, canonicalLink, breadcrumbJsonLd } from "@/lib/seo";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta({
      title: "About — Ancient Wisdom, Modern Clarity | SiShen",
      description:
        "SiShen translates traditional Chinese metaphysics — the Five Elements and the zodiac — into clear, modern destiny analysis for self-understanding.",
      path: "/about",
    }),
    links: canonicalLink("/about"),
    scripts: [breadcrumbJsonLd(CRUMBS)],
  }),
  component: AboutPage,
});


const PRINCIPLES = [
  {
    title: "Rooted in tradition",
    desc: "Our readings draw on Wu Xing and the Chinese zodiac — systems refined over millennia of observation.",
  },
  {
    title: "Translated for today",
    desc: "We render ancient ideas in plain English, free of jargon, so the wisdom is genuinely usable.",
  },
  {
    title: "Private by design",
    desc: "Every calculation runs in your browser. We never store or transmit your birth date.",
  },
  {
    title: "For reflection, not fear",
    desc: "Destiny analysis is a mirror, not a verdict. Use it to understand yourself, then choose freely.",
  },
];

function AboutPage() {
  return (
    <div className="px-6 py-20 md:py-28">
      <Breadcrumbs items={CRUMBS} />

      <PageHeader
        eyebrow="Our Philosophy"
        title={
          <>
            Ancient wisdom, <span className="text-primary">modern clarity</span>
          </>
        }
        description="SiShen exists to make traditional Chinese metaphysics approachable — a calm, considered lens for understanding your nature."
      />

      <div className="animate-reveal mx-auto mt-16 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          For thousands of years, Chinese thinkers mapped human character through the Five Elements
          — Wood, Fire, Earth, Metal and Water — and the twelve animals of the zodiac. These were
          never about fixed fate; they were a grammar for understanding how energy moves through a
          life.
        </p>
        <p>
          We built SiShen to carry that grammar forward. By reading your birth date through these
          ancient cycles, we offer a portrait of your strengths, your blind spots, the careers that
          suit you, and the connections that nourish you.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="bg-background p-8">
              <h3 className="display-italic text-2xl text-foreground">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-4xl border border-border bg-white/[0.02] p-10 text-center">
        <h2 className="display-italic text-3xl text-foreground">Begin your reading</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Discover your element, zodiac and daily fortune in moments.
        </p>
        <Link
          to="/five-elements"
          className="mt-6 inline-block bg-primary px-8 py-4 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Calculate your map
        </Link>
      </div>
    </div>
  );
}
