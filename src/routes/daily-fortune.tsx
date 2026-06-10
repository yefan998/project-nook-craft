import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DateField } from "@/components/DateField";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedContent } from "@/components/RelatedContent";
import { ScoreMeter } from "@/components/ScoreMeter";
import { getDailyFortune, getReading, parseDateInput, formatLongDate } from "@/lib/destiny";
import { pageMeta, canonicalLink, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Daily Fortune", path: "/daily-fortune" },
];

export const Route = createFileRoute("/daily-fortune")({
  head: () => ({
    meta: pageMeta({
      title: "Daily Fortune Reading | Sìshén",
      description:
        "Your daily Chinese fortune for love, career, wealth and health — a personalized forecast based on your birth date and today's energy, with lucky colors, numbers and directions.",
      path: "/daily-fortune",
    }),
    links: canonicalLink("/daily-fortune"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Daily Fortune Reading",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
      webPageJsonLd({
        name: "Daily Fortune Reading | Sìshén",
        description:
          "Your daily Chinese fortune for love, career, wealth and health — a personalized forecast with lucky colors, numbers and directions.",
        path: "/daily-fortune",
      }),
      breadcrumbJsonLd(CRUMBS),
    ],
  }),
  component: DailyFortunePage,
});


function DailyFortunePage() {
  const [dob, setDob] = useState("");
  const today = useMemo(() => new Date(), []);

  const data = useMemo(() => {
    const date = parseDateInput(dob);
    if (!date) return null;
    return { fortune: getDailyFortune(date, today), reading: getReading(date) };
  }, [dob, today]);

  return (
    <div className="px-6 py-20 md:py-28">
      <Breadcrumbs items={CRUMBS} />

      <PageHeader
        eyebrow={`Daily Alignment · ${formatLongDate(today)}`}
        title={
          <>
            Your fortune for <span className="text-primary">today</span>
          </>
        }
        description="Align your actions with the cosmic tide. Enter your birth date for today's love, career, wealth and health forecast."
      />

      <div className="mx-auto mt-12 max-w-xl">
        <DateField value={dob} onChange={setDob} />
      </div>

      {data ? (
        <div className="animate-reveal mx-auto mt-16 max-w-4xl space-y-8">
          <p className="text-center text-muted-foreground">
            Reading for a{" "}
            <span className="text-accent">
              {data.reading.polarity} {data.reading.element.name} {data.reading.zodiac.name}
            </span>
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {data.fortune.map((f) => (
              <ScoreMeter key={f.key} label={f.label} score={f.score} note={f.note} />
            ))}
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-3">
            <div className="bg-background p-6">
              <h3 className="label-mono mb-3 text-[11px] text-accent">Lucky Colors Today</h3>
              <p className="text-foreground">{data.reading.luckyColors.slice(0, 3).join(" · ")}</p>
            </div>
            <div className="bg-background p-6">
              <h3 className="label-mono mb-3 text-[11px] text-accent">Lucky Numbers Today</h3>
              <div className="flex flex-wrap gap-3">
                {data.reading.luckyNumbers.slice(0, 4).map((n) => (
                  <span
                    key={n}
                    className="grid size-10 place-items-center rounded-full border border-accent/40 font-display text-lg text-accent"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-background p-6">
              <h3 className="label-mono mb-3 text-[11px] text-accent">Lucky Direction Today</h3>
              <p className="display-italic text-2xl text-foreground">
                {data.reading.element.luckyDirection}
              </p>
            </div>
          </div>

          <RelatedContent
            excludeTool="/daily-fortune"
            articleSlugs={[
              "lucky-colors-by-element",
              "chinese-astrology-for-beginners",
              "five-elements-personality-traits",
            ]}
          />
        </div>

      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          Enter your birth date to reveal today's forecast.
        </p>
      )}
    </div>
  );
}
