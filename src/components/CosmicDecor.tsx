/**
 * Purely decorative, fixed background layer.
 * Renders behind all page content (pointer-events-none, aria-hidden).
 * Adds: dark navy gradients, Yin-Yang watermark, Bagua corners,
 * Five Elements glyphs, mystical glow and floating particles.
 * No functionality, no layout impact.
 */

const ELEMENTS = ["木", "火", "土", "金", "水"] as const;

/** Eight Trigrams (Bagua) rendered as three-line glyphs. */
function BaguaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="60" cy="60" r="56" opacity="0.5" />
      <circle cx="60" cy="60" r="40" opacity="0.3" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = 60 + Math.cos(angle) * 48;
        const cy = 60 + Math.sin(angle) * 48;
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        const px = -dy;
        const py = dx;
        // three horizontal-ish strokes forming a trigram
        return (
          <g key={i}>
            {[-8, 0, 8].map((off, j) => {
              const broken = (i + j) % 2 === 0;
              const bx = cx + dx * off;
              const by = cy + dy * off;
              const half = 9;
              if (broken) {
                return (
                  <g key={j}>
                    <line
                      x1={bx + px * half}
                      y1={by + py * half}
                      x2={bx + px * 2}
                      y2={by + py * 2}
                    />
                    <line
                      x1={bx - px * 2}
                      y1={by - py * 2}
                      x2={bx - px * half}
                      y2={by - py * half}
                    />
                  </g>
                );
              }
              return (
                <line
                  key={j}
                  x1={bx + px * half}
                  y1={by + py * half}
                  x2={bx - px * half}
                  y2={by - py * half}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/** Classic Yin-Yang (Taiji) symbol. */
function YinYangMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <clipPath id="taiji-clip">
          <circle cx="100" cy="100" r="98" />
        </clipPath>
      </defs>
      <g clipPath="url(#taiji-clip)" fill="currentColor">
        <circle cx="100" cy="100" r="98" opacity="0.18" />
        <path d="M100 2a98 98 0 0 1 0 196 49 49 0 0 1 0-98 49 49 0 0 0 0-98z" opacity="0.5" />
        <circle cx="100" cy="51" r="14" opacity="0.18" />
        <circle cx="100" cy="149" r="14" opacity="0.85" />
      </g>
      <circle
        cx="100"
        cy="100"
        r="97"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
    </svg>
  );
}

export function CosmicDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Dark black + deep navy gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_120%_at_50%_-10%,_hsl(225_55%_12%/0.85)_0%,_hsl(258_40%_8%/0.5)_38%,_hsl(260_30%_4%)_78%)]" />

      {/* Soft mystical glow blooms (gold + navy) */}
      <div className="absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_hsl(42_60%_55%/0.10)_0%,_transparent_65%)] blur-2xl decor-glow" />
      <div className="absolute bottom-[-10rem] left-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,_hsl(220_70%_45%/0.12)_0%,_transparent_70%)] blur-3xl decor-glow [animation-delay:1.5s]" />
      <div className="absolute right-[-10rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_hsl(12_70%_50%/0.07)_0%,_transparent_70%)] blur-3xl decor-glow [animation-delay:3s]" />

      {/* Yin-Yang watermark, very low opacity, slow spin */}
      <YinYangMark className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 text-accent/[0.05] decor-spin md:h-[55rem] md:w-[55rem]" />

      {/* Bagua decorative corners (gold) — responsive, never clipped */}
      <BaguaMark className="absolute left-3 top-3 h-20 w-20 text-accent/10 sm:h-24 sm:w-24 md:left-5 md:top-5 md:h-28 md:w-28 lg:h-36 lg:w-36" />
      <BaguaMark className="absolute bottom-3 right-3 h-20 w-20 text-accent/10 sm:h-24 sm:w-24 md:bottom-5 md:right-5 md:h-28 md:w-28 lg:h-36 lg:w-36" />

      {/* Five Elements glyphs scattered subtly */}
      <div className="font-display absolute inset-0">
        {ELEMENTS.map((g, i) => {
          const pos = [
            "left-[6%] top-[22%]",
            "right-[9%] top-[16%]",
            "left-[14%] bottom-[18%]",
            "right-[12%] bottom-[26%]",
            "left-[48%] top-[8%]",
          ][i];
          return (
            <span
              key={g}
              className={`absolute ${pos} select-none text-6xl text-foreground/[0.035] md:text-8xl decor-float`}
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              {g}
            </span>
          );
        })}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => {
          const left = (i * 53) % 100;
          const top = (i * 37 + 7) % 100;
          const size = (i % 3) + 1;
          const dur = 9 + (i % 6) * 2.5;
          return (
            <span
              key={i}
              className="decor-particle absolute rounded-full bg-accent/40"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${dur}s`,
                animationDelay: `${(i % 5) * 1.3}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
