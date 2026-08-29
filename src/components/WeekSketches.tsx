import { useId, type ReactNode } from "react";

function Sketch({
  label,
  children,
  labels,
}: {
  label: string;
  children: ReactNode;
  labels?: ReactNode;
}) {
  const filterId = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 180 148" className="week-sketch" role="img" aria-label={label}>
      <defs>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.15" />
        </filter>
      </defs>
      <g
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.72"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${filterId})`}
      >
        {children}
      </g>
      {labels ? <g className="week-sketch-labels">{labels}</g> : null}
    </svg>
  );
}

function Week01() {
  return (
    <Sketch
      label="A napkin sketch of front-end, API, back-end, and database connected together"
      labels={
        <>
          <text className="week-sketch-label" x="90" y="24">
            Front-end
          </text>
          <text className="week-sketch-label" x="90" y="63">
            API
          </text>
          <text className="week-sketch-label" x="90" y="102">
            Back-end
          </text>
          <text className="week-sketch-label" x="90" y="134">
            Database
          </text>
        </>
      }
    >
      <path d="M48 8 L132 6 L135 32 L46 35 Z" />
      <path d="M62 48 L118 46 L120 70 L60 73 Z" />
      <path d="M48 86 L132 84 L134 110 L46 113 Z" />
      <path d="M66 122 Q 90 118 114 122 Q 118 130 114 138 Q 90 143 66 138 Q 62 130 66 122" />
      <path className="week-sketch-flow" d="M90 35 L90 46" />
      <path className="week-sketch-flow" d="M90 73 L90 84" />
      <path className="week-sketch-flow" d="M90 113 L90 122" />
    </Sketch>
  );
}

function Week02() {
  return (
    <Sketch
      label="A laptop sending a project out to a public URL"
      labels={
        <>
          <text className="week-sketch-label" x="70" y="64">
            Local
          </text>
          <text className="week-sketch-label" x="143" y="86">
            URL
          </text>
        </>
      }
    >
      <path d="M28 38 L108 34 L112 88 L30 91 Z" />
      <path d="M40 46 L98 43 L100 74 L41 76 Z" />
      <path d="M22 92 L118 88 L124 102 L18 105 Z" />
      <path className="week-sketch-flow" d="M112 62 Q 132 58 142 70" />
      <path d="M132 66 L154 62 L158 92 L128 95 Z" />
      <path d="M138 74 L150 73" />
    </Sketch>
  );
}

function Week03() {
  return (
    <Sketch
      label="A tangled prompt becoming a straight, focused line"
      labels={
        <>
          <text className="week-sketch-label" x="52" y="34">
            Drift
          </text>
          <text className="week-sketch-label" x="144" y="34">
            Focus
          </text>
        </>
      }
    >
      <path d="M22 78 Q 34 40 48 72 Q 60 108 74 64 Q 86 28 98 80" />
      <path className="week-sketch-flow" d="M102 76 L158 76" />
      <path d="M148 68 L160 76 L148 84" />
      <path d="M36 28 C 48 18 68 22 70 38 C 58 34 42 40 36 28" />
      <path d="M128 28 C 140 18 160 24 158 40 C 146 34 130 42 128 28" />
    </Sketch>
  );
}

function Week04() {
  return (
    <Sketch
      label="Records dropping into a working database"
      labels={
        <text className="week-sketch-label" x="90" y="108">
          Database
        </text>
      }
    >
      <path d="M48 78 Q 90 68 132 78 L132 118 Q 90 132 48 118 Z" />
      <path d="M48 78 Q 90 88 132 78" />
      <path d="M48 98 Q 90 108 132 98" />
      <circle className="week-sketch-dot" cx="72" cy="28" r="5" />
      <circle className="week-sketch-dot week-sketch-dot-2" cx="90" cy="18" r="5" />
      <circle className="week-sketch-dot week-sketch-dot-3" cx="110" cy="30" r="5" />
      <path className="week-sketch-flow" d="M72 36 L72 78" />
      <path className="week-sketch-flow" d="M90 26 L90 80" />
      <path className="week-sketch-flow" d="M110 38 L110 78" />
    </Sketch>
  );
}

function Week05() {
  return (
    <Sketch
      label="App plumbing connected to hosting and a database in the cloud"
      labels={
        <>
          <text className="week-sketch-label" x="54" y="108">
            Host
          </text>
          <text className="week-sketch-label" x="128" y="108">
            Data
          </text>
          <text className="week-sketch-label" x="96" y="44">
            Cloud
          </text>
        </>
      }
    >
      <path d="M28 86 L78 82 L82 122 L26 125 Z" />
      <path d="M102 86 L154 83 L156 122 L100 124 Z" />
      <path d="M58 38 Q 74 18 96 22 Q 118 10 136 28 Q 154 34 148 52 Q 132 64 90 58 Q 62 62 58 38" />
      <path className="week-sketch-flow" d="M54 82 Q 54 70 72 56" />
      <path className="week-sketch-flow" d="M126 83 Q 126 70 112 56" />
    </Sketch>
  );
}

function Week06() {
  return (
    <Sketch
      label="A cracked box being inspected and repaired"
      labels={
        <>
          <rect className="week-sketch-label-bg" x="58" y="12" width="38" height="18" rx="3" />
          <text className="week-sketch-label" x="77" y="26">
            Bug
          </text>
        </>
      }
    >
      <path d="M38 48 L118 44 L124 112 L36 116 Z" />
      <path d="M90 64 L82 84 L98 98 L84 116" />
      <path d="M108 58 Q 142 48 156 70 Q 160 92 138 104" />
      <path d="M132 86 Q 148 80 158 96" />
      <path className="week-sketch-flow" d="M126 78 L148 92" />
    </Sketch>
  );
}

function Week07() {
  return (
    <Sketch
      label="Blocks stacking into a finished working system"
      labels={
        <text className="week-sketch-label" x="90" y="28">
          Sprint
        </text>
      }
    >
      <path d="M36 108 L76 104 L78 132 L34 134 Z" />
      <path className="week-sketch-block" d="M70 76 L110 72 L114 102 L68 106 Z" />
      <path className="week-sketch-block-2" d="M102 46 L142 42 L146 74 L100 78 Z" />
      <path d="M28 136 L156 132" />
      <path className="week-sketch-flow" d="M56 104 L88 90" />
      <path className="week-sketch-flow" d="M92 72 L122 58" />
    </Sketch>
  );
}

function Week08() {
  return (
    <Sketch
      label="A finished project framed as a portfolio piece"
      labels={
        <>
          <rect className="week-sketch-label-bg" x="58" y="2" width="44" height="20" rx="3" />
          <text className="week-sketch-label" x="80" y="16">
            Live
          </text>
          <text className="week-sketch-label" x="90" y="136">
            Pitch
          </text>
        </>
      }
    >
      <path d="M32 42 L128 38 L134 108 L30 111 Z" />
      <path d="M44 54 L116 51 L118 90 L42 92 Z" />
      <path d="M54 66 L72 82 L84 72 L104 88" />
      <path d="M70 122 L110 120 L118 140 L64 142 Z" />
      <path className="week-sketch-flow" d="M80 111 L86 122" />
    </Sketch>
  );
}

const sketches = {
  "01": Week01,
  "02": Week02,
  "03": Week03,
  "04": Week04,
  "05": Week05,
  "06": Week06,
  "07": Week07,
  "08": Week08,
} as const;

export function WeekSketch({ n }: { n: string }) {
  const SketchForWeek = sketches[n as keyof typeof sketches];
  if (!SketchForWeek) return null;
  return (
    <div className="week-sketch-wrap">
      <SketchForWeek />
    </div>
  );
}
