import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import type { Crumb } from "@/lib/seo";

interface BreadcrumbsProps {
  items: Crumb[];
}

/**
 * Visual breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted
 * separately via breadcrumbJsonLd() in each route's head().
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto mb-10 max-w-5xl">
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="label-mono text-muted-foreground">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    to={item.path}
                    className="label-mono text-accent transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="size-3 text-muted-foreground" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
