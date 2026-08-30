import { useEffect, useId, useRef, useState } from "react";

const bricks = Array.from({ length: 42 }, (_, i) => {
  const row = Math.floor(i / 3);
  const col = i % 3;
  const stagger = row % 2 === 0 ? 0 : 17;
  const j = ((row * 7 + col * 13) % 5) - 2;
  const x = 252 + stagger + col * 54;
  const y = -36 + row * 27;
  return `M${x + j * 0.45},${y + 0.4} L${x + 50 - j * 0.35},${y - 0.5} L${x + 51 + j * 0.2},${y + 23.4} L${x - 0.7},${y + 24.6} Z`;
});

export function WallSection() {
  const ref = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const filterId = useId().replace(/:/g, "");

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
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`wall-scene mx-auto max-w-5xl px-6 py-20${playing ? " is-playing" : ""}`}
    >
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] md:gap-12">
        <div className="max-md:order-2">
          <h2 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">
            The Wall of Vibecoding
          </h2>
          <div className="mt-8 max-w-[60ch] space-y-5 text-lg font-semibold leading-[1.7] text-foreground">
            <p>
              Tools like Claude, Cursor, and Lovable are extraordinary. Anyone can prompt their way
              to a shiny, single-page demo in an afternoon. But the magic stops at 80%.
            </p>
            <p>
              When you try to add a database, integrate complex APIs, or scale past a few files, you
              hit the wall. The AI loses context, overwrites working logic, and hallucinates fixes
              that break two other features.
            </p>
            <ul className="space-y-4">
              {[
                "You can't prompt your way through a data model you've never designed.",
                "You can't fix a deployment failure in server logs you don't know how to read.",
                "You can't protect high-blast-radius files without defining and enforcing stable architectural seams.",
              ].map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[0.85rem_1fr] gap-3"
                >
                  <span
                    className="mt-[0.85em] h-1.5 w-1.5 rounded-full bg-brown"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-md:order-1 max-md:mx-auto max-md:w-full max-md:max-w-sm max-md:max-h-[280px]">
          <svg
            viewBox="0 0 420 340"
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full max-md:max-h-[280px]"
            role="img"
            aria-label="A smiling stick figure walking into a brick wall, then sitting dazed with birds circling"
          >
            <defs>
              <filter id={filterId} x="-8%" y="-8%" width="116%" height="116%">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="1.15" />
              </filter>
            </defs>
            <g
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.7"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#${filterId})`}
            >
              <path d="M38 312 Q 160 307 248 311 Q 330 314 418 309" />
              {bricks.map((d) => (
                <path key={d} d={d} />
              ))}
              <path d="M250,-40 Q 246 140 249 312" />
              <g className="wall-actor">
                <g className="wall-figure">
                  <path d="M200 116 C 212 117 220 125 219 137 C 219 150 209 158 196 157 C 183 156 176 147 177 134 C 177 121 187 115 200 116" />
                  <path d="M190 131 L 190 134" />
                  <path d="M206 131 L 206 134" />
                  <path className="wall-smile" d="M187 142 Q 198 154 210 142" />
                  <path className="wall-frown" d="M186 153 Q 198 137 211 153" />
                  <path d="M197 158 Q 192 196 198 236" />
                  <g className="wall-arm-kit">
                    <path d="M196 176 Q 174 190 166 208" />
                    <path d="M156 212 Q 154 200 165 198 Q 178 199 176 213" />
                    <path d="M150 212 L 180 211 L 182 238 L 148 239 Z" />
                    <path d="M150 220 Q 165 218 181 221" />
                    <path d="M163 218 L 163 226 Q 167 228 163 230" />
                    <path d="M172 212 Q 176 204 180 198" />
                    <path d="M178 197 Q 184 196 183 202" />
                  </g>
                  <path className="wall-arm-swing" d="M198 180 Q 214 198 222 220" />
                  <path className="wall-leg-l" d="M198 236 Q 186 272 178 308" />
                  <path className="wall-leg-r" d="M198 236 Q 214 274 220 310" />
                </g>
              </g>
              <g className="wall-impact">
                <path d="M232 118 Q 240 112 246 118" />
                <path d="M234 128 Q 244 126 248 132" />
                <path d="M230 138 Q 238 142 244 138" />
              </g>
              <g className="wall-birds" transform="translate(102 186)">
                <g className="wall-birds-spin">
                  {[0, 120, 240].map((angle) => (
                    <g key={angle} transform={`rotate(${angle}) translate(0 -28)`}>
                      <path d="M-11 3 Q -5 -9 0 2" />
                      <path d="M0 2 Q 5 -9 11 3" />
                    </g>
                  ))}
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-14">
        <div className="h-[3px] w-10 bg-brown" aria-hidden="true" />
        <p className="mt-6 font-serif text-[28px] italic leading-snug text-foreground md:text-[36px]">
          Giving someone a commercial kitchen doesn't make them a head chef.
          <span className="mt-3 block pl-10 md:pl-16">
            AI power tools didn't turn everyone into a systems architect. They just
            made bad building faster.
          </span>
        </p>
      </div>
    </section>
  );
}
