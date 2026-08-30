import { useEffect, useRef, useState, type CSSProperties } from "react";

const VIBE = "Vibecoding";

export function HeroKicker() {
  const stageRef = useRef<HTMLSpanElement>(null);
  const vibeRef = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const vibe = vibeRef.current;
    if (!stage || !vibe) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const pct = Math.min(88, (vibe.offsetWidth / Math.max(stage.offsetWidth, 1)) * 100);
      stage.style.setProperty("--vibe-end", `${pct}%`);
    };

    let timeout = 0;
    const ready = document.fonts?.ready ?? Promise.resolve();
    void ready.then(() => {
      measure();
      if (reduced.matches) return;
      timeout = window.setTimeout(() => setPlaying(true), 800);
    });

    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <p
      className={`hero-kicker${playing ? " is-playing" : ""}`}
      aria-label="AI Assisted Systems Development Course"
    >
      <span className="hero-kicker-stage" ref={stageRef}>
        <span className="hero-kicker-vibe" ref={vibeRef} aria-hidden="true">
          {VIBE.split("").map((letter, i) => (
            <span
              key={`${letter}-${i}`}
              className="kicker-vibe-letter"
              style={{ "--i": i } as CSSProperties}
            >
              {letter}
            </span>
          ))}
        </span>
        <span className="hero-kicker-course" aria-hidden="true">
          AI Assisted Systems Development Course
        </span>
        <span className="hero-kicker-actor" aria-hidden="true">
          <svg viewBox="0 0 48 78" className="hero-kicker-svg">
            <g
              className="kicker-figure"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M24 7.2 C 32.2 7.6 37.4 13.4 36.8 21.2 C 36.2 29 29.6 34.4 21.8 33.6 C 13.8 32.8 9.6 26.2 10.2 18.4 C 10.8 10.6 16.8 6.8 24 7.2" />
              <path className="kicker-brow-l" d="M13.6 13.2 L 22.2 18.4" />
              <path className="kicker-brow-r" d="M34.4 13.2 L 25.8 18.4" />
              <path className="kicker-eyes-calm" d="M18.2 19.8 L 18.2 22.6" />
              <path className="kicker-eyes-calm" d="M29.8 19.8 L 29.8 22.6" />
              <path className="kicker-eyes-mad" d="M15.8 17.6 L 21.8 22.8" />
              <path className="kicker-eyes-mad" d="M32.2 17.6 L 26.2 22.8" />
              <path className="kicker-frown" d="M16.2 30.4 Q 24 20.6 31.8 30.4" />
              <path className="kicker-smile" d="M16.2 25.4 Q 24 35.8 31.8 25.4" />
              <path d="M23.6 33.8 Q 23.2 46 24.2 52" />
              <g className="kicker-arm-tool">
                <path d="M23.4 38 Q 14 28 11 16" />
                <path
                  className="kicker-eraser"
                  d="M4.2 9.4 L 16.6 8.2 Q 18.4 8 18.6 10.2 L 17.2 18.8 Q 16.8 20.6 14.8 20.8 L 2.8 18.6 Q 1.2 18.2 1.4 16.2 Z"
                />
                <g className="kicker-pen">
                  <path d="M14.8 16.4 L 5.2 8.6" />
                  <path d="M3.6 7.4 L 6.8 8.2" />
                </g>
                <g className="kicker-crumbs">
                  <path className="kicker-crumb kicker-crumb-1" d="M8 6.5 L 9.2 5.2" />
                  <path className="kicker-crumb kicker-crumb-2" d="M18.5 7 L 20.4 5.4" />
                  <path className="kicker-crumb kicker-crumb-3" d="M6 20 L 4.4 22.2" />
                  <path className="kicker-crumb kicker-crumb-4" d="M16 21.5 L 18.2 23.6" />
                </g>
              </g>
              <path className="kicker-arm-swing" d="M24.6 39 Q 33 46 35.4 56" />
              <path className="kicker-leg-l" d="M24.2 52 Q 17.6 63 15 74" />
              <path className="kicker-leg-r" d="M24.2 52 Q 31.4 63.4 34 74" />
            </g>
          </svg>
        </span>
      </span>
    </p>
  );
}
