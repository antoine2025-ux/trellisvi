import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cohort } from "@/content/landing";
import { scrollToApply } from "./apply";
import { LogoMark } from "./primitives";

const nav = [
  { href: "#method", label: "Method" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#proof", label: "Proof" },
  { href: "#faq", label: "FAQ" },
];

export function CohortBar() {
  return (
    <div className="cohort-bar">
      <p className="mx-auto max-w-6xl px-5 sm:px-8">
        <span className="cohort-bar-dot" aria-hidden="true" />
        <span className="font-semibold">{cohort.name} is open</span>
        <span className="cohort-bar-sep" aria-hidden="true">
          ·
        </span>
        <span>{cohort.seats} seats</span>
        <span className="cohort-bar-sep max-sm:hidden" aria-hidden="true">
          ·
        </span>
        <span className="max-sm:hidden">Starts {cohort.startShort}</span>
        <span className="cohort-bar-sep" aria-hidden="true">
          ·
        </span>
        <span>Applications close {cohort.closeShort}</span>
      </p>
    </div>
  );
}

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`landing-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-ink" aria-label="Trellis VI home">
          <LogoMark className="size-8" />
          <span className="font-serif text-lg tracking-tight">Trellis VI</span>
        </Link>
        <nav
          aria-label="Page"
          className="hidden items-center gap-7 text-[0.95rem] font-semibold md:flex"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-foreground/80 transition-colors hover:text-brown"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a
            href="https://platform.powerintel.co/login/"
            className="hidden text-[0.95rem] font-semibold text-foreground/80 transition-colors hover:text-brown sm:inline"
          >
            Course login
          </a>
          <Button
            size="sm"
            className="h-10 rounded-full px-5 text-sm font-semibold"
            onClick={scrollToApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </header>
  );
}
