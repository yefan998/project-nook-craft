import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { routeHead } from "@/lib/seo-pages";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
];

const SECTIONS = [
  {
    title: "Your data stays with you",
    body: "SiShen performs all destiny calculations directly in your browser. Your birth date is never sent to our servers, stored, or shared with third parties.",
  },
  {
    title: "Information we collect",
    body: "We do not require an account and do not collect personal information to use our tools. We may collect anonymous, aggregated analytics (such as page views) to understand how the site is used and improve it.",
  },
  {
    title: "Cookies and analytics",
    body: "We may use privacy-respecting analytics and essential cookies to keep the site working smoothly. These do not identify you personally.",
  },
  {
    title: "Third-party services",
    body: "Embedded content (such as a feedback form) may be provided by third parties with their own privacy policies. We encourage you to review them where relevant.",
  },
  {
    title: "Children's privacy",
    body: "Our services are intended for a general audience and are not directed at children under 13.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this policy from time to time. Material changes will be reflected on this page with an updated date.",
  },
];

export const Route = createFileRoute("/privacy")({
  head: () => routeHead("/privacy"),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="px-6 py-20 md:py-28">
      <Breadcrumbs items={CRUMBS} />
      <PageHeader
        eyebrow="Your Privacy"
        title={
          <>
            Privacy <span className="text-primary">Policy</span>
          </>
        }
        description="We built SiShen to be private by design. Here is exactly how we handle your information."
      />

      <div className="mx-auto mt-16 max-w-3xl space-y-px bg-border">
        {SECTIONS.map((s) => (
          <div key={s.title} className="bg-background p-8">
            <h2 className="display-italic text-2xl text-foreground">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
