import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMeta, canonicalLink, breadcrumbJsonLd } from "@/lib/seo";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Terms of Service", path: "/terms" },
];

const SECTIONS = [
  {
    title: "Acceptance of terms",
    body: "By accessing or using SiShen, you agree to these Terms of Service. If you do not agree, please do not use the site.",
  },
  {
    title: "Nature of the service",
    body: "SiShen provides Chinese zodiac, Five Elements and compatibility readings for reflection and entertainment, drawing on traditional Chinese metaphysics. Our content is not professional, medical, legal or financial advice.",
  },
  {
    title: "Use of the site",
    body: "You agree to use the site lawfully and not to misuse, disrupt, or attempt to gain unauthorized access to it. The tools are provided free of charge for personal, non-commercial use.",
  },
  {
    title: "Intellectual property",
    body: "All content, design and text on SiShen are owned by us or our licensors and may not be reproduced without permission.",
  },
  {
    title: "Disclaimer of warranties",
    body: "The site is provided 'as is' without warranties of any kind. We do not guarantee that readings are accurate, complete, or suitable for any particular purpose. Trust your own judgment for important decisions.",
  },
  {
    title: "Limitation of liability",
    body: "To the fullest extent permitted by law, SiShen is not liable for any decisions made or actions taken based on the content provided.",
  },
  {
    title: "Changes to these terms",
    body: "We may revise these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.",
  },
];

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: pageMeta({
      title: "Terms of Service | SiShen",
      description:
        "The terms governing your use of SiShen's Chinese zodiac and Five Elements tools. Readings are offered for reflection and entertainment.",
      path: "/terms",
    }),
    links: canonicalLink("/terms"),
    scripts: [breadcrumbJsonLd(CRUMBS)],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="px-6 py-20 md:py-28">
      <Breadcrumbs items={CRUMBS} />
      <PageHeader
        eyebrow="The Fine Print"
        title={
          <>
            Terms of <span className="text-primary">Service</span>
          </>
        }
        description="Please read these terms carefully before using SiShen."
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
