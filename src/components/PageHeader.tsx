import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}

/** Shared page header with mono eyebrow + display serif title. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="animate-reveal mx-auto max-w-3xl text-center">
      <span className="label-mono text-[11px] text-accent">{eyebrow}</span>
      <h1 className="display-italic mt-5 text-balance text-5xl leading-[1] text-foreground md:text-7xl">
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-6 max-w-[55ch] text-pretty text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
