import { useEffect, useRef, useState } from "react";
import { WeekSketch } from "@/components/WeekSketches";
import { weeks, type CurriculumWeek } from "@/content/curriculum";

function WeekItem({ week }: { week: CurriculumWeek }) {
  const ref = useRef<HTMLLIElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li ref={ref} className={`weeks-item${shown ? " is-in" : ""}`}>
      <div className="weeks-marker" aria-hidden="true">
        <span className="weeks-node" />
      </div>
      <p className="weeks-num">{week.n}</p>
      <div className="weeks-copy">
        <div className="min-w-0">
          <h3 className="text-[1.625rem] font-bold leading-[1.12] sm:text-[33px] md:text-[45px]">
            {week.title}
          </h3>
          <p className="mt-4 max-w-[46rem] text-lg font-semibold leading-[1.6] text-foreground md:text-xl">
            The Shift: {week.shift}
          </p>
          <p className="mt-4 max-w-[46rem] font-serif text-xl italic leading-snug text-foreground md:text-2xl">
            Outcome: {week.outcome}
          </p>
          {week.business ? (
            <p className="mt-3 font-medium text-brown md:text-lg">
              Business Track: {week.business}
            </p>
          ) : null}
        </div>
        <WeekSketch n={week.n} />
      </div>
    </li>
  );
}

export function WeeksTimeline() {
  const ref = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`weeks-timeline mx-auto max-w-5xl px-6 py-20${playing ? " is-playing" : ""}`}
    >
      <h2 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">
        What you'll learn, in 8 weeks.
      </h2>
      <p className="mt-3 text-muted-foreground">Theory, practice and workshops</p>
      <div className="weeks-track mt-14">
        <div className="weeks-rail" aria-hidden="true" />
        <ol className="weeks-list">
          {weeks.map((week) => (
            <WeekItem key={week.n} week={week} />
          ))}
        </ol>
      </div>
    </section>
  );
}
