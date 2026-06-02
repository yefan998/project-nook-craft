import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/five-elements", label: "Elements" },
  { to: "/zodiac", label: "Zodiac" },
  { to: "/compatibility", label: "Compatibility" },
  { to: "/daily-fortune", label: "Daily Fortune" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="display-italic text-2xl tracking-tight text-accent">
          Sìshén
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="label-mono text-[11px] font-medium text-muted-foreground transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="label-mono text-xs text-muted-foreground transition-colors hover:text-accent"
                activeProps={{ className: "text-accent" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
