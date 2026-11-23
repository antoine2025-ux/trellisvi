import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tracks } from "@/content/landing";
import { scrollToApply } from "./apply";
import { SectionHeader, Slab } from "./primitives";

export function TracksSection() {
  return (
    <Slab id="tracks" tone="paper" className="py-24 sm:py-32">
      <SectionHeader
        index="04"
        label="Two ways to use it"
        title="One method. Two ways to get paid for it."
        lede="The loop is identical whether the software runs inside your company or for a client. You choose where to point it. You tell us which in the application."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {tracks.map((track) => (
          <article key={track.id} className={`track-card track-card--${track.id}`}>
            <p className="eyebrow">{track.eyebrow}</p>
            <h3 className="track-title">{track.title}</h3>
            <p className="track-lede">{track.lede}</p>
            <ul className="track-points">
              {track.points.map((point) => (
                <li key={point}>
                  <Check className="track-check" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="track-fit">{track.fit}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl font-serif text-xl italic leading-snug text-ink">
          Either way, you leave with two deployed builds and a repo you can defend line by line.
        </p>
        <Button
          size="lg"
          className="h-12 rounded-full px-7 text-base font-semibold"
          onClick={scrollToApply}
        >
          Apply for a seat
        </Button>
      </div>
    </Slab>
  );
}
