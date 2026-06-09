import { Link } from "@tanstack/react-router";

const FOOTER_LINKS = [
  { to: "/five-elements", label: "Five Elements" },
  { to: "/zodiac", label: "Zodiac" },
  { to: "/compatibility", label: "Compatibility" },
  { to: "/daily-fortune", label: "Daily Fortune" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;


export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="display-italic text-xl tracking-tight text-accent">
            Sìshén Destiny Systems
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="label-mono text-[10px] text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            Readings are offered for reflection and entertainment, drawing on
            traditional Chinese metaphysics. Trust your own judgment for important decisions.
          </p>
          <span className="label-mono text-[9px] text-muted-foreground">
            © {new Date().getFullYear()} Sìshén · Celestial Data
          </span>
        </div>
      </div>
    </footer>
  );
}
