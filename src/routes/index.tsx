import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

import { DateField } from "@/components/DateField";
import { getReading, parseDateInput, ELEMENT_ORDER, ELEMENTS } from "@/lib/destiny";
import { ELEMENT_IMAGES, ELEMENT_TEXT_CLASS } from "@/lib/element-images";
import cosmicHero from "@/assets/cosmic-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chinese Five Elements Calculator | Wu Xing Destiny Analysis" },
      {
        name: "description",
        content:
          "Discover your Chinese Zodiac, Five Elements, lucky colors, compatibility, and daily fortune through personalized destiny analysis based on ancient Chinese wisdom.",
      },
      { property: "og:title", content: "Chinese Five Elements Calculator | Wu Xing Destiny Analysis" },
      {
        property: "og:description",
        content:
          "Discover your Chinese Zodiac, Five Elements, lucky colors, compatibility, and daily fortune through personalized destiny analysis based on ancient Chinese wisdom.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const FEATURES = [
  { to: "/five-elements", title: "Five Elements", desc: "Your Wu Xing profile, career and relationship traits." },
  { to: "/zodiac", title: "Zodiac Calculator", desc: "Animal sign, personality, strengths and weaknesses." },
  { to: "/compatibility", title: "Love Compatibility", desc: "Compare two birth dates for a harmony score." },
  { to: "/daily-fortune", title: "Daily Fortune", desc: "Love, career, wealth and health for today." },
] as const;

function Index() {
  const [dob, setDob] = useState("");
  const reading = useMemo(() => {
    const date = parseDateInput(dob);
    return date ? getReading(date) : null;
  }, [dob]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={cosmicHero}
          alt=""
          aria-hidden="true"
          width={1600}
          height={1200}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 md:pt-36">
          <div className="grid gap-16 lg:grid-cols-[1fr_400px]">
            <div className="animate-reveal">
              <span className="label-mono text-[11px] text-accent">Ancient Wisdom · Modern Clarity</span>
              <h1 className="display-italic mt-5 text-balance text-6xl leading-[0.95] text-foreground md:text-8xl">
                The blueprint of your <span className="text-primary">inner heavens</span>.
              </h1>
              <p className="mt-8 max-w-[45ch] text-pretty text-lg leading-relaxed text-muted-foreground">
                Discover your Chinese Zodiac, Five Elements, lucky colors, compatibility, and daily
                fortune through personalized destiny analysis based on ancient Chinese wisdom.
              </p>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <DateField value={dob} onChange={setDob} />
                <Link
                  to="/five-elements"
                  className="flex items-center justify-center gap-2 bg-primary px-10 py-5 font-medium text-primary-foreground transition-all hover:gap-3 hover:bg-primary/90"
                >
                  Calculate Map <ArrowRight className="size-4" />
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Free · No sign-up · Your data never leaves your browser.
              </p>
            </div>

            {/* Glimpse result card */}
            <div className="animate-reveal [animation-delay:200ms]">
              <div className="relative overflow-hidden border border-border bg-white/[0.02] p-8 backdrop-blur-sm">
                <div className="label-mono mb-6 flex items-center justify-between text-[10px] text-accent">
                  <span>{reading ? "Your Preview" : "Live Preview"}</span>
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                </div>
                <div className="space-y-6">
                  <div className="flex items-end justify-between border-b border-border pb-4">
                    <div>
                      <span className="label-mono text-[10px] text-muted-foreground">Sign</span>
                      <h3 className="display-italic text-3xl">
                        {reading ? `${reading.zodiac.name}` : "Your Sign"}
                      </h3>
                    </div>
                    <span className="display-italic text-5xl text-primary">
                      {reading ? reading.zodiac.pinyin : "—"}
                    </span>
                  </div>
                  <div className="flex items-end justify-between border-b border-border pb-4">
                    <div>
                      <span className="label-mono text-[10px] text-muted-foreground">Element</span>
                      <h3 className="display-italic text-3xl">
                        {reading ? `${reading.polarity} ${reading.element.name}` : "Your Element"}
                      </h3>
                    </div>
                    <div className="grid size-10 place-items-center rounded-full border border-accent/30">
                      <div className="size-2 rounded-full bg-accent" />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {reading
                      ? reading.element.personality.split(". ")[0] + "."
                      : "Enter your date of birth to reveal your zodiac animal, fixed element and a glimpse of your destiny."}
                  </p>
                  {reading && (
                    <Link
                      to="/five-elements"
                      className="label-mono inline-flex items-center gap-2 text-[10px] text-accent hover:gap-3"
                    >
                      Full reading <ArrowRight className="size-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Elements visualization */}
      <section className="border-t border-border bg-white/[0.01] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col items-baseline justify-between gap-4 md:flex-row">
            <h2 className="display-italic text-4xl text-accent">The Wu Xing Cycle</h2>
            <p className="label-mono text-[11px] text-muted-foreground">Five Phases of Energy</p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-5">
            {ELEMENT_ORDER.map((key, i) => {
              const el = ELEMENTS[key];
              return (
                <Link
                  key={key}
                  to="/five-elements"
                  className="group bg-background p-8 transition-colors hover:bg-white/[0.04]"
                >
                  <span className="label-mono text-[10px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} / {el.tagline.split(" · ")[0]}
                  </span>
                  <h3 className={`display-italic mt-4 text-2xl ${ELEMENT_TEXT_CLASS[key]}`}>
                    {el.name}
                  </h3>
                  <img
                    src={ELEMENT_IMAGES[key]}
                    alt={`${el.name} element ink wash`}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="my-8 aspect-square w-full object-cover opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <p className="text-xs leading-relaxed text-muted-foreground">{el.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature links */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="display-italic mb-12 text-4xl text-foreground">Explore your destiny</h2>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <Link
                key={f.to}
                to={f.to}
                className="group flex flex-col justify-between gap-10 bg-background p-8 transition-colors hover:bg-white/[0.04]"
              >
                <h3 className="display-italic text-2xl text-foreground">{f.title}</h3>
                <div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Feedback */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="display-italic mb-4 text-4xl text-foreground">🌟 Help Us Improve</h2>
          <p className="mb-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            We are constantly improving our astrology and compatibility tools.
            <br />
            Share your ideas, suggestions, or questions below.
          </p>
          <div className="w-full max-w-2xl overflow-hidden rounded-sm border border-border">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfIOejghk7e5e0STCslWQuIpb68WgrcFphJQZ7bLZdXZpD-gQ/viewform?embedded=true"
              width="640"
              height="1222"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Feedback Form"
              className="w-full"
              style={{ maxWidth: "640px", border: "none" }}
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>
    </>
  );
}
