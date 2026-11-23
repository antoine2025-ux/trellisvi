import { Link } from "@tanstack/react-router";
import { ledgerRows, loopStages, methodSteps } from "@/content/landing";
import { posts } from "@/content/blog";
import { DiagramBlock, LedgerTable, SectionHeader, Slab } from "./primitives";

const REQUEST_MAP = String.raw`┌──────────┐  request   ┌──────────┐   query   ┌───────────┐
│ Browser  │ ─────────> │  Server  │ ────────> │ Database  │
│ what you │ <───────── │ the rules│ <──────── │  what it  │
│  click   │  response  │          │   rows    │ remembers │
└──────────┘            └────┬─────┘           └───────────┘
                             │ secret key
                             v
                     ┌────────────────┐
                     │ External APIs  │
                     │ email, AI, pay │
                     └────────────────┘`;

export function MethodSection() {
  return (
    <Slab id="method" tone="ink" className="py-24 sm:py-32">
      <SectionHeader
        index="02"
        label="The method"
        onInk
        title="You decide. The AI builds. The repo proves it."
        lede="Trellis VI is a Technical Program Management method for directing AI coding agents. Six disciplines, run on every build, every week, until they are reflex."
      />

      <ol className="method-grid mt-14">
        {methodSteps.map((step, i) => (
          <li key={step.name} className="method-step">
            <span className="method-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="method-name">{step.name}</h3>
            <p className="method-line">{step.line}</p>
            <p className="method-rule">{step.rule}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <DiagramBlock
          label="Diagram · The map"
          caption="Every app you direct has the same parts. The agent writes the code inside each box. Your job is to know which arrow failed."
        >
          <pre
            className="diagram-ascii"
            aria-label="Browser sends requests to a server, which queries a database and calls external APIs with a secret key"
          >
            {REQUEST_MAP}
          </pre>
        </DiagramBlock>

        <div className="flex min-w-0 flex-col gap-6">
          <DiagramBlock
            label="Diagram · The phase loop"
            caption="Run once per phase. Never two phases in one session."
          >
            <ol className="loop-chips" aria-label="The phase loop">
              {loopStages.map((stage, i) => (
                <li key={stage} className="loop-chip">
                  <span className="loop-chip-num">{i + 1}</span>
                  {stage}
                </li>
              ))}
            </ol>
            <p className="loop-return" aria-hidden="true">
              ↺ next phase
            </p>
          </DiagramBlock>

          <div>
            <p className="method-ledger-title">When something breaks</p>
            <LedgerTable
              head={["What you see", "Arrow that failed", "Ask your agent"]}
              rows={ledgerRows}
            />
          </div>
        </div>
      </div>

      <div className="method-reading">
        <p className="eyebrow eyebrow--on-ink">Go deeper</p>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to="/blog/$slug" params={{ slug: post.slug }}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Slab>
  );
}
