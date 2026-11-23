import type { CSSProperties } from "react";
import { Check, Lock, MessageCircle } from "lucide-react";
import { platformFeatures } from "@/content/landing";
import { LogoMark, SectionHeader, Slab } from "./primitives";

const mockWeeks = [
  { n: 1, title: "The map", meta: "7 of 7 sessions done", state: "complete" },
  { n: 2, title: "Guided project, phase 1", meta: "2 of 6 sessions done", state: "progress" },
  { n: 3, title: "Guided project, phase 2", meta: "Opens Monday", state: "locked" },
  { n: 4, title: "The checkpoint", meta: "Opens in 2 weeks", state: "locked" },
] as const;

const mockSessions = [
  { title: "The bootstrap: context files before code", kind: "Theory", done: true },
  { title: "One phase, one branch, one PR", kind: "Theory", done: true },
  { title: "From bootstrap to a live hello-world", kind: "Practice", next: true },
  { title: "Schema and auth from the blueprint", kind: "Practice" },
];

function PlatformMock() {
  return (
    <div className="pm" aria-hidden="true">
      <div className="pm-rail">
        <LogoMark className="size-8 text-white" />
        <span className="pm-rail-item is-active" />
        <span className="pm-rail-item" />
        <span className="pm-rail-item" />
        <span className="pm-rail-avatar">AM</span>
      </div>
      <div className="pm-canvas">
        <p className="pm-eyebrow">Trellis VI · Cohort 1</p>
        <p className="pm-h1">Good morning.</p>
        <p className="pm-sub">Week 2 is open.</p>

        <div className="pm-hero">
          <div className="min-w-0 flex-1">
            <p className="pm-hero-eyebrow">This week · Week 2 of 8</p>
            <p className="pm-hero-title">Guided project, phase 1</p>
            <p className="pm-hero-meta">6 sessions, including one task</p>
            <div className="pm-bar">
              <span style={{ width: "33%" }} />
            </div>
          </div>
          <div className="pm-continue">
            <p className="pm-continue-label">Up next</p>
            <p className="pm-continue-title">From bootstrap to a live hello-world</p>
            <p className="pm-continue-label">Practice</p>
            <span className="pm-continue-btn">Continue →</span>
          </div>
        </div>

        <div className="pm-grid">
          <div className="pm-weeks">
            <p className="pm-section">Your 8 weeks</p>
            {mockWeeks.map((week) => (
              <div key={week.n} className={`pm-week pm-week--${week.state}`}>
                <div className="pm-week-head">
                  <span className="pm-week-tile">
                    {week.state === "complete" ? <Check className="size-4" /> : week.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="pm-week-title">
                      Week {week.n}: {week.title}
                    </span>
                    <span className="pm-week-meta">{week.meta}</span>
                  </span>
                  {week.state === "complete" ? (
                    <span className="pill pill--success">Complete</span>
                  ) : null}
                  {week.state === "progress" ? (
                    <span className="pill pill--progress">In progress</span>
                  ) : null}
                  {week.state === "locked" ? (
                    <Lock className="size-4 text-muted-foreground" />
                  ) : null}
                </div>
                {week.state === "progress" ? (
                  <ol className="pm-sessions">
                    {mockSessions.map((session, i) => (
                      <li key={session.title} className={session.next ? "is-next" : undefined}>
                        <span className={`pm-session-num${session.done ? " is-done" : ""}`}>
                          {session.done ? <Check className="size-3" /> : i + 1}
                        </span>
                        <span className="pm-session-title">{session.title}</span>
                        {session.next ? <span className="pill pill--brown">Up next</span> : null}
                        <span className="pm-session-kind">{session.kind}</span>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </div>
            ))}
          </div>

          <div className="pm-side">
            <div className="pm-progress">
              <p className="pm-section">Your progress</p>
              <div className="flex items-center gap-4">
                <span className="pm-ring" style={{ "--progress": 17 } as CSSProperties}>
                  <span>17%</span>
                </span>
                <span className="text-[0.8rem] leading-snug">
                  <strong className="block text-ink">9 sessions done</strong>
                  <span className="text-muted-foreground">1 of 8 weeks complete</span>
                </span>
              </div>
            </div>
            <div className="pm-assistant">
              <p className="pm-assistant-head">
                <span className="pm-assistant-icon">
                  <MessageCircle className="size-3.5" />
                </span>
                Course assistant
              </p>
              <p className="pm-assistant-body">
                Ask about this week's material. Answers stay within the sessions you have unlocked.
              </p>
              <p className="pm-assistant-q">
                Why does the bootstrap write context files before any code?
              </p>
              <span className="pm-assistant-btn">Ask a question</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlatformSection() {
  return (
    <Slab id="platform" tone="paper" className="overflow-hidden py-24 sm:py-32">
      <SectionHeader
        index="06"
        label="Inside the platform"
        title="A course platform built with the method it teaches."
        lede="Lessons, tasks, live sessions and an assistant in one place. Weeks open on the cohort's schedule, so everyone arrives at the live session having done the same work."
      />

      <div className="pm-stage mt-14">
        <PlatformMock />
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        The Trellis VI student dashboard, shown mid-way through week 2.
      </p>

      <ul className="feature-grid mt-14">
        {platformFeatures.map((feature) => (
          <li key={feature.title}>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-body">{feature.body}</p>
          </li>
        ))}
      </ul>
    </Slab>
  );
}
