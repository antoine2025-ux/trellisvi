export type SessionKind = "theory" | "practice" | "assessment" | "task";

export type CurriculumSession = {
  title: string;
  kind: SessionKind;
};

export type CurriculumWeek = {
  n: number;
  title: string;
  goal: string;
  outcome: string;
  live: string;
  sessions?: CurriculumSession[];
  highlights?: string[];
  business?: string;
};

export type CurriculumPhase = {
  label: string;
  title: string;
  summary: string;
  weeks: number[];
};

export const SESSION_KIND_LABELS: Record<SessionKind, string> = {
  theory: "Theory",
  practice: "Practice",
  assessment: "Assessment",
  task: "Task",
};

export const weeks: CurriculumWeek[] = [
  {
    n: 1,
    title: "The map",
    goal: "Draw a system and explain every arrow before the AI writes a line.",
    outcome: "A drawing of a system where you can explain every arrow",
    live: "90-minute case study session, plus a 20-minute one-to-one on your blueprint",
    sessions: [
      { title: "Welcome: how the eight weeks work", kind: "theory" },
      { title: "How a request moves through software", kind: "theory" },
      { title: "Where data lives, and what a relation is", kind: "theory" },
      { title: "What you decide, what the AI builds", kind: "theory" },
      { title: "From problem to blueprint", kind: "practice" },
      { title: "Case study: the bakery", kind: "assessment" },
      { title: "Submit your blueprint", kind: "task" },
    ],
  },
  {
    n: 2,
    title: "Guided project, phase 1",
    goal: "A live URL with auth, a real schema and one working feature, built through the loop.",
    outcome: "A live URL with auth, a real schema and one feature",
    live: "Build clinic. Bring a stuck prompt or a broken deploy",
    sessions: [
      { title: "The bootstrap: context files before code", kind: "theory" },
      { title: "One phase, one branch, one PR", kind: "theory" },
      { title: "From bootstrap to a live hello-world", kind: "practice" },
      { title: "Schema and auth from the blueprint", kind: "practice" },
      { title: "Your first feature through the loop", kind: "practice" },
      { title: "Submit phase 1", kind: "task" },
    ],
  },
  {
    n: 3,
    title: "Guided project, phase 2",
    goal: "Survive a schema change on populated data, wire an integration with a secret, and implement one cross-cutting rule once.",
    outcome: "A schema change on live data, an integration, a seam and an ADR",
    live: "Build clinic, plus a segment on reading your first audit report",
    sessions: [
      { title: "Changing a schema on live data", kind: "theory" },
      { title: "Seams and decisions", kind: "theory" },
      { title: "Phase 2, on my own copy", kind: "practice" },
      { title: "Reading an audit report", kind: "practice" },
      { title: "Migrations and seams", kind: "assessment" },
      { title: "Submit phase 2", kind: "task" },
    ],
  },
  {
    n: 4,
    title: "The checkpoint",
    goal: "A defensible grade from your repo, and a spec for your own project small enough to ship in a week.",
    outcome: "Your grade, and the spec for your own project",
    live: "Retrospective on the guided project, plus a 15-minute one-to-one to walk your grade",
    sessions: [
      { title: "How the checkpoint is graded", kind: "theory" },
      { title: "Writing a spec", kind: "theory" },
      { title: "Cutting scope, live", kind: "practice" },
      { title: "Submit your spec and your new repo", kind: "task" },
    ],
  },
  {
    n: 5,
    title: "Own project, phase 1",
    goal: "Schema, auth and a first feature on your own idea, without the guide rails.",
    outcome: "Schema, auth and a first feature on your idea",
    live: "Workshop on cutting scope, then clinic",
    highlights: [
      "Back-end and infrastructure: environment variables, what runs where, one external API",
      "Antoine's own phase 1 on a fresh idea, shown end to end",
    ],
  },
  {
    n: 6,
    title: "Own project, phase 2",
    goal: "Run audits, manage debt and record decisions without being told to.",
    outcome: "Audits, a debt list and decisions you recorded unprompted",
    live: "Workshop on reading logs, then clinic",
    highlights: [
      "Verification as a discipline: audits, logs, tests, and a debt list kept in the repo",
      "Antoine debugs a real production failure, from the logs to a surgical fix",
    ],
  },
  {
    n: 7,
    title: "Production sprint",
    goal: "Your project is real, deployed, and has been through the full loop at least three times.",
    outcome: "Your project, deployed, through the loop at least three times",
    live: "Daily 30-minute standups with real-time architectural feedback on your build",
    highlights: ["No new theory. Build, audit, correct, merge, record. Every day."],
  },
  {
    n: 8,
    title: "Launch",
    goal: "Leave with a portfolio piece you can defend line by line.",
    outcome: "A portfolio piece you can defend line by line",
    live: "Demo day: you present your system diagram and your build",
    highlights: [
      "Packaging a build as proof of capability: the repo is the portfolio, not the screenshots",
    ],
    business:
      "Business track: turn the build into a priced retainer offer, from who to sell to, to how to price build and maintenance.",
  },
];

export const phases: CurriculumPhase[] = [
  {
    label: "Week 1",
    title: "The map",
    summary: "Learn to see software as a system: the parts, the arrows, and where the data lives.",
    weeks: [1],
  },
  {
    label: "Weeks 2 to 3",
    title: "Build one: guided",
    summary:
      "Build from a spec designed to break undisciplined builds: ownership, a seam, a schema change on live data, a secret.",
    weeks: [2, 3],
  },
  {
    label: "Week 4",
    title: "The checkpoint",
    summary:
      "Your guided build is graded from the repo and the live URL. The refund line is drawn here.",
    weeks: [4],
  },
  {
    label: "Weeks 5 to 7",
    title: "Build two: yours",
    summary: "The same loop on your own idea. The second build is where the method sticks.",
    weeks: [5, 6, 7],
  },
  {
    label: "Week 8",
    title: "Launch",
    summary: "Demo day, a portfolio you can defend, and the optional business track.",
    weeks: [8],
  },
];

export function weekByNumber(n: number) {
  return weeks.find((week) => week.n === n);
}
