import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

const rows = [
  {
    label: "You start with",
    vibe: "An idea and a chat window",
    trellis: "A data model and a system you've drawn on paper",
  },
  {
    label: "You work by",
    vibe: "Asking, reading, asking again",
    trellis: "Directing a build across sessions, with structure that holds context",
  },
  {
    label: "When it breaks",
    vibe: "You paste the error back in and hope",
    trellis: "You read the logs, find the cause, and tell the model what to fix",
  },
  {
    label: "You ship",
    vibe: "Something that works, built on assumptions you didn't make",
    trellis: "A system built the way you decided it should be",
  },
  {
    label: "It costs you",
    vibe: "An afternoon",
    trellis: "Eight weeks, fifteen hours a week",
  },
  {
    label: "You end up with",
    vibe: "A prototype",
    trellis: "A system in production, a priced offer, and clients to send it to",
  },
];

function NapkinSketch({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const filterId = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 72 56" className="comparison-sketch" role="img" aria-label={label}>
      <defs>
        <filter id={filterId} x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.15" />
        </filter>
      </defs>
      <g
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.78"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${filterId})`}
      >
        {children}
      </g>
    </svg>
  );
}

function ChatSketch() {
  return (
    <NapkinSketch label="A chat bubble">
      <path d="M10 8 L60 6 Q65 7 65 13 L66 32 Q66 38 60 38 L30 38 L22 50 L26 38 L12 37 Q7 36 8 30 L9 13 Q9 8 14 8 Z" />
      <path d="M18 17 L48 16" />
      <path d="M18 25 L54 24" />
    </NapkinSketch>
  );
}

function BlueprintSketch() {
  return (
    <NapkinSketch label="A system sketched on paper">
      <path d="M13 5 L59 7 L57 51 L11 49 Z" />
      <path d="M22 16 L50 15 L51 26 L21 27 Z" />
      <path d="M27 32 L45 31 L46 40 L26 41 Z" />
      <path d="M36 27 L36 32" />
    </NapkinSketch>
  );
}

export function ComparisonSection() {
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
      { threshold: 0.22 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`comparison-section mx-auto max-w-5xl px-6 py-20${playing ? " is-playing" : ""}`}
    >
      <h2 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">
        Vibecoding vs Trellis VI
      </h2>
      <p className="mt-3 text-muted-foreground">Same tools. A different way through the wall.</p>

      <div className="comparison-ledger mt-12">
        <div className="comparison-heads" aria-hidden="true">
          <div className="comparison-head is-vibe">
            <ChatSketch />
            <p>Vibecoding course</p>
          </div>
          <div className="comparison-head is-trellis">
            <BlueprintSketch />
            <p>Trellis VI</p>
          </div>
        </div>

        <div className="comparison-rows">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className="comparison-row"
              style={{ "--row-i": i } as CSSProperties}
            >
              <p className="comparison-axis">
                <span className="comparison-axis-chip">
                  <span className="comparison-num">{String(i + 1).padStart(2, "0")}</span>
                  {row.label}
                </span>
              </p>
              <div className="comparison-pair">
                <p className="comparison-vibe">
                  <span className="comparison-mobile-label">Vibecoding course</span>
                  {row.vibe}
                </p>
                <p className="comparison-trellis">
                  <span className="comparison-mobile-label">Trellis VI</span>
                  {row.trellis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
