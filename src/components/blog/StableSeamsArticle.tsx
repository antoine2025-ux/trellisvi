import { Link } from "@tanstack/react-router";

export function StableSeamsArticle() {
  return (
    <article className="blog-article">
      <p className="blog-kicker">Seam discipline</p>
      <h1>The stable seams strategy</h1>
      <p className="blog-lede">
        You asked for a small fix to a query. The model rewrote the router, passed the tests, and
        took production down at the first traffic spike. Nothing in the request implied that.
        Nothing in the repo forbade it.
      </p>

      <p>
        This is the failure mode that scares people off AI-assisted development, and it is not
        really a model problem. It is a missing input.
      </p>
      <p>
        The file was open. It looked improvable. The model decided the database routing layer
        would be cleaner with a connection pool, and it shipped a confident diff. A senior
        engineer would have flinched before opening that file. The assistant did not flinch,
        because the flinch was never written down.
      </p>

      <h2>Why AI treats your router like a scratch file</h2>
      <p>
        Open any single source file and ask what it costs to change. You cannot tell. The file
        does not know how many modules import it. It does not know that a schema change there
        fans out into eleven services. It does not know which of its functions run on every
        request and which are dead code from a migration two years ago.
      </p>
      <p>
        A senior engineer carries that map in their head. They hesitate before opening{" "}
        <code>db/router.ts</code> and they do not hesitate before opening{" "}
        <code>utils/format-date.ts</code>. That hesitation is the entire safety mechanism, and it
        lives in a person&apos;s memory. An assistant working from the code alone has no access
        to it.
      </p>
      <p>Both files look like TypeScript. The model edits them with identical confidence.</p>

      <h2>What the data says about where damage concentrates</h2>
      <p>Two lines of research matter here.</p>

      <ol className="blog-findings">
        <li>
          <span className="blog-finding-num">01</span>
          <div>
            <h3>Risk is concentrated, not spread</h3>
            <p>
              Empirical work on change-prone classes keeps finding a Pareto pattern: roughly 80%
              of change lives in around 20% of classes. A long research thread on change
              coupling, meaning files that keep getting modified together, has found it correlates with
              defect proneness across large industrial systems. One study tracked 176,000 files
              over seven years and found a positive relationship between evolutionary coupling
              and defect measures. In at least one comparison, change coupling predicted fault
              proneness better than static structural coupling did.
            </p>
            <p>
              Translation: a small set of your files is where the bugs come from, and you can
              identify them from commit history rather than from intuition.
            </p>
          </div>
        </li>
        <li>
          <span className="blog-finding-num">02</span>
          <div>
            <h3>AI-era codebases are getting worse on exactly these axes</h3>
            <p>
              GitClear analysed 211 million changed lines from 2020 to 2024. Refactoring,
              measured as moved lines, fell from about 25% of changed lines in 2021 to under 10%
              in 2024. Copy-pasted lines rose from 8.3% to 12.3%, and 2024 was the first year in
              the dataset where copy-paste exceeded moved code. Blocks of five or more
              duplicated lines rose eightfold in 2024. Code churn, meaning lines reverted or rewritten
              within two weeks, went from 3.1% to 5.7%.
            </p>
            <p>
              Assistants add rather than restructure, and they duplicate rather than reuse.
              Applied to a peripheral file, that is untidy. Applied to a central one, it is an
              outage.
            </p>
          </div>
        </li>
      </ol>

      <blockquote>
        <p>
          The model does not know which files are load-bearing. Until you write that down, every
          file is a scratch file.
        </p>
      </blockquote>

      <h2>What counts as a high-blast-radius file</h2>
      <p>A file is high blast radius if at least one of these holds.</p>
      <ul>
        <li>
          <strong>Many things import it.</strong> Direct dependents in the double digits. A
          signature change there is a codebase-wide change whether you intended one or not.
        </li>
        <li>
          <strong>It carries central architectural responsibility.</strong> Database routing,
          auth middleware, the request pipeline, the tenant resolver, the job queue interface.
          Small surface area. Everything downstream of it.
        </li>
        <li>
          <strong>Bugs in it propagate silently.</strong> Money calculations, permission checks,
          anything that produces a wrong answer rather than an exception. The failure shows up
          in support tickets three weeks later.
        </li>
      </ul>
      <p>You can find candidates in about two minutes. Churn hotspots from git history:</p>

      <pre className="blog-tree">{`git log --format=format: --name-only --since=12.months \\
  | sort | uniq -c | sort -rg | head -20`}</pre>

      <p>Then import counts for anything in that list:</p>

      <pre className="blog-tree">{`grep -rl "from .*db/router" src/ | wc -l`}</pre>

      <p>
        Cross-reference the two lists. Files that are both heavily changed and heavily imported
        are your seams.
      </p>

      <h2>The registry</h2>
      <p>
        Write them down in <code>context/STABLE_SEAMS.md</code>, sitting in the repo where your
        AI tooling loads it every session. Here is the template.
      </p>

      <pre className="blog-rules">{`# STABLE_SEAMS.md

Files in this registry have high blast radius. Changes to them follow
the discipline at the bottom of this file. If a task requires touching
one of these files, stop and say so before writing any code.

---

## src/db/router.ts

**Why it is a seam:** every data access in the app passes through here.
47 direct importers. Connection lifecycle and tenant routing both live
in this file.

**Depends on it:** all of src/services/*, the job workers in
src/jobs/*, the migration runner.

**Safe changes:** adding a new named export; adding a parameter with a
default value; logging and instrumentation.

**Risky changes:** anything touching connection lifecycle, pooling, or
transaction boundaries. Changing the signature of getConnection().
Changing tenant resolution order.

**Known trap:** the retry wrapper looks redundant. It is not. It exists
because of the failover behaviour documented in ADR-004.

---

## src/auth/middleware.ts

**Why it is a seam:** enforces every permission check in the product.
Bugs here fail open, not closed.

**Depends on it:** every route in src/api/*.

**Safe changes:** adding a new permission constant; extending the
audit log payload.

**Risky changes:** the order of the checks; anything that adds an early
return; caching of resolved permissions.

---

## Discipline for all files in this registry

1. Declare before touching. State that the file is a seam and what
   the change is, before writing code.
2. One contributor at a time. No concurrent branches touching the
   same seam.
3. Announce in the PR description. The reviewer needs to know.
4. Second pair of eyes required. On solo projects, this is waived
   explicitly and replaced with a mandatory 24 hour delay before
   merge.
5. Phased refactors only. Backward compatibility holds at every phase
   boundary. No big-bang rewrites.
6. Never as a side effect. A seam change is its own commit with its
   own reason. It never rides along in a diff that was about
   something else.`}</pre>

      <p>Two things make this work, and both are easy to lose.</p>
      <p>
        <strong>Keep the list short.</strong> Three to eight files for a small or medium project.
        The registry earns its keep by being the exception. If you list thirty files, the AI
        treats seam status as background noise, and so do you. If you are reaching for a tenth
        entry, the honest move is usually to cut one of the first nine.
      </p>
      <p>
        <strong>Write the &ldquo;known trap&rdquo; lines.</strong> Those are the highest-value
        sentences in the file. They are the reason a piece of code that looks stupid is actually
        load-bearing, and they are the specific thing an assistant deletes when it tidies up. The
        retry wrapper. The seemingly pointless sleep. The check that looks duplicated. Every
        codebase has four or five of these, and they exist only in one engineer&apos;s head until
        someone writes them down.
      </p>

      <h2>Prompts are probabilistic, so add a gate</h2>
      <p>
        The registry changes behaviour most of the time. Most of the time is not a guarantee, and
        the whole point of the exercise is the case where the model does something you did not
        ask for. Back it with something deterministic.
      </p>

      <pre className="blog-rules">{`#!/bin/bash
# .git/hooks/pre-commit

SEAMS=$(grep '^## src/' context/STABLE_SEAMS.md | sed 's/## //')
STAGED=$(git diff --cached --name-only)

for seam in $SEAMS; do
  if echo "$STAGED" | grep -q "^$seam$"; then
    echo "BLOCKED: $seam is a stable seam."
    echo "Commit with --no-verify only after declaring the change."
    exit 1
  fi
done`}</pre>

      <p>
        Twelve lines, and the failure mode goes from &ldquo;the model ignored an instruction and
        nobody noticed&rdquo; to &ldquo;the commit stopped and a human had to make a
        decision.&rdquo; Instructions shape behaviour. Hooks enforce it. Use both.
      </p>

      <h2>Checking that it took</h2>
      <p>
        Open a fresh session and ask for something that requires editing a seam, phrased casually
        so nothing signals that you are testing. Ask it to clean up the connection handling in
        the router.
      </p>
      <ul>
        <li>
          <strong>Correct response:</strong> it names the file as a stable seam, quotes the
          reason from the registry, describes the change it would make, and waits.
        </li>
        <li>
          <strong>Wrong response:</strong> a diff.
        </li>
      </ul>
      <p>
        If you get the diff, the registry is not loading into the session. Check that the file
        is committed to your integration branch and that your project&apos;s context directory is
        actually indexed. An uncommitted seam registry protects nothing.
      </p>

      <div className="blog-close">
        <p>
          Stable seams are one mechanism inside Trellis VI, a methodology for AI-assisted
          development on codebases that have to survive past the prototype. The full method
          covers the context layer, decision logs, session handoff, and the deterministic
          enforcement gates that keep discipline from eroding by week three.
        </p>
        <p>
          <Link to="/">Learn the framework in eight weeks</Link>
          {" · "}
          <Link to="/blog/$slug" params={{ slug: "why-your-cursor-codebase-collapses" }}>
            Why Cursor collapses after 2,000 lines
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
