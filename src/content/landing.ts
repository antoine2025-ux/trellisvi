export const cohort = {
  name: "Cohort 1",
  seats: 10,
  price: "$2,499",
  startLong: "Monday 11 January 2027",
  startShort: "11 Jan 2027",
  closeLong: "Wednesday 6 January 2027",
  closeShort: "6 Jan 2027",
  hoursPerWeek: "5 to 8 hours a week",
  hoursShort: "5–8 h a week",
};

export const hero = {
  eyebrow: "AI-assisted development cohort · Application only",
  titleLead: "Run AI like an engineering team.",
  titleTail: "Ship software that survives production.",
  lede: "An eight-week cohort that teaches the Technical Program Management method behind production AI builds. You decide, scope, check and record. The agent writes the code. You build real software twice, and graduate with a repo anyone can audit.",
  instructor: "Taught by Antoine Morlet",
  instructorRole: "Ex Wise, ex Nordea. Builds software for clients on monthly retainer.",
  videoCaption:
    "12 minutes on what the program is, what you leave with, and who it's absolutely not for.",
};

export const heroStats: [string, string][] = [
  ["8 weeks", "Live cohort"],
  [`${cohort.seats} seats`, "Application only"],
  ["2 builds", "Guided, then yours"],
  ["1 repo", "You can defend line by line"],
];

export const problem = {
  title: "Everyone teaches what AI can do. We teach where it breaks.",
  lede: "Claude, Cursor and Lovable will get anyone to a convincing demo in an afternoon. Then you add a database, a second user, a real integration, and the build starts eating itself.",
  failures: [
    {
      label: "Context collapse",
      symptom:
        "After a few thousand lines the agent forgets decisions it made last week and quietly rewrites working code.",
    },
    {
      label: "Schema drift",
      symptom:
        "The AI invents the data model as it goes. The first schema change on live data breaks everything that touched it.",
    },
    {
      label: "Silent seams",
      symptom:
        "A permission rule lives in six places. You fix one, the other five keep leaking, and nothing throws an error.",
    },
    {
      label: "Paste-and-pray debugging",
      symptom:
        "The error goes back into the chat. The fix breaks two other features. Nobody can say which part actually failed.",
    },
  ],
  quoteLead: "Giving someone a commercial kitchen doesn't make them a head chef.",
  quoteTail:
    "AI power tools didn't turn everyone into a systems architect. They just made bad building faster.",
};

export const methodSteps: { name: string; line: string; rule: string }[] = [
  {
    name: "The map",
    line: "Every app is the same few parts joined by arrows. You learn to draw yours and explain every arrow.",
    rule: "When something breaks, the first question is: which arrow failed?",
  },
  {
    name: "The blueprint",
    line: "Data first, then the arrows, then the screens. The schema is decided by you, before the AI writes a line.",
    rule: "Deadline beats elegance. Schema beats both.",
  },
  {
    name: "Context files before code",
    line: "Eight files in the repo give every AI session the same facts: architecture, rules, seams, decisions, debt, roadmap.",
    rule: "If it is not in the repo, it did not happen.",
  },
  {
    name: "The phase loop",
    line: "Bootstrap, phase, audit, correct, merge, summary. Run on every build, every week, until it is reflex.",
    rule: "One phase, one branch, one PR, one audit, one summary.",
  },
  {
    name: "Seams and decisions",
    line: "Cross-cutting rules live in one function. Every real choice gets an ADR saying what was decided and why.",
    rule: "Propose, never decide: the AI surfaces options, you make the call.",
  },
  {
    name: "A verifiable repo",
    line: "Context files, PRs, audits, ADRs and session summaries that agree with the git log. That is the grading surface.",
    rule: "A working app can be vibe-coded. A repo like this cannot be faked.",
  },
];

export const loopStages = ["Bootstrap", "Phase", "Audit", "Correct", "Merge", "Summary"];

export const ledgerRows: [string, string, string][] = [
  ["The button does nothing", "Browser to server", "Does the click send a request at all?"],
  [
    "The order never appears",
    "Server to database",
    "Show me the query that saves it, and its error.",
  ],
  [
    "Orders save, but no email arrives",
    "Server to an external service",
    "Is the key set, and what did the API reply?",
  ],
];

export const comparisonRows = [
  {
    label: "You start with",
    vibe: "An idea and a chat window",
    trellis: "A data model and a system you've drawn on one page",
  },
  {
    label: "You work by",
    vibe: "Asking, reading, asking again",
    trellis: "Directing phases across sessions, with context files that hold the decisions",
  },
  {
    label: "When it breaks",
    vibe: "You paste the error back in and hope",
    trellis: "You find which arrow failed, read the logs, and issue a surgical fix",
  },
  {
    label: "You ship",
    vibe: "Something that works, built on assumptions you didn't make",
    trellis: "A system built the way you decided it should be, audited phase by phase",
  },
  {
    label: "It costs you",
    vibe: "An afternoon",
    trellis: `Eight weeks, ${cohort.hoursPerWeek}`,
  },
  {
    label: "You end up with",
    vibe: "A prototype",
    trellis: "A deployed system, a repo you can defend line by line, and the method to do it again",
  },
];

export type Track = {
  id: "work" | "freelance";
  eyebrow: string;
  title: string;
  lede: string;
  points: string[];
  fit: string;
};

export const tracks: Track[] = [
  {
    id: "work",
    eyebrow: "Track A · Inside your company",
    title: "Become the person who ships the internal tools.",
    lede: "Stop waiting for an engineering roadmap that will never prioritise your team. Build the automation, the dashboard, the forecasting tool yourself, and run it in production.",
    points: [
      "Turn the processes you know best into working software",
      "Ship with the auth, data ownership and audit trail your company expects",
      "Hand engineering a repo they can review, not a prototype they have to rewrite",
    ],
    fit: "For operators, team leads, product and program managers who already use AI every day.",
  },
  {
    id: "freelance",
    eyebrow: "Track B · As a business",
    title: "Sell production builds on a monthly retainer.",
    lede: "Mid-market companies want custom software and cannot hire engineers fast enough. The method that ships your build is the service you sell.",
    points: [
      "Two deployed builds and a defendable repo as your proof of capability",
      "The same loop, repeatable on every client project",
      "Optional business track in week 8: offer, pricing for build and maintenance, first conversations",
    ],
    fit: "For consultants, freelancers and builders ready to turn AI building into a paid service.",
  },
];

export const platformFeatures: { title: string; body: string }[] = [
  {
    title: "A course assistant on every lesson",
    body: "Ask about the material you have unlocked. It answers from the course, not the internet, and tells you which week covers what you have not reached yet.",
  },
  {
    title: "Tasks graded from your repo",
    body: "Every week ends with a task submitted as a repository link. If it is not in the repo or on the live URL, it did not happen.",
  },
  {
    title: "Live every week, recorded",
    body: "A 90-minute live session, a build clinic from week 2, and daily standups in the production sprint. Every session lands in your library.",
  },
  {
    title: "A library you keep",
    body: "When the cohort ends, the recordings and materials stay with you as a permanent library.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  tag: string;
};

export const featuredTestimonial: Testimonial = {
  quote:
    "I've used AI for several years. For simple apps, Cursor worked pretty well, but as soon as I aimed at more complex code it was almost impossible to deploy anything in production that would either work properly or work at all. I've spent a considerable amount of money on learning AI skills, but Trellis VI goes beyond that: it teaches you all its silent limitations and how to work around them to produce something meaningful. I can't recommend it enough.",
  name: "William C.",
  role: "Staff Product Manager",
  tag: "Production builds",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "As a Quality team leader for one of Europe's largest fintechs, Trellis VI has been a game changer in the way I build automations for me and my team. Before, they looked like good prototypes. Now they run and work in production.",
    name: "Aleksei S.",
    role: "Fincrime Quality Management Team Lead, Wise",
    tag: "Built at work",
  },
  {
    quote:
      "I work for a large furniture and home goods chain in Australia. I used to be in the mattress section as a sales rep. I still work there, except now I'm building a client volume forecast automation for them.",
    name: "Olivier M.",
    role: "Sales rep turned automation builder, Harvey Norman",
    tag: "Career change",
  },
];

export const instructor = {
  name: "Antoine Morlet",
  title: "Founder of Trellis VI and PowerIntel",
  story: [
    "I spent ten years in banking, regulatory transformation and fintech, including Wise and Nordea. As a technical program manager I sat directly between the engineers and the business: take a vague idea, turn it into a system other people could execute, and know exactly where it would break.",
    "That career taught me the principle this course is built on. You don't need to write the code to direct the build. You need to hold the whole system in your head and own every decision.",
    "When ChatGPT arrived in 2022, the writing was on the wall. This technology would change everything, but only for the people who learned to harness it properly. So I left. Today I build software for clients on monthly retainers, I work entirely for myself, and I moved my family across the world simply because I could.",
    "Trellis VI is the exact system I use to do that work. This is where I teach it.",
  ],
  credentials: [
    ["10 years", "Banking, regulatory transformation and fintech"],
    ["Wise · Nordea", "Technical program management, between engineering and the business"],
    ["Today", "Builds software for clients on monthly retainer"],
  ] as [string, string][],
  builtWith: [
    { name: "Loopwell", href: "https://www.loopwell.io", note: "Built with Trellis VI" },
    {
      name: "Providens",
      href: "https://www.powerintel.co/products/providens",
      note: "Built with Trellis VI",
    },
  ],
};

export const rubric: { column: string; checks: string; scoring: string }[] = [
  {
    column: "Works",
    checks: "Every requirement in the guided project spec passes on your live URL.",
    scoring: "Binary, per requirement",
  },
  {
    column: "Disciplined",
    checks:
      "Context files consistent, one branch and PR per phase, an audit per phase, at least one ADR, the seam handled once, no secrets in git history.",
    scoring: "Per item",
  },
  {
    column: "Verifiable",
    checks: "A session summary for every session, and what it says happened matches the git log.",
    scoring: "Per session",
  },
];

export const included: { title: string; note: string }[] = [
  { title: "Eight 90-minute live sessions", note: "Teaching and workshops, one a week" },
  { title: "Weekly build clinic", note: "From week 2, plus daily standups in week 7" },
  { title: "Two one-to-one calls", note: "Your blueprint in week 1, your grade in week 4" },
  { title: "Every task reviewed from your repo", note: "Graded against the Trellis VI rubric" },
  { title: "Course assistant on every lesson", note: "Answers from the material you've unlocked" },
  { title: "Permanent library", note: "Recordings and materials, kept after the cohort" },
  { title: "Private cohort group", note: "Plus lifetime access to the community" },
  { title: "2 months of Claude Max", note: "Included when you join" },
];

export const faqs: [string, string][] = [
  [
    "Do I need to know how to code?",
    "No. You will not be taught syntax, and you are not trying to become an engineer. You do need basic project management sense and comfort with problem solving. If you have never worked in a role that required structured thinking, this course is not for you.",
  ],
  [
    "How is this different from a Cursor, Claude Code or vibe coding course?",
    "Tool tutorials teach you what AI can do. Trellis VI teaches you where it breaks and the method that stops it: a blueprint before code, context files that hold decisions, one phase per branch, audits, seams and ADRs. You are graded on a repo that proves you worked that way, not on a demo.",
  ],
  [
    "How much time does it take each week?",
    "Plan for 5 to 8 hours a week: about an hour of video, 1.5 to 2.5 hours live, and 3 to 5 hours building. Week 7 adds daily 30-minute standups.",
  ],
  [
    "What tools do we use?",
    "Cursor, Claude, GitHub, Vercel and Supabase. You set up the accounts with a pre-course checklist before day one, so week one is spent learning, not installing. Two months of Claude Max are included.",
  ],
  [
    "What will I actually build?",
    "Two real applications. In weeks 2 and 3 you build a guided project from a spec designed to break undisciplined builds: auth with ownership, a cross-cutting rule, a schema change on live data and an external integration. In weeks 5 to 7 you run the same loop on your own idea and deploy it. You keep the rights to everything you build.",
  ],
  [
    "Is this for building at work or for freelancing?",
    "Both. The method is identical. Most students use it to ship tools inside their company; others package it as a retainer service, and week 8 includes an optional business track for that.",
  ],
  [
    "How does the Week 4 checkpoint guarantee work?",
    "At the end of week 3 you submit your guided project. In week 4 it is graded from the repo and the live URL across three columns: Works, Disciplined and Verifiable, and you walk through the grade in a one-to-one. If you did the work and do not believe the method will get your own build to production by week 8, you get a full refund. The full conditions are in the terms.",
  ],
  [
    "Are the sessions recorded? What if I miss a week?",
    "Every live session is recorded. Course access stays open for 10 weeks from the start, and the recordings and materials stay in your library after that. Missing one week is recoverable, but plan your calendar for all eight.",
  ],
  [
    "How large is a cohort?",
    "Ten seats. Every task is reviewed individually from your repo, and that does not scale past a small group.",
  ],
  [
    "Can I pay in instalments?",
    "Yes. A zero-interest, three-part payment plan is available, approved case by case. Choose the payment plan option in the application.",
  ],
  [
    "What happens after I apply?",
    "The application takes about two minutes. If you look like a fit, you can book your onboarding call straight away. Otherwise we review it and email you within 24 hours.",
  ],
];
