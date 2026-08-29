import { useEffect, useRef, useState } from "react";
import { WeekSketch } from "@/components/WeekSketches";

const weeks = [
  {
    n: "01",
    title: "The Big Picture of Software.",
    body: "Decoding the jargon, front-end, back-end, databases, and APIs, into plain English.",
    outcome:
      "You can confidently sketch exactly how your system connects on a napkin before you build it.",
  },
  {
    n: "02",
    title: "Your Workspace & First Launch.",
    body: "Setting up your digital tools (like Trellis) and getting comfortable making them work together.",
    outcome: "You will ship a basic, working project to a real public URL by week two.",
  },
  {
    n: "03",
    title: "Wrangling the AI.",
    body: "Why AI gets easily confused during complex tasks, and how to keep it focused.",
    outcome:
      "You can successfully guide the AI to build large projects over multiple days without it losing the plot.",
  },
  {
    n: "04",
    title: "Saving Data.",
    body: "How apps remember user information, and how to organize it right so it doesn't collapse later.",
    outcome: "Your app gets a custom, working database.",
    business: "Business Track opens: Identifying your ideal customer.",
  },
  {
    n: "05",
    title: "Professional Hosting.",
    body: "Connecting the heavy-duty plumbing (like Vercel and Supabase) to keep your app running smoothly and securely.",
    outcome: "Your project is wired up and ready to launch on demand.",
    business: "Business Track: Structuring your offer and its price.",
  },
  {
    n: "06",
    title: "Fixing Things When They Break.",
    body: "Stop endlessly re-prompting. Learn to actually read and fix errors in code you didn't write.",
    outcome: "You can confidently troubleshoot live bugs instead of starting over.",
    business: "Business Track: Nailing your first client conversations.",
  },
  {
    n: "07",
    title: "The Build Sprint.",
    body: "A live, hackathon-style workshop with real-time feedback on your project.",
    outcome: "Your custom software is fully built, real, and working.",
  },
  {
    n: "08",
    title: "Portfolio & Pitch.",
    body: "Packaging your finished software as undeniable proof of your new skills, then using it to win work.",
    outcome: "You leave with a polished portfolio and all course guarantees fulfilled.",
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
            {week.body}
          </p>
          <p className="mt-4 max-w-[46rem] font-serif text-xl italic leading-snug text-foreground md:text-2xl">
            Outcome: {week.outcome}
          </p>
          {week.business ? (
            <p className="mt-3 font-medium text-brown md:text-lg">{week.business}</p>
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
