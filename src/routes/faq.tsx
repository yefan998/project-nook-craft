import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { routeHead } from "@/lib/seo-pages";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

const FAQS = [
  {
    q: "How is my Chinese zodiac sign calculated?",
    a: "Your zodiac animal is determined by your birth year within the twelve-year cycle. Because the Chinese year begins at the lunar New Year (late January or February), births in early January or February are assigned to the previous year automatically.",
  },
  {
    q: "What are the Five Elements (Wu Xing)?",
    a: "Wood, Fire, Earth, Metal and Water are the five phases of energy in Chinese metaphysics. Your dominant element is derived from your birth year and shapes your personality, career fit, relationships and lucky attributes.",
  },
  {
    q: "Is my birth date stored anywhere?",
    a: "No. Every calculation runs privately in your browser. We never store, transmit or share your birth date.",
  },
  {
    q: "How accurate are the compatibility results?",
    a: "Our compatibility blends zodiac trines and clashes with the generating and controlling cycles of the Five Elements. It is a thoughtful guide for reflection rather than a guarantee — relationships ultimately depend on the people in them.",
  },
  {
    q: "Are these readings for entertainment or guidance?",
    a: "Our readings draw on traditional Chinese metaphysics and are offered for reflection and entertainment. Trust your own judgment for important decisions.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account is required. All tools are free to use and available instantly.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => routeHead("/faq"),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="px-6 py-20 md:py-28">
      <Breadcrumbs items={CRUMBS} />
      <PageHeader
        eyebrow="Help &amp; Answers"
        title={
          <>
            Frequently asked <span className="text-primary">questions</span>
          </>
        }
        description="Everything you need to know about our Chinese astrology tools, accuracy and privacy."
      />

      <div className="mx-auto mt-16 max-w-3xl">
        <div className="grid gap-px bg-border">
          {FAQS.map((f) => (
            <div key={f.q} className="bg-background p-8">
              <h2 className="display-italic text-2xl text-foreground">{f.q}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-muted-foreground">
          Still have a question?{" "}
          <Link to="/contact" className="text-accent hover:underline">
            Contact us
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
