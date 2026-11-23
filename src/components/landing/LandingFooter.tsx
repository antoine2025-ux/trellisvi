import { Link } from "@tanstack/react-router";
import { openPrivacyPolicy } from "@/components/PrivacyPolicy";
import { openTerms } from "@/components/Terms";
import { instructor } from "@/content/landing";
import { LogoMark } from "./primitives";

export function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <div className="flex items-center gap-2.5 text-ink">
            <LogoMark className="size-8" />
            <span className="font-serif text-lg">Trellis VI</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            An application-only cohort teaching you to direct AI coding agents and ship production
            software.
          </p>
        </div>
        <nav aria-label="Learn">
          <p className="footer-heading">Learn</p>
          <ul className="footer-links">
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/resources">Free resources</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
            <li>
              <a href="https://platform.powerintel.co/login/">Course login</a>
            </li>
          </ul>
        </nav>
        <nav aria-label="Built with Trellis VI">
          <p className="footer-heading">Built with Trellis VI</p>
          <ul className="footer-links">
            {instructor.builtWith.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal">
          <p className="footer-heading">Contact</p>
          <ul className="footer-links">
            <li>
              <a href="mailto:trellis@powerintel.co">trellis@powerintel.co</a>
            </li>
            <li>
              <button type="button" onClick={openPrivacyPolicy}>
                Privacy
              </button>
            </li>
            <li>
              <button type="button" onClick={openTerms}>
                Terms
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted-foreground sm:px-8">
          {new Date().getFullYear()} PowerIntel, trading name of ACMPOWER OÜ · Lille tn 27-9,
          Tallinn, Estonia
        </p>
      </div>
    </footer>
  );
}
