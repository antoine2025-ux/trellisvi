import { Link } from "@tanstack/react-router";

export function CursorCollapseArticle() {
  return (
    <article className="blog-article">
      <p className="blog-kicker">Context engineering</p>
      <h1>Why your Cursor codebase collapses after 2,000 lines</h1>
      <p className="blog-lede">
        For a week it feels like magic. Then the model invents a helper you deleted on Tuesday.
        Most people blame the model. The model is fine. The memory is not.
      </p>

      <p>
        Everything works for the first week. Cursor writes the auth flow, wires the database, and
        fixes its own bugs when you paste the stack trace back in. Then, somewhere past two
        thousand lines, the character changes.
      </p>
      <p>
        It starts inventing a helper that was deleted on Tuesday. It reimplements a util that
        already lives three directories away. It confidently edits a file that forty other modules
        import, and nothing in the conversation tells it that was a big deal.
      </p>
      <p>
        Most people read this as the model getting dumber. It is not. What degraded is the thing
        you have been using as its memory: one very long chat thread.
      </p>

      <h2>What the research actually says</h2>
      <p>
        Three findings. All reproducible. All pointing the same way.
      </p>

      <ol className="blog-findings">
        <li>
          <span className="blog-finding-num">01</span>
          <div>
            <h3>Position matters more than capacity</h3>
            <p>
              Stanford&apos;s <em>Lost in the Middle</em> paper tested how models use long inputs.
              Accuracy is highest when the relevant information sits at the start or the end of
              the context, and drops in the middle. Your architectural decision from message 12 is
              now buried in a sixty-message thread. That is the worst possible place for it.
            </p>
          </div>
        </li>
        <li>
          <span className="blog-finding-num">02</span>
          <div>
            <h3>Degradation starts long before the window fills</h3>
            <p>
              Chroma&apos;s 2025 <em>Context Rot</em> report evaluated eighteen frontier models,
              including Claude 4, GPT-4.1 and Gemini 2.5, on deliberately simple retrieval and
              text-replication tasks. Every model got less reliable as input length grew, even on
              work a small model can do perfectly at short length. A 200K window is not 200K of
              usable attention. &ldquo;Cursor context window full&rdquo; is not the warning sign.
              The trouble starts well before that message appears.
            </p>
          </div>
        </li>
        <li>
          <span className="blog-finding-num">03</span>
          <div>
            <h3>The drop is steep, and it is early</h3>
            <p>
              Adobe&apos;s NoLiMa benchmark removed the easy word-for-word overlap between the
              question and the buried fact, so models had to connect them by meaning. Of twelve
              models that advertise 128K support, ten fell below half their short-context accuracy
              at just 32K tokens. GPT-4o went from 99.3% at short context to 69.7%. Reasoning
              about a codebase is exactly this kind of task. You ask about &ldquo;the checkout
              race condition&rdquo; and the relevant fact is a sentence about idempotency keys,
              written forty messages ago, in different words.
            </p>
          </div>
        </li>
      </ol>

      <blockquote>
        <p>Put the three together and long threads are guaranteed to fail. Not likely. Guaranteed. The only variable is when.</p>
      </blockquote>

      <h2>Why the thread makes it worse than it needs to be</h2>
      <p>
        A chat log is the least efficient format the project state could possibly be stored in.
      </p>
      <p>
        It is chronological rather than structured, so the schema you settled on is scattered
        across six messages instead of sitting in one place. It is mostly noise: abandoned
        approaches, fixed bugs, and dead-end debugging sit in context with the same weight as the
        decisions that stuck. And it is full of contradictions, because the version of the file
        from message 9 is still sitting there next to the version from message 40, with nothing
        marking which one is current.
      </p>
      <p>
        Then compaction kicks in. The thread gets summarized to fit, and the summary keeps the
        shape of the conversation while quietly dropping the specifics. That is the moment Claude
        starts hallucinating code that looks plausible and references things that no longer exist.
        It is not making things up out of nowhere. It is filling gaps left by a lossy summary of
        your own project.
      </p>

      <h2>The fix: stop storing the project in the conversation</h2>
      <p>
        Take the project state out of the thread and put it in the repository, where it belongs.
        Create a <code>/context/</code> directory at the root of the repo:
      </p>

      <pre className="blog-tree">{`repo-root/
├── context/
│   ├── PROJECT_CONTEXT.md    # what this is, where it stands, who owns what
│   ├── ARCHITECTURE.md       # components, data flows, integration points
│   ├── STABLE_SEAMS.md       # the files where mistakes propagate widely
│   ├── RULES.md              # non-negotiables the AI must not override
│   └── TECH_DEBT.md          # known debt, with IDs and severity
└── docs/
    └── sessions/             # one summary per working session`}</pre>

      <p>
        Connect your Claude project to the repo with the GitHub connector, point it at your
        integration branch, and set <code>/context/</code> to load into every session.{" "}
        <code>/docs/</code> stays searchable but does not bulk-load.
      </p>
      <p>Four things change immediately.</p>
      <ul>
        <li>
          The AI starts every session with a current, compact, structured description of the
          system, instead of rebuilding a fuzzy one from chat scrollback.
        </li>
        <li>
          Context lives at the front of the window, where attention is strongest, rather than
          buried in the middle.
        </li>
        <li>
          Updating context becomes a commit rather than a re-upload, so there is no second copy
          to drift out of sync.
        </li>
        <li>
          Because the files live on a branch, changes to them go through pull request review the
          same way code does. If it is not merged, the AI does not see it. That is a quality gate
          you get for free from where the files sit.
        </li>
      </ul>
      <p>
        Total context: a few thousand tokens, curated, current. Compare that with a 90,000-token
        thread where the useful signal is maybe two percent.
      </p>

      <h2>The give-away: a starting RULES.md</h2>
      <p>
        <code>RULES.md</code> is the highest-leverage file in the directory, because it is the
        one the model treats as overriding its own defaults. Here is a working starting point.
        Copy it, then cut every line you would not actually enforce on a colleague&apos;s pull
        request.
      </p>

      <pre className="blog-rules">{`# RULES.md

These rules override your defaults. If a request conflicts with a rule,
say so and stop. Do not silently comply.

## 1. Before writing code
- Search /context/ before answering questions about this codebase.
- Never guess at file contents. If you have not seen the file this
  session, ask for it or read it.
- If the change touches a file listed in STABLE_SEAMS.md, stop and say
  so before writing anything.

## 2. Scope
- Change only what the task requires. No opportunistic refactors,
  renames or reformatting in an unrelated diff.
- One concern per commit. If the task grows a second concern, say so
  and propose splitting it.
- Do not add a dependency without asking. Name the dependency, the
  reason, and one alternative.

## 3. Code standards
- Language: <TypeScript strict, Python 3.12 + type hints, etc.>
- Error handling: <no bare excepts, no swallowed promises, etc.>
- Every new module gets tests. Bug fixes get a regression test that
  fails before the fix.
- No new environment variables without adding them to .env.example.

## 4. Honesty
- If you are unsure whether something exists in this codebase, say
  "I have not verified this" rather than producing plausible code.
- Do not fabricate function names, endpoints or config keys. Cite the
  file path you got them from.
- If a rule here is blocking something genuinely necessary, argue with
  it explicitly. Do not route around it.

## 5. Session end
- Summarise what changed, what was decided, and what is still open.
- Write the summary to docs/sessions/YYYY-MM-DD_<topic>.md and commit.`}</pre>

      <p>
        The honesty section is the one people skip, and the one that stops most of the
        hallucinated code. A model with no explicit permission to say &ldquo;I do not know&rdquo;
        will produce something plausible instead, because plausible is its default output.
      </p>

      <h2>Checking whether it worked</h2>
      <p>Open a fresh chat in the configured project and ask three questions.</p>
      <ol className="blog-exam">
        <li>
          <strong>What does this project do, and what are its major components?</strong> Expect
          real component names and file paths.
        </li>
        <li>
          <strong>Propose something that violates a rule you wrote.</strong> See whether it
          pushes back and cites the rule.
        </li>
        <li>
          <strong>Ask to modify a file listed as a stable seam.</strong> See whether it names it
          as a seam before touching it.
        </li>
      </ol>
      <p>
        Generic answers on any of the three mean the connector is not syncing, is pointed at the
        wrong branch, or is scoped to the wrong path. Fix that before you write another line of
        code. Until it passes, you are still running on chat memory.
      </p>

      <div className="blog-close">
        <p>
          The <code>/context/</code> directory is one component of Trellis VI, a methodology for
          AI-assisted development on codebases that have to survive past the prototype. The full
          method covers seam discipline, decision logs, session handoff, and the enforcement
          gates that keep the whole thing from decaying after week three.
        </p>
        <p>
          <Link to="/">Learn the framework in eight weeks</Link>
          {" · "}
          <Link to="/blog/$slug" params={{ slug: "stable-seams-strategy" }}>
            The stable seams strategy
          </Link>
          {" · "}
          <a href="https://www.powerintel.co/products/trellis" target="_blank" rel="noopener noreferrer">
            More on Trellis VI
          </a>
        </p>
      </div>
    </article>
  );
}
