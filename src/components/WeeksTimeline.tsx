import { useEffect, useRef, useState } from "react";
import { WeekSketch } from "@/components/WeekSketches";

const weeks = [
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

function WeekItem({ week }: { week: (typeof weeks)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li ref={ref} className={`weeks-item${shown ? " is-in" : ""}`}>
      <div className="weeks-marker" aria-hidden="true">
        <span className="weeks-node" />
      </div>
      <p className="weeks-num">{week.n}</p>
      <div className="weeks-copy">
        <div className="min-w-0">
          <h3 className="text-[1.625rem] font-bold leading-[1.12] sm:text-[33px] md:text-[45px]">
            {week.title}
          </h3>
          <p className="mt-4 max-w-[46rem] text-lg font-semibold leading-[1.6] text-foreground md:text-xl">
            The Shift: {week.shift}
          </p>
          <p className="mt-4 max-w-[46rem] font-serif text-xl italic leading-snug text-foreground md:text-2xl">
            Outcome: {week.outcome}
          </p>
          {week.business ? (
            <p className="mt-3 font-medium text-brown md:text-lg">
              Business Track: {week.business}
            </p>
          ) : null}
        </div>
        <WeekSketch n={week.n} />
      </div>
    </li>
  );
}

export function WeeksTimeline() {
  const ref = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);

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
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`weeks-timeline mx-auto max-w-5xl px-6 py-20${playing ? " is-playing" : ""}`}
    >
      <h2 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">
        What you'll learn, in 8 weeks.
      </h2>
      <p className="mt-3 text-muted-foreground">Theory, practice and workshops</p>
      <div className="weeks-track mt-14">
        <div className="weeks-rail" aria-hidden="true" />
        <ol className="weeks-list">
          {weeks.map((week) => (
            <WeekItem key={week.n} week={week} />
          ))}
        </ol>
      </div>
    </section>
  );
}
