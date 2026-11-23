import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { GatedVideo, type VideoRevealReason } from "@/components/GatedVideo";
import instructorPhoto from "@/assets/instructor.jpg";
import { cohort, hero, heroStats } from "@/content/landing";
import { trackEvent } from "@/lib/track";
import { Eyebrow } from "./primitives";

const WATCHED_KEY = "trellis-intro-watched";

// Seconds into the video where the offer starts. null opens the apply panel only when the video ends.
const PITCH_AT_SECONDS: number | null = null;

type RevealReason = VideoRevealReason | "returning" | "manual";

export function Hero() {
  const [open, setOpen] = useState(false);
  const [focusForm, setFocusForm] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const reveal = useCallback((reason: RevealReason) => {
    if (reason === "pitch" || reason === "ended") {
      try {
        localStorage.setItem(WATCHED_KEY, "1");
      } catch {
        // The panel still opens for this visit.
      }
    }
    if (openRef.current) return;
    openRef.current = true;
    setFocusForm(reason !== "returning");
    setOpen(true);
    trackEvent("apply_reveal_shown", { reason });
    if (reason === "returning") return;
    window.setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 120);
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem(WATCHED_KEY)) reveal("returning");
    } catch {
      // Storage blocked: treat as a first visit.
    }
  }, [reveal]);

  return (
    <section id="hero" className="hero-section">
      <div className="mx-auto max-w-6xl px-5 pt-10 text-center sm:px-8 sm:pt-14">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="hero-title mx-auto mt-5">
          {hero.titleLead}
          <span className="hero-title-tail">{hero.titleTail}</span>
        </h1>
        <p className="hero-lede mx-auto mt-6">{hero.lede}</p>
      </div>

      <div className="mx-auto mt-9 max-w-5xl px-5 sm:mt-11 sm:px-8">
        <div className="vsl-frame">
          <GatedVideo onReveal={reveal} pitchAtSeconds={PITCH_AT_SECONDS} />
        </div>

        <div className="vsl-meta">
          <div className="flex items-center gap-3 text-left">
            <img
              src={instructorPhoto}
              alt=""
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-full object-cover object-top ring-2 ring-[var(--surface-raised)]"
            />
            <p className="text-sm leading-snug">
              <span className="font-semibold text-foreground">{hero.instructor}.</span>{" "}
              <span className="text-muted-foreground">{hero.instructorRole}</span>
            </p>
          </div>
          {open ? null : (
            <button type="button" className="vsl-skip" onClick={() => reveal("manual")}>
              Already watched? Apply now
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          ref={panelRef}
          className={`apply-reveal${open ? " is-open" : ""}`}
          aria-hidden={!open}
          inert={!open}
        >
          <div className="apply-reveal-inner">
            <div className="apply-reveal-card">
              <div className="apply-reveal-copy">
                <Eyebrow>Next step · {cohort.name}</Eyebrow>
                <h2 className="mt-4 font-serif text-[1.75rem] leading-[1.15] text-ink sm:text-[2.1rem]">
                  You've seen how it works. Now apply for a seat.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Two minutes, six short steps. If you look like a fit, you book your onboarding
                  call straight away.
                </p>
                <dl className="apply-facts mt-6">
                  <div>
                    <dt>Starts</dt>
                    <dd>{cohort.startLong}</dd>
                  </div>
                  <div>
                    <dt>Applications close</dt>
                    <dd>{cohort.closeLong}</dd>
                  </div>
                  <div>
                    <dt>Seats</dt>
                    <dd>{cohort.seats}, application only</dd>
                  </div>
                  <div>
                    <dt>Investment</dt>
                    <dd>{cohort.price}, payment plan on approval</dd>
                  </div>
                </dl>
              </div>
              <div className="apply-reveal-form">
                {open ? <ApplicationForm compact autoFocus={focusForm} /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <ul className="stat-strip">
          {heroStats.map(([value, label]) => (
            <li key={value}>
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
