import { Link } from "@tanstack/react-router";

const linkClass = "hover:text-foreground";
const activeClass = "text-foreground";

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 py-8">
      <Link to="/" className="font-serif text-lg tracking-tight">
        Trellis VI Studio
      </Link>
      <nav
        aria-label="Site"
        className="flex items-center gap-3 text-sm text-muted-foreground"
      >
        <Link to="/blog" className={linkClass} activeProps={{ className: activeClass }}>
          Blog
        </Link>
        <span aria-hidden="true">|</span>
        <Link to="/built" className={linkClass} activeProps={{ className: activeClass }}>
          Built with Trellis VI
        </Link>
      </nav>
    </header>
  );
}
