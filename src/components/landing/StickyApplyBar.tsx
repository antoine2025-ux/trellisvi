import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cohort } from "@/content/landing";
import { APPLY_ID, scrollToApply } from "./apply";

export function StickyApplyBar() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [applyVisible, setApplyVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const apply = document.getElementById(APPLY_ID);
    if (!hero || !apply) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting);
        if (entry.target === apply) setApplyVisible(entry.isIntersecting);
      }
    });
    observer.observe(hero);
    observer.observe(apply);
    return () => observer.disconnect();
  }, []);

  const shown = !heroVisible && !applyVisible;

  return (
    <div className={`sticky-apply${shown ? " is-shown" : ""}`} aria-hidden={!shown} inert={!shown}>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[var(--brown-foreground)]">
          {cohort.name} · {cohort.seats} seats
        </p>
        <p className="truncate text-xs text-[var(--on-ink-muted)]">
          Applications close {cohort.closeShort}
        </p>
      </div>
      <Button
        size="sm"
        className="h-10 shrink-0 rounded-full bg-[var(--brown-foreground)] px-5 text-sm font-semibold text-ink hover:bg-white"
        onClick={scrollToApply}
      >
        Apply
      </Button>
    </div>
  );
}
