interface ScoreMeterProps {
  label: string;
  score: number;
  note?: string;
}

export function ScoreMeter({ label, score, note }: ScoreMeterProps) {
  return (
    <div className="border border-border bg-white/[0.02] p-6">
      <div className="mb-4 flex items-end justify-between">
        <span className="label-mono text-[10px] text-accent">{label}</span>
        <span className="font-display text-3xl text-foreground">{score}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>
      {note && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{note}</p>}
    </div>
  );
}
