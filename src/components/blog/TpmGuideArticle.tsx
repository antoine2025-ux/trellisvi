import { Link } from "@tanstack/react-router";

export function TpmGuideArticle() {
  return (
    <article className="blog-article">
      <p className="blog-kicker">Directing the build</p>
      <h1>Stop prompting for features</h1>
      <p className="blog-lede">
        &ldquo;Build me a dashboard that shows user activity.&rdquo; The model builds one. Three
        weeks later you are rewriting all of it.
      </p>

      <p>
        It invents a schema, because you did not give it one. It picks a charting library,
        because you did not name one. It writes an aggregation query that will be fine at ten
        thousand rows and will time out at two million. Everything runs. You accept the diff.
      </p>
      <p>
        The rewrite is harder than the original build, because now there is code depending on
        the invented schema.
      </p>
      <p>
        This is what prompting for features produces. The alternative is not writing more code
        yourself. It is changing what you hand the model.
      </p>
      <p>
        If words like &ldquo;charting library&rdquo; or &ldquo;aggregation&rdquo; still feel like
        a foreign language, you are in the right place. You do not need to write the
        implementation. You need to direct it.
      </p>
      <p>
        AI collapsed a stack of specialist roles into one person with a capable model. Frontend,
        backend, data, architecture: Claude and Cursor can now cover work that used to need a
        team. What they cannot cover is the orchestration of that work. Agile became the default
        for managing human engineering teams. AI-assisted development is still early, and it
        does not yet have an equivalent. This article is a playbook for the missing job:
        technical program management, with the model as the engineering team.
      </p>

      <h2>The research says specification is the variable</h2>
      <p>
        The evidence on AI coding productivity looks contradictory until you sort it by task
        definition.
      </p>
      <p>
        METR ran a randomized controlled trial in 2025 with 16 experienced open-source
        developers working 246 real tasks in repositories they averaged five years on.
        Developers forecast a 24% speedup. Measured result: they took 19% longer with AI tools.
        After finishing, they still believed AI had made them about 20% faster. METR now treats
        this as a historical snapshot of early-2025 tooling, and their follow-up experiment
        produced a signal they judged too unreliable to publish as a headline number.
      </p>
      <p>
        Now the other direction. A controlled trial of GitHub Copilot on developers recruited
        through Upwork, all building the same self-contained HTTP server in JavaScript, found
        treated participants finished about 56% faster. A separate enterprise RCT found
        developers using AI were roughly 21% faster, controlling for other factors.
      </p>
      <p>
        Same category of tool, opposite outcomes. The variable that moved is the task. Bounded,
        self-contained, one right answer, no hidden dependencies: large gains. High-context work
        inside a mature codebase where the requirements live in someone&apos;s head: losses that
        even senior developers failed to notice happening.
      </p>
      <p>
        You cannot make your codebase simpler. You can make the task look more like the first
        kind and less like the second. That work has a name and a job title attached to it.
      </p>

      <h2>What the TPM job actually is</h2>
      <p>
        A technical program manager does not write the code and does not decide the product.
        Often they cannot write a line of code. That was my case.
      </p>
      <p>
        The job is everything between: work out what is really being asked, map what it touches,
        surface the dependencies before they bite, define interfaces between the parts, sequence
        the work so nothing blocks on something unstarted, and state what done means before
        anyone begins.
      </p>
      <p>
        Every one of those functions is missing when you prompt a model for a feature. You
        skipped straight to implementation with none of the inputs implementation needs, then
        blamed the implementer.
      </p>
      <p>So run the TPM playbook, with the model as your engineering team.</p>

      <h2>Step 1: the understanding pass</h2>
      <p>
        Before any code, an hour of structured conversation. No artifacts yet, no drafting. You
        are building the shared model that everything downstream depends on.
      </p>
      <p>Six things to establish:</p>
      <ul>
        <li>What the product is and what problem it solves</li>
        <li>Where it stands right now: pre-launch, in production, post-revenue</li>
        <li>Who is working on it and what each person owns</li>
        <li>What is working well and what is currently painful</li>
        <li>What success looks like over the next one to three months</li>
        <li>
          Any unusual constraints: regulated environment, multi-tenancy, real-time requirements,
          legacy integrations
        </li>
      </ul>
      <p>
        That last one carries the most weight and gets skipped the most often. A multi-tenant
        system has different rules than a single-tenant one, and if the model does not know
        which it is looking at, half of what it produces will be quietly wrong in a way that
        surfaces at the worst time.
      </p>
      <p>
        You know the pass is done when the model can summarise your project in a form you would
        be comfortable sending to a new contributor. If the summary has gaps, keep going. If it
        reads generically, it did not understand and neither of you noticed.
      </p>

      <h2>Step 2: audit before you generate</h2>
      <p>
        Now map the system. For an existing codebase this is an audit. For a new one it is a
        sketch.
      </p>
      <p>
        The audit follows the spine rather than reading everything. Top-level structure, then
        entry points, then one core flow traced end to end. Here is the prompt.
      </p>

      <pre className="blog-rules">{`Audit this codebase with me. Do not propose changes.

1. I will paste the top-level directory structure. Tell me which
   directories you need to see to understand the system, and why.

2. I will paste the entry points you name. Build a picture of the
   major components and their responsibilities.

3. Pick the single most important user flow. Ask me for the files
   needed to trace it end to end, one request at a time.

As you go, build and hold:
- Major components, their responsibilities, and their paths
- Core data flows
- Persistent data shapes, including invariants and gotchas that
  are not visible from the schema
- Integration points with external systems and their failure modes
- Cross-cutting concerns: auth, logging, multi-tenancy
- Coding conventions you observe

Do not read the whole codebase. Follow the spine. Ask me when
something is not clear from the code alone. Flag any file that
looks like many others depend on it.

When you have enough to describe the system without me prompting,
say so and give me that description.`}</pre>

      <p>
        For a new project, invert it. The model proposes major components, stack choices, core
        data flows for the primary journeys, the models that exist on day one, integration
        points, and cross-cutting concerns. You validate or push back on each section. Keep the
        scope to what will exist in the first one or two sprints. Designing the whole system up
        front produces a document about a system that will never get built.
      </p>

      <h2>Step 3: data shapes before logic</h2>
      <p>Of everything in the audit, data shapes are where the rework concentrates.</p>
      <p>
        Logic written against a guessed schema is not just wrong, it is expensively wrong,
        because by the time the real schema arrives there are three files depending on the
        guess. Fixing it means touching all of them, and the model that wrote them will not
        remember why they look the way they do.
      </p>
      <p>Write down the things a schema dump does not tell you:</p>
      <ul>
        <li>Which fields are conditionally present and under what conditions</li>
        <li>
          Invariants that must hold across records, especially ones enforced in application
          code rather than by constraints
        </li>
        <li>
          Fields that look nullable but are never null in practice, and the reverse
        </li>
        <li>Denormalised copies that must stay in sync</li>
        <li>Anything that exists for historical reasons and cannot be changed yet</li>
      </ul>
      <p>
        Five bullet points here save a week later. This is the single highest-leverage paragraph
        in this post.
      </p>

      <h2>Step 4: hand over briefs, not prompts</h2>
      <p>Once the map exists, the unit of work changes.</p>
      <p>Before:</p>
      <blockquote>
        <p>Add team invites.</p>
      </blockquote>
      <p>After:</p>

      <pre className="blog-rules">{`## Task: team invites

**In scope:** invite by email, pending state, accept flow, revoke.

**Out of scope:** roles and permissions (separate task), resend,
bulk import. Do not build these even if they seem necessary.

**Data:** new invites table. Fields: id, team_id, email, token,
status (pending|accepted|revoked), expires_at, created_by.
Tokens are single use. Emails are lowercased before storage.
An email can have at most one pending invite per team.

**Files you will touch:** src/api/teams/*, src/db/schema.ts,
src/services/mail.ts. Anything outside this list, stop and ask.

**Constraints:** src/db/router.ts is a stable seam, do not modify.
Follow the existing service pattern in src/services/billing.ts.

**Done means:** accept flow has a test, revoke flow has a test,
expired token returns 410, migration is reversible.`}</pre>

      <p>
        The second version takes four minutes to write. It removes almost every decision the
        model would otherwise make by guessing, and it makes the output reviewable, because
        &ldquo;done&rdquo; was defined before the work started rather than negotiated after.
      </p>
      <p>
        That is the whole shift. You stopped describing an outcome and started specifying an
        interface.
      </p>

      <h2>When this is not worth it</h2>
      <p>
        A weekend prototype. A script you will run once. Anything under a few hundred lines that
        nobody else will ever open. Vibecoding is genuinely the right tool for those, and the
        overhead of a TPM pass would cost more than the rework it prevents.
      </p>
      <p>
        The moment it flips is when a second person joins, when something goes to production, or
        when the codebase grows past the point where you can hold it in your head. Around then
        the model starts needing the same things a new engineer would need on day one, and for
        the same reason.
      </p>
      <p>
        Nobody hands a new hire a ticket saying &ldquo;build me a dashboard&rdquo; and expects
        it to go well. Stop doing it to the model.
      </p>

      <div className="blog-close">
        <p>
          The understanding pass, the audit, and the brief format are components of Trellis VI,
          a methodology for AI-assisted development on codebases that have to survive past the
          prototype. The full method covers the context layer, stable seams, decision logs, and
          the enforcement gates that keep the discipline from eroding by week three.
        </p>
        <p>
          <Link to="/">Learn the framework in eight weeks</Link>
          {" · "}
          <Link to="/blog/$slug" params={{ slug: "stable-seams-strategy" }}>
            The stable seams strategy
          </Link>
          {" · "}
          <Link to="/blog/$slug" params={{ slug: "why-your-cursor-codebase-collapses" }}>
            Why Cursor collapses after 2,000 lines
          </Link>
        </p>
      </div>
    </article>
  );
}
