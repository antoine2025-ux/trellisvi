export type CurriculumWeek = {
  n: string;
  title: string;
  shift: string;
  outcome: string;
  business?: string;
};

export const weeks: CurriculumWeek[] = [
  {
    n: "01",
    title: "Systems Architecture First",
    shift:
      "Stop treating AI as a magic box. Learn the Technical Program Manager (TPM) methodology to sketch relational data models, API limits, and backend logic before generating any code.",
    outcome:
      "You will architect a bulletproof system blueprint that dictates exactly how the AI will build your app.",
  },
  {
    n: "02",
    title: "The Trellis Context Environment",
    shift:
      "Ditch chaotic chat windows. You will set up your digital workspace using the exact Trellis project setup, integrating automated GitHub context syncing and initial project bootstrap artifacts.",
    outcome:
      "You ship a baseline project to a live public URL, fully wired for persistent AI context.",
  },
  {
    n: "03",
    title: "Context Engineering & AI Orchestration",
    shift:
      "Learn why AI models suffer from amnesia and how to prevent it. You will implement RULES.md, define stable architectural seams, and master Cursor-to-Claude session handoff protocols.",
    outcome:
      "You can direct AI agents to build multi-day, complex features without the codebase collapsing.",
  },
  {
    n: "04",
    title: "Relational Data & State Management",
    shift:
      "AI is notoriously bad at unprompted schema design. Learn to build and enforce strict database structures (via Supabase) that scale seamlessly.",
    outcome: "A production-ready custom database.",
    business: "Defining your high-ticket freelance ICP (Ideal Customer Profile).",
  },
  {
    n: "05",
    title: "Production Infrastructure & CI/CD",
    shift:
      "Moving from a local prototype to a secure, live environment. Connect heavy-duty plumbing like Vercel, manage environment variables securely, and handle authentication.",
    outcome: "Your application is wired for professional user traffic.",
    business: "Structuring your automation and maintenance retainer pricing.",
  },
  {
    n: "06",
    title: "Advanced Debugging & Log Reading",
    shift:
      "Stop blindly re-prompting errors. Learn to read server logs, identify failure points in AI-generated code, and issue surgical, targeted fixes.",
    outcome: "You can confidently troubleshoot live production bugs.",
    business: "Mastering the mid-market client sales conversation.",
  },
  {
    n: "07",
    title: "The Production Sprint",
    shift:
      "A live, structured hackathon executing the audit-prompt-implement-audit-fix loop. Receive real-time architectural feedback on your specific build.",
    outcome: "Your custom software is real, functional, and deployed.",
  },
  {
    n: "08",
    title: "The Agency Launch",
    shift:
      "Transition from builder to business owner. Package your live software as undeniable proof of your engineering capability.",
    outcome:
      "You leave with a polished technical portfolio and your first live client proposals underway.",
  },
];
