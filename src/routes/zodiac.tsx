import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

import { DateField } from "@/components/DateField";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedContent } from "@/components/RelatedContent";
import { getReading, parseDateInput, formatLongDate, ZODIACS } from "@/lib/destiny";
import { routeHead } from "@/lib/seo-pages";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Chinese Zodiac Calculator", path: "/zodiac" },
];

export const Route = createFileRoute("/zodiac")({
  head: () => routeHead("/zodiac"),
  component: ZodiacPage,
});


function ZodiacPage() {
  const [dob, setDob] = useState("");
  const reading = useMemo(() => {
    const date = parseDateInput(dob);
    return date ? { ...getReading(date), date } : null;
  }, [dob]);

  return (
    <div className="px-6 py-20 md:py-28">
      <Breadcrumbs items={CRUMBS} />

      <PageHeader
        eyebrow="Chinese Zodiac / Shengxiao"
        title={
          <>
            Discover your <span className="text-primary">zodiac animal</span>
          </>
        }
        description="Your birth year reveals one of the twelve animals: the face you show the world and a map of your natural temperament."
      />

      <div className="mx-auto mt-12 flex max-w-xl flex-col gap-4 sm:flex-row">
        <DateField value={dob} onChange={setDob} />
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-primary px-8 py-5 font-medium text-primary-foreground"
        >
          <Sparkles className="size-4" /> Reveal
        </button>
      </div>

      {reading ? (
        <div className="animate-reveal mx-auto mt-20 max-w-5xl space-y-12">
          <div className="border border-border bg-white/[0.02] p-8 text-center md:p-12">
            <span className="label-mono text-[10px] text-accent">
              Born {formatLongDate(reading.date)}
            </span>

            <img
              src={reading.zodiac.image}
              alt={`${reading.zodiac.name} Chinese zodiac sign`}
              loading="lazy"
              className="mx-auto mt-6 h-56 w-56 rounded-3xl object-cover border-4 border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.4)]"
            />

            <h2 className="display-italic mt-4 text-6xl text-foreground">
             {reading.zodiac.name}
            </h2>
            <p className="mt-1 text-lg text-muted-foreground">
              {reading.zodiac.chinese} / {reading.zodiac.pinyin}
            </p>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              {reading.zodiac.personality}
            </p>
          </div>

          <div className="grid gap-px bg-border md:grid-cols-2">
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Personality Traits</h3>
              <div className="flex flex-wrap gap-2">
                {reading.zodiac.traits.map((t) => (
                  <span key={t} className="border border-border px-3 py-1.5 text-sm text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Best Matches</h3>
              <div className="flex flex-wrap gap-2">
                {reading.zodiac.bestMatches.map((m) => (
                  <span key={m} className="border border-accent/40 px-3 py-1.5 text-sm text-accent">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Strengths</h3>
              <ul className="space-y-3">
                {reading.zodiac.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-wood" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Weaknesses</h3>
              <ul className="space-y-3">
                {reading.zodiac.weaknesses.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fire" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

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
              <h3 className="label-mono mb-5 text-[11px] text-accent">Relationship Insights</h3>
              <p className="leading-relaxed text-muted-foreground">{reading.element.relationships}</p>
            </div>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-3">
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Lucky Colors</h3>
              <p className="text-foreground">{reading.zodiac.luckyColors.join(" / ")}</p>
            </div>
            <div className="bg-background p-8">
              <h3 className="label-mono mb-5 text-[11px] text-accent">Lucky Numbers</h3>
              <div className="flex flex-wrap gap-3">
                {reading.zodiac.luckyNumbers.map((n) => (
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
              <h3 className="label-mono mb-5 text-[11px] text-accent">Lucky Direction</h3>
              <p className="display-italic text-3xl text-foreground">
                {reading.element.luckyDirection}
              </p>
            </div>
          </div>

          <RelatedContent
            excludeTool="/zodiac"
            articleSlugs={[
              "what-is-my-chinese-zodiac",
              "chinese-zodiac-compatibility-guide",
              "chinese-zodiac-elements-explained",
            ]}
          />
        </div>
      ) : (

        <div className="mx-auto mt-24 max-w-7xl">
          <h2 className="display-italic mb-10 text-center text-3xl text-muted-foreground">
            The twelve animals
          </h2>
          <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4">
            {ZODIACS.map((z) => (
              <div key={z.key} className="bg-background p-6">
                <img src={z.image} alt={`${z.name} Chinese zodiac`} loading="lazy" className="size-14 object-contain" />
                <h3 className="display-italic mt-3 text-2xl text-foreground">{z.name}</h3>
                <p className="label-mono mt-1 text-[9px] text-muted-foreground">{z.years}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
