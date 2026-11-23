import { Button } from "@/components/ui/button";
import { cohort } from "@/content/landing";
import { scrollToApply } from "./apply";
import { Eyebrow, Slab } from "./primitives";

function scrollToVideo() {
  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function FinalCta() {
  return (
    <Slab tone="ink" className="py-24 text-center sm:py-32">
      <Eyebrow onInk>
        {cohort.name} · {cohort.seats} seats · Applications close {cohort.closeLong}
      </Eyebrow>
      <h2 className="final-title mx-auto mt-6">
        You decide; the AI builds.
        <span>Everything in this course trains the deciding.</span>
      </h2>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          size="xl"
          className="h-14 rounded-full bg-[var(--brown-foreground)] px-9 text-base font-semibold text-ink hover:bg-white"
          onClick={scrollToApply}
        >
          Apply for {cohort.name}
        </Button>
        <button type="button" className="final-secondary" onClick={scrollToVideo}>
          Watch the 12-minute introduction first
        </button>
      </div>
    </Slab>
  );
}
