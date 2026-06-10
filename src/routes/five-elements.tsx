import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

import { DateField } from "@/components/DateField";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedContent } from "@/components/RelatedContent";
import {
  getReading,
  parseDateInput,
  formatLongDate,
  ELEMENT_ORDER,
  ELEMENTS,
} from "@/lib/destiny";
import { ELEMENT_IMAGES, ELEMENT_TEXT_CLASS, ELEMENT_BORDER_CLASS } from "@/lib/element-images";
import { pageMeta, canonicalLink, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Five Elements Calculator", path: "/five-elements" },
];

export const Route = createFileRoute("/five-elements")({
  head: () => ({
    meta: pageMeta({
      title: "Five Elements Calculator (Wu Xing) | Sìshén",
      description:
        "Calculate your Chinese Five Elements (Wu Xing) profile from your birth date — element type, personality analysis, strengths, weaknesses, career suggestions, relationship insights and lucky colors, numbers and directions.",
      path: "/five-elements",
    }),
    links: canonicalLink("/five-elements"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Five Elements Calculator",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
      webPageJsonLd({
        name: "Five Elements Calculator (Wu Xing) | Sìshén",
        description:
          "Calculate your Chinese Five Elements (Wu Xing) profile from your birth date — element type, personality, strengths, weaknesses, career and lucky attributes.",
        path: "/five-elements",
      }),
      breadcrumbJsonLd(CRUMBS),
    ],
  }),
  component: FiveElementsPage,
});


function FiveElementsPage() {
  const [dob, setDob] = useState("");
  const reading = useMemo(() => {
    const date = parseDateInput(dob);
    return date ? { ...getReading(date), date } : null;
  }, [dob]);

  return (
    <div className="px-6 py-20 md:py-28">
      <Breadcrumbs items={CRUMBS} />

      <PageHeader
        eyebrow="The Five Elements · Wu Xing"
        title={
          <>
            Find your <span className="text-primary">elemental</span> nature
          </>
        }
        description="Enter your birth date to discover your fixed element and a full reading of your personality, career path and relationship traits."
      />

      <div className="mx-auto mt-12 flex max-w-xl flex-col gap-4 sm:flex-row">
        <DateField value={dob} onChange={setDob} />
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-primary px-8 py-5 font-medium text-primary-foreground"
          onClick={() => {}}
        >
          <Sparkles className="size-4" /> Reveal
        </button>
      </div>

      {reading ? (
        <div className="animate-reveal mx-auto mt-20 max-w-5xl space-y-12">
          {/* Hero result */}
          <div className={`overflow-hidden border ${ELEMENT_BORDER_CLASS[reading.element.key]}`}>
            <div className="grid md:grid-cols-[280px_1fr]">
              <img
                src={ELEMENT_IMAGES[reading.element.key]}
                alt={`${reading.element.name} element`}
                width={512}
                height={512}
                className="h-full w-full object-cover"
              />
              <div className="p-8 md:p-10">
                <span className="label-mono text-[10px] text-accent">
                  Born {formatLongDate(reading.date)}
                </span>
                <h2 className="display-italic mt-3 text-5xl text-foreground">
                  {reading.polarity}{" "}
                  <span className={ELEMENT_TEXT_CLASS[reading.element.key]}>
                    {reading.element.name}
                  </span>
                </h2>
                <p className="mt-1 text-lg text-muted-foreground">
                  {reading.element.chinese} · {reading.element.pinyin} · {reading.element.tagline}
                </p>
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  {reading.element.personality}
                </p>
              </div>
            </div>
          </div>

          {/* Detail grid */}
          <div className="grid gap-px bg-border md:grid-cols-2">
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Career Suggestions</h3>
              <ul className="space-y-3">
                {reading.element.career.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Relationship Traits</h3>
              <p className="leading-relaxed text-muted-foreground">{reading.element.relationships}</p>
            </div>
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {reading.element.strengths.map((s) => (
                  <span
                    key={s}
                    className="border border-border px-3 py-1.5 text-sm text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Challenges</h3>
              <div className="flex flex-wrap gap-2">
                {reading.element.challenges.map((c) => (
                  <span
                    key={c}
                    className="border border-border px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Lucky + zodiac */}
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Lucky Direction</h3>
              <p className="display-italic text-3xl text-foreground">
                {reading.element.luckyDirection}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Favour this direction for desks, beds and important decisions.
              </p>
            </div>
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Lucky Colors</h3>
              <ul className="space-y-2">
                {reading.luckyColors.map((c) => (
                  <li key={c} className="text-foreground">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Lucky Numbers</h3>
              <div className="flex flex-wrap gap-3">
                {reading.luckyNumbers.map((n) => (
                  <span
                    key={n}
                    className="grid size-11 place-items-center rounded-full border border-accent/40 font-display text-xl text-accent"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Zodiac Sign</h3>
              <p className="display-italic text-3xl text-foreground">
                {reading.zodiac.emoji} {reading.zodiac.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reading.zodiac.personality}
              </p>
            </div>
          </div>

          <RelatedContent
            excludeTool="/five-elements"
            articleSlugs={[
              "five-elements-personality-traits",
              "chinese-zodiac-elements-explained",
              "lucky-colors-by-element",
            ]}
          />
        </div>
      ) : (
        <ElementReference />
      )}
    </div>

  );
}

function ElementReference() {
  return (
    <div className="mx-auto mt-24 max-w-7xl">
      <h2 className="display-italic mb-10 text-center text-3xl text-muted-foreground">
        The five phases at a glance
      </h2>
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
        {ELEMENT_ORDER.map((key) => {
          const el = ELEMENTS[key];
          return (
            <div key={key} className="bg-background p-6">
              <h3 className={`display-italic text-2xl ${ELEMENT_TEXT_CLASS[key]}`}>{el.name}</h3>
              <p className="label-mono mt-1 text-[9px] text-muted-foreground">{el.pinyin}</p>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {el.tagline}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
