import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMeta, canonicalLink, breadcrumbJsonLd } from "@/lib/seo";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta({
      title: "Contact Us | SiShen",
      description:
        "Get in touch with the SiShen team. Questions, feedback or suggestions about our Chinese zodiac and Five Elements tools — we'd love to hear from you.",
      path: "/contact",
    }),
    links: canonicalLink("/contact"),
    scripts: [breadcrumbJsonLd(CRUMBS)],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="px-6 py-20 md:py-28">
      <Breadcrumbs items={CRUMBS} />
      <PageHeader
        eyebrow="Get in Touch"
        title={
          <>
            We'd love to <span className="text-primary">hear from you</span>
          </>
        }
        description="Whether you have a question, a suggestion, or simply want to share your reading, our team reads every message."
      />

      <div className="mx-auto mt-16 max-w-2xl space-y-6">
        <div className="border border-border bg-background p-8">
          <h2 className="label-mono mb-3 text-[11px] text-accent">Email</h2>
          <a
            href="mailto:hello@sishen.app"
            className="text-lg text-foreground transition-colors hover:text-accent"
          >
            hello@sishen.app
          </a>
          <p className="mt-2 text-sm text-muted-foreground">
            We typically respond within two business days.
          </p>
        </div>

        <div className="border border-border bg-background p-8">
          <h2 className="label-mono mb-3 text-[11px] text-accent">Feedback &amp; Ideas</h2>
          <p className="leading-relaxed text-muted-foreground">
            We are constantly improving our astrology and compatibility tools. Share your ideas,
            suggestions or questions using the feedback form on our homepage — your input shapes
            what we build next.
          </p>
        </div>

        <div className="border border-border bg-background p-8">
          <h2 className="label-mono mb-3 text-[11px] text-accent">Privacy</h2>
          <p className="leading-relaxed text-muted-foreground">
            All destiny calculations run privately in your browser. We never store or transmit your
            birth date. Read more in our{" "}
            <a href="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
