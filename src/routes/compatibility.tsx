import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart } from "lucide-react";

import { DateField } from "@/components/DateField";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedContent } from "@/components/RelatedContent";
import { getCompatibility, parseDateInput } from "@/lib/destiny";
import { routeHead } from "@/lib/seo-pages";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Love Compatibility Calculator", path: "/compatibility" },
];

export const Route = createFileRoute("/compatibility")({
  head: () => routeHead("/compatibility"),
  component: CompatibilityPage,
});


function CompatibilityPage() {
  const [dobA, setDobA] = useState("");
  const [dobB, setDobB] = useState("");

  const result = useMemo(() => {
    const a = parseDateInput(dobA);
    const b = parseDateInput(dobB);
    return a && b ? getCompatibility(a, b) : null;
  }, [dobA, dobB]);

  return (
    <div className="px-6 py-20 md:py-28">
      <Breadcrumbs items={CRUMBS} />

      <PageHeader
        eyebrow="Love Compatibility · Hé Hūn"
        title={
          <>
            The architecture of <span className="text-primary">connection</span>
          </>
        }
        description="Enter two birth dates to measure elemental and zodiac harmony, with guidance for love, partnership and alliance."
      />

      <div className="mx-auto mt-12 max-w-2xl">
        <div className="grid gap-6 sm:grid-cols-2">
          <DateField id="dobA" label="First Birth Date" value={dobA} onChange={setDobA} />
          <DateField id="dobB" label="Second Birth Date" value={dobB} onChange={setDobB} />
        </div>
      </div>

      {result ? (
        <div className="animate-reveal mx-auto mt-20 max-w-4xl space-y-10">
          <div className="border border-border bg-white/[0.02] p-8 text-center md:p-12">
            <Heart className="mx-auto size-7 text-primary" />
            <div className="display-italic mt-6 text-7xl text-primary md:text-8xl">
              {result.score}%
            </div>
            <p className="label-mono mt-3 text-[11px] text-accent">{result.verdict}</p>
            <div className="mt-6 flex items-center justify-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <img src={result.zodiacA.image} alt={`${result.zodiacA.name} zodiac`} loading="lazy" className="size-8 object-contain" />
                {result.elementA.name} {result.zodiacA.name}
              </span>
              <span className="text-accent">×</span>
              <span className="flex items-center gap-2">
                <img src={result.zodiacB.image} alt={`${result.zodiacB.name} zodiac`} loading="lazy" className="size-8 object-contain" />
                {result.elementB.name} {result.zodiacB.name}
              </span>
            </div>
          </div>

          <div className="border border-border bg-background p-8">
            <h3 className="label-mono mb-5 text-[11px] text-accent">Relationship Summary</h3>
            <p className="leading-relaxed text-muted-foreground">{result.summary}</p>
          </div>

          <div className="border border-border bg-background p-8">
            <h3 className="label-mono mb-6 text-[11px] text-accent">Relationship Advice</h3>
            <ul className="space-y-4">
              {result.advice.map((a) => (
                <li key={a} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <RelatedContent
            excludeTool="/compatibility"
            articleSlugs={[
              "chinese-zodiac-compatibility-guide",
              "what-is-my-chinese-zodiac",
              "chinese-astrology-for-beginners",
            ]}
          />
        </div>

      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          Enter both birth dates to reveal your compatibility.
        </p>
      )}
    </div>
  );
}
