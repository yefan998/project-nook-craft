import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Flame,
  HeartHandshake,
  Sun,
  Palette,
  Hash,
  Sparkles,
  Compass,
} from "lucide-react";

import { DateField } from "@/components/DateField";
import {
  getReading,
  getCompatibility,
  getDailyFortune,
  parseDateInput,
  ELEMENT_ORDER,
  ELEMENTS,
  ZODIACS,
  type ElementKey,
} from "@/lib/destiny";
import { ELEMENT_IMAGES } from "@/lib/element-images";
import mountainsCta from "@/assets/mountains-cta.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chinese Zodiac Calculator & Five Elements Analysis | SiShen" },
      {
        name: "description",
        content:
          "Discover your Chinese Zodiac sign, Five Elements profile, compatibility matches, and daily fortune insights.",
      },
      { property: "og:title", content: "Chinese Zodiac Calculator & Five Elements Analysis | SiShen" },
      {
        property: "og:description",
        content:
          "Discover your Chinese Zodiac sign, Five Elements profile, compatibility matches, and daily fortune insights.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

/* ---------------- Element meta (exact Five Elements palette) ---------------- */

const ELEMENT_META: Record<
  ElementKey,
  { color: string; direction: string; season: string }
> = {
  wood: { color: "#2E8B57", direction: "East", season: "Spring" },
  fire: { color: "#DC143C", direction: "South", season: "Summer" },
  earth: { color: "#B8860B", direction: "Center", season: "Late Summer" },
  metal: { color: "#C0C0C0", direction: "West", season: "Autumn" },
  water: { color: "#1E90FF", direction: "North", season: "Winter" },
};

const TOOLS = [
  {
    icon: Calculator,
    title: "Chinese Zodiac Calculator",
    desc: "Reveal your animal sign, personality and life path from your birth year.",
    cta: "Calculate",
    to: "/zodiac",
  },
  {
    icon: Flame,
    title: "Five Elements Calculator",
    desc: "Map your Wu Xing balance across Wood, Fire, Earth, Metal and Water.",
    cta: "Analyze",
    to: "/five-elements",
  },
  {
    icon: HeartHandshake,
    title: "Compatibility Calculator",
    desc: "Compare two birth dates for a harmony score and relationship insight.",
    cta: "Compare",
    to: "/compatibility",
  },
  {
    icon: Sun,
    title: "Daily Fortune",
    desc: "Your love, career, wealth and health energy reading for today.",
    cta: "View Fortune",
    to: "/daily-fortune",
  },
  {
    icon: Palette,
    title: "Lucky Color Generator",
    desc: "Discover the auspicious colors aligned with your destiny element.",
    cta: "Reveal Colors",
    to: "/daily-fortune",
  },
  {
    icon: Hash,
    title: "Lucky Number Generator",
    desc: "Find the numbers that resonate with your cosmic blueprint.",
    cta: "Reveal Numbers",
    to: "/daily-fortune",
  },
] as const;

/* ---------------- Reusable animation helpers ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

function Index() {
  return (
    <>
      <Hero />
      <FiveElementsSection />
      <ZodiacSection />
      <ToolsSection />
      <CompatibilitySection />
      <DailyFortuneSection />
      <FinalCta />
      <FeedbackSection />
    </>
  );
}

/* ====================== HERO ====================== */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Animated Five Elements background glyphs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {ELEMENT_ORDER.map((key, i) => {
          const meta = ELEMENT_META[key];
          const pos = [
            "left-[8%] top-[18%]",
            "right-[10%] top-[22%]",
            "left-[16%] bottom-[16%]",
            "right-[14%] bottom-[22%]",
            "left-[46%] top-[10%]",
          ][i];
          return (
            <motion.span
              key={key}
              className={`font-display absolute ${pos} select-none text-7xl md:text-9xl`}
              style={{ color: meta.color, textShadow: `0 0 40px ${meta.color}` }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.12, 0.3, 0.12],
                y: [0, -22, 0],
              }}
              transition={{
                duration: 8 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6,
              }}
            >
              {ELEMENTS[key].chinese}
            </motion.span>
          );
        })}
      </div>

      {/* Radial glow wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_hsl(42_60%_55%/0.12)_0%,_transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="label-mono text-[11px] text-accent"
        >
          Ancient Wisdom · Modern Clarity
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="display-italic mt-6 text-balance text-5xl leading-[1.02] text-foreground sm:text-6xl md:text-7xl"
        >
          Discover Your Chinese Zodiac &{" "}
          <span className="text-primary">Five Elements</span> Destiny
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-7 max-w-[52ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Explore Chinese Zodiac readings, Five Elements analysis,
          compatibility matching, and daily fortune guidance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/zodiac"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:gap-3 hover:bg-primary/90 sm:w-auto"
          >
            Discover My Zodiac
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/five-elements"
            className="glass flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-medium text-foreground transition-all hover:gap-3 hover:bg-white/10 sm:w-auto"
          >
            Find My Element
            <Sparkles className="size-4 text-accent" />
          </Link>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1">
          <span className="h-2 w-1 rounded-full bg-accent" />
        </div>
      </motion.div>
    </section>
  );
}

/* ====================== FIVE ELEMENTS ====================== */

function FiveElementsSection() {
  return (
    <section className="relative border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Wu Xing · 五行"
          title="The Five Elements"
          subtitle="Five living forces shape every destiny. Explore the energy that flows through you."
        />

        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {ELEMENT_ORDER.map((key, i) => {
            const el = ELEMENTS[key];
            const meta = ELEMENT_META[key];
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="group h-full"
                >
                  <Link
                    to="/five-elements"
                    className="glass relative flex h-full flex-col items-center overflow-hidden rounded-2xl p-6 text-center transition-shadow duration-300"
                    style={{ boxShadow: `0 0 0 1px ${meta.color}22` }}
                  >
                    <div
                      className="pointer-events-none absolute -inset-px opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                      style={{ background: meta.color }}
                    />
                    <div className="relative">
                      <img
                        src={ELEMENT_IMAGES[key]}
                        alt={`${el.name} element`}
                        loading="lazy"
                        width={120}
                        height={120}
                        className="mx-auto size-20 rounded-full object-cover ring-2 transition-all duration-500 group-hover:scale-110"
                        style={{ boxShadow: `0 0 24px ${meta.color}66` }}
                      />
                      <span
                        className="font-display mt-4 block text-4xl"
                        style={{ color: meta.color, textShadow: `0 0 18px ${meta.color}88` }}
                      >
                        {el.chinese}
                      </span>
                      <h3 className="display-italic mt-1 text-xl text-foreground">{el.name}</h3>
                      <p className="label-mono mt-2 text-[9px] text-muted-foreground">
                        {meta.direction} · {meta.season}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ====================== ZODIAC ====================== */

function ZodiacSection() {
  return (
    <section className="relative border-t border-border bg-white/[0.01] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="十二生肖"
          title="The Chinese Zodiac"
          subtitle="Twelve animal signs, each a unique archetype of character and fate."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {ZODIACS.map((z, i) => (
            <motion.div
              key={z.key}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              whileHover={{ scale: 1.08, rotateX: 8, rotateY: -8 }}
              style={{ transformPerspective: 800 }}
              className="group"
            >
              <Link
                to="/zodiac"
                className="glass relative flex aspect-[3/4] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl p-4 text-center transition-shadow duration-300 group-hover:shadow-[0_0_30px_-4px_hsl(42_60%_55%/0.5)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_hsl(42_60%_55%/0.16),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative text-5xl transition-transform duration-300 group-hover:scale-110">
                  {z.emoji}
                </span>
                <span className="font-display relative text-2xl text-accent">{z.chinese}</span>
                <h3 className="display-italic relative text-lg text-foreground">{z.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== TOOLS ====================== */

function ToolsSection() {
  return (
    <section className="relative border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Destiny Tools"
          title="Explore Your Cosmic Toolkit"
          subtitle="Six free tools to decode your character, compatibility and fortune."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  to={tool.to}
                  className="glass group flex h-full flex-col rounded-2xl p-7 transition-shadow duration-300 hover:shadow-[0_0_30px_-6px_hsl(12_76%_45%/0.4)]"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="display-italic mt-5 text-2xl text-foreground">{tool.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {tool.desc}
                  </p>
                  <span className="label-mono mt-5 inline-flex items-center gap-2 text-[10px] text-accent transition-all group-hover:gap-3">
                    {tool.cta} <ArrowRight className="size-3" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ====================== COMPATIBILITY ====================== */

function CompatibilitySection() {
  const [dobA, setDobA] = useState("");
  const [dobB, setDobB] = useState("");

  const result = useMemo(() => {
    const a = parseDateInput(dobA);
    const b = parseDateInput(dobB);
    return a && b ? getCompatibility(a, b) : null;
  }, [dobA, dobB]);

  const strengths = result
    ? Array.from(
        new Set([...result.zodiacA.strengths, ...result.zodiacB.strengths]),
      ).slice(0, 4)
    : [];
  const challenges = result
    ? Array.from(
        new Set([...result.zodiacA.weaknesses, ...result.zodiacB.weaknesses]),
      ).slice(0, 4)
    : [];

  return (
    <section className="relative border-t border-border bg-white/[0.01] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Love & Harmony"
          title="Compatibility Reading"
          subtitle="Enter two birth dates to reveal your relationship harmony."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[360px_1fr]">
          <div className="glass flex flex-col gap-6 rounded-2xl p-7">
            <DateField label="Your Birth Date" id="compat-a" value={dobA} onChange={setDobA} />
            <DateField label="Partner's Birth Date" id="compat-b" value={dobB} onChange={setDobB} />
            <p className="text-xs text-muted-foreground">
              Calculations stay in your browser. Nothing is stored.
            </p>
          </div>

          <div className="glass flex flex-col rounded-2xl p-7">
            {result ? (
              <motion.div
                key={result.score}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="label-mono text-[10px] text-accent">Harmony Score</span>
                    <h3 className="display-italic text-2xl text-foreground">{result.verdict}</h3>
                  </div>
                  <span className="font-display text-5xl text-primary">{result.score}</span>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {result.summary}
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <span className="label-mono text-[10px] text-wood">Strengths</span>
                    <ul className="mt-2 space-y-1.5">
                      {strengths.map((s) => (
                        <li key={s} className="text-sm text-foreground">
                          + {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="label-mono text-[10px] text-fire">Challenges</span>
                    <ul className="mt-2 space-y-1.5">
                      {challenges.map((c) => (
                        <li key={c} className="text-sm text-foreground">
                          − {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                <HeartHandshake className="size-10 text-accent/50" />
                <p className="mt-4 max-w-[28ch] text-sm text-muted-foreground">
                  Add both birth dates to reveal your compatibility score and relationship analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================== DAILY FORTUNE ====================== */

function DailyFortuneSection() {
  const [dob, setDob] = useState("");

  const data = useMemo(() => {
    const date = parseDateInput(dob);
    if (!date) return null;
    const reading = getReading(date);
    const fortune = getDailyFortune(date);
    const meta = ELEMENT_META[reading.element.key];
    return {
      reading,
      fortune,
      direction: meta.direction,
      luckyColor: reading.luckyColors[0],
      luckyNumber: reading.luckyNumbers[0],
    };
  }, [dob]);

  return (
    <section className="relative border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Today's Energy"
          title="Daily Fortune"
          subtitle="Your personalized guidance, lucky number, color and direction for today."
        />

        <div className="mx-auto mt-12 max-w-md">
          <div className="glass rounded-2xl p-6">
            <DateField label="Your Birth Date" id="fortune-dob" value={dob} onChange={setDob} />
          </div>
        </div>

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {data.fortune.map((f) => (
              <div key={f.key} className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-[10px] text-accent">{f.label}</span>
                  <span className="font-display text-3xl text-foreground">{f.score}</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${f.score}%` }}
                  />
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{f.note}</p>
              </div>
            ))}

            <div className="glass col-span-full grid gap-4 rounded-2xl p-6 sm:grid-cols-3">
              <LuckyStat icon={Hash} label="Lucky Number" value={String(data.luckyNumber)} />
              <LuckyStat icon={Palette} label="Lucky Color" value={data.luckyColor} />
              <LuckyStat icon={Compass} label="Lucky Direction" value={data.direction} />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function LuckyStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Hash;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
        <Icon className="size-5" />
      </div>
      <div>
        <span className="label-mono block text-[9px] text-muted-foreground">{label}</span>
        <span className="display-italic text-lg text-foreground">{value}</span>
      </div>
    </div>
  );
}

/* ====================== FINAL CTA ====================== */

function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <img
        src={mountainsCta}
        alt="Ancient Chinese mountains shrouded in golden mist"
        loading="lazy"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      <div className="relative mx-auto max-w-3xl px-6 py-32 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="display-italic text-balance text-4xl text-foreground md:text-6xl"
        >
          Begin Your Journey Into Chinese Astrology
        </motion.h2>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10"
        >
          <Link
            to="/five-elements"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-5 text-lg font-medium text-primary-foreground shadow-xl shadow-primary/40 transition-all hover:gap-3 hover:bg-primary/90"
          >
            Start Free Reading
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ====================== FEEDBACK ====================== */

function FeedbackSection() {
  return (
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
  );
}

/* ====================== Shared heading ====================== */

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <span className="label-mono text-[11px] text-accent">{eyebrow}</span>
      <h2 className="display-italic mt-4 text-balance text-4xl text-foreground md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-[48ch] text-pretty text-base leading-relaxed text-muted-foreground">
        {subtitle}
      </p>
    </motion.div>
  );
}
