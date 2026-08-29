import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, StaggerStack } from "@/components/Reveal";
import { WallSection } from "@/components/WallSection";
import { WeeksTimeline } from "@/components/WeeksTimeline";
import { ApplicationForm } from "@/components/ApplicationForm";
import instructorPhoto from "@/assets/instructor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Practitioner Program — Eight-Week AI Build Cohort" },
      {
        name: "description",
        content:
          "An application-only eight-week cohort for people who already build with AI and have hit the ceiling of prompting. Limited seats.",
      },
      { property: "og:title", content: "The Practitioner Program — Eight-Week AI Build Cohort" },
      {
        property: "og:description",
        content:
          "An application-only eight-week cohort for people who already build with AI and have hit the ceiling of prompting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function scrollToApply() {
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const outcomes: [string, string][] = [
  [
    "A live, shipped system.",
    "A real product running in production, powered by a database you designed, and used by people who aren't you.",
  ],
  [
    "A repeatable build method.",
    "You'll master the Trellis VI framework end-to-end. Your next idea won't start from a blank prompt — you'll have a proven, scalable system to execute it.",
  ],
  [
    "A validated, priced offer.",
    "You'll know exactly what you're selling, who you're selling it to, what it costs, and you'll have real sales conversations already underway.",
  ],
];

const forYou = [
  "You're genuinely interested in AI assisted development",
  "You want a skill you can actively monetize",
  "You've ideally used AI to build before but hit a ceiling",
  "You have 10-15 hours a week to commit",
];

const notForYou = [
  "You're looking for a magic button",
  "You're not particularly interested in building with AI",
  "You don't have at least basic computer skills",
  "You want a done for you agency engagement",
];

const testimonials: [string, string, string][] = [
  [
    "As a Quality team leader for one of Europe's largest fintechs, Trellis VI has been a game changer in the way I build automations for me and my team. Before, they looked like good prototypes. Now they run and work in production.",
    "Aleksei S.",
    "Fincrime Quality Management Team Lead at Wise.",
  ],
  [
    "I work for a large furniture and home good chain in Australia. What changed is what I do for them, because I first used to be in the mattress section as a sales rep. Now I still work there, except I'm building a client volume forecast automation for them.",
    "Olivier M.",
    "Ex sales rep turned Automation builder at Harvey Norman",
  ],
  [
    "I've used AI for several years. For simple apps, Cursor worked pretty well but as soon as I aimed at more complex code, it was almost impossible to deploy anything in production that would either work properly or work at all. I've spent a considerable amount of money on learning AI skills but the Trellis VI goes beyond that as it teaches you all its silent limitations and how to work around them to produce something meaningful. I can't recommend it enough.",
    "Placeholder Name",
    "Independent consultant",
  ],
];

const faqs: [string, string][] = [
  ["How much time per week?", "10 to 15 hours a week is the recommendation but it all depends on your learning pace. 1,5 to 2 hours a day is where we observe the fastest learning outcome."],
  ["Do I need to be a strong programmer?", "No, you don't need to be a programmer, but it does help to have basic non technical project management knowledge at minimum. If you have never touched a computer before, nor worked in any capacity that required some level of problem solving, this course may not be for you."],
  ["Are the sessions recorded?", "Yes, weekly live Q&A will be recorded with lifetime access."],
  ["What if I miss a week?", "Access to the course is open for 10 weeks from the start. The modules are relatively short, the practical work is what takes more time. Losing a week does not mean you'll be too behind to catch up, but we strongly recommend you to organize your schedule so that you can commit to the full 8 weeks without interruption."],
  ["How large is a cohort?", "Each cohort is capped at 20 seats. This is to ensure we can support each member where needed, since the practical work will be reviewed individually."],
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto max-w-5xl px-6 py-8">
        <span className="font-serif text-lg tracking-tight">Trellis VI Studio</span>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-10 sm:pt-20">
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Trellis VI AI assisted development 8-week course
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.12] sm:text-6xl md:text-7xl">
            Ship{" "}
            <span className="text-word-gradient">real</span> software in 8 weeks.
            Not another demo.
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-semibold leading-relaxed text-foreground">
            You'll learn the framework I use with paying clients, and finish with something
            running in production.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Antoine Morlet.</span> Ex Wise. Ex
            Nordea. Now building software for clients on monthly retainer.
          </p>
          <div className="mt-12">
            <Button size="xl" className="rounded-full" onClick={scrollToApply}>
              Apply for the next cohort
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Limited seats. Application only.
            </p>
          </div>
        </section>

        <Divider />

        {/* Video */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              [Placeholder caption] Twelve minutes on what the program is and who it is not for.
            </p>
            <div className="aspect-video w-full overflow-hidden border border-border bg-card">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/aqz-KE-bpKQ"
                title="Program introduction (placeholder video)"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
        </section>

        <Divider />

        <WallSection />

        <Divider />

        <WeeksTimeline />

        <Divider />

        {/* Outcome */}
        <Section title="What you leave with">
          <StaggerStack className="flex flex-col gap-5">
            {outcomes.map(([t, d]) => (
              <div
                key={t}
                className="outcomes-card w-full border border-border bg-card px-8 py-8 sm:px-10"
              >
                <h3 className="text-2xl font-bold leading-tight md:text-3xl">{t}</h3>
                <p className="mt-3 text-lg font-semibold leading-relaxed text-foreground">
                  {d}
                </p>
              </div>
            ))}
          </StaggerStack>
          <p className="mt-12 max-w-[52rem] font-serif text-xl italic leading-snug text-foreground md:text-2xl">
            By the end of this course, you'll be leaving with the meta-skill to tackle the
            hottest niche in the current market.
          </p>
        </Section>

        <Divider />

        {/* Fit */}
        <Section title="Who this is for">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <div className="rounded-[2.25rem] border border-brown/35 bg-card px-8 py-9 sm:px-10 sm:py-10">
              <h3 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
                This is for you if
              </h3>
              <ol className="mt-8 space-y-5">
                {forYou.map((t, i) => (
                  <li
                    key={t}
                    className="grid grid-cols-[2.25rem_1fr] gap-3 text-lg font-semibold leading-snug text-foreground md:text-xl"
                  >
                    <span className="text-brown">{String(i + 1).padStart(2, "0")}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[2.25rem] border border-border bg-secondary px-8 py-9 sm:px-10 sm:py-10">
              <h3 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
                This is not for you if
              </h3>
              <ol className="mt-8 space-y-5">
                {notForYou.map((t, i) => (
                  <li
                    key={t}
                    className="grid grid-cols-[2.25rem_1fr] gap-3 text-lg font-semibold leading-snug text-foreground md:text-xl"
                  >
                    <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        <Divider />

        {/* Instructor */}
        <Section title="Who teaches it">
          <div className="grid items-start gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-14">
            <div>
              <img
                src={instructorPhoto}
                alt="Antoine Morlet"
                width={728}
                height={1024}
                loading="lazy"
                className="w-full border border-border object-cover object-top"
              />
              <p className="mt-4 text-xl font-bold leading-tight">Antoine Morlet</p>
              <p className="mt-2 text-sm font-semibold leading-snug text-foreground">
                Founder of Trellis VI AI assisted development framework
              </p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                Founder of PowerIntel, Providens SRM AI and Loopwell.io
              </p>
            </div>
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                I spent ten years in banking, regulatory transformation, and fintech. As a technical
                program manager, I sat directly between the engineers and the business, translating
                the needs of one into the language of the other.
              </p>
              <p>
                That career taught me the exact principle this course is built on: you don't need to
                write the code to direct the build. You just need to hold the whole system in your
                head and know exactly where it breaks. My job was always to take a vague idea and
                turn it into a concrete system that others could execute.
              </p>
              <p>
                When ChatGPT arrived in 2022, the writing was on the wall. This technology would
                change everything, but only for the people who learned to harness it properly.
              </p>
              <p>
                So, I left. Today, I build software for clients on monthly retainers, I work
                entirely for myself, and I moved my family across the world simply because I could.
              </p>
              <p>
                Trellis VI is the exact system I use to do this work. This is where I teach it.
              </p>
            </div>
          </div>
        </Section>

        <Divider />

        {/* Proof */}
        <Section title="From past cohorts">
          <div className="grid items-start gap-10 md:grid-cols-3 md:gap-8">
            {testimonials.map(([q, n, r], i) => (
              <Reveal key={n + r}>
                <blockquote className={`sticker sticker-${i + 1}`}>
                  <span className="sticker-tape" aria-hidden="true" />
                  <p className="font-serif text-lg leading-relaxed">{q}</p>
                  <footer className="mt-5 text-sm text-muted-foreground">
                    <span className="block font-medium text-foreground">{n}</span>
                    {r}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Guarantee */}
        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="guarantee">
            <h2 className="guarantee-title">The Guarantee</h2>
            <p className="guarantee-lead">By the end of week 8, you will have:</p>
            <ol className="guarantee-list">
              <li>
                <span className="guarantee-num">01</span>
                <div>
                  <strong>Live Software and a Blueprint for Complexity.</strong> You will build
                  and deploy a functional application for real users. More importantly, you will
                  leave with the exact architectural blueprint required to scale it into complex
                  software featuring functional databases, API connections, and integrated AI
                  agents.
                </div>
              </li>
              <li>
                <span className="guarantee-num">02</span>
                <div>
                  <strong>Mastery Over AI Limitations:</strong> You will know exactly why AI
                  coding tools look deceptively easy but fail to extract real value on complex
                  builds, and how to use Trellis VI to completely bypass those roadblocks.
                </div>
              </li>
              <li>
                <span className="guarantee-num">03</span>
                <div>
                  <strong>A Client-Acquisition Strategy:</strong> You will not just learn to
                  build; you will leave with a packaged, priced offer, a defined target client,
                  and the exact strategy to put yourself out there and close them.
                </div>
              </li>
            </ol>
            <div className="guarantee-promise">
              <p className="guarantee-promise-title">
                The Checkpoint Promise or{" "}
                <span className="guarantee-money">your money back</span>
              </p>
              <p className="guarantee-promise-body">
                Do the work, hit the week 4 checkpoint, and if you don't possess all three of
                these assets, you get every euro back.
              </p>
            </div>
          </div>
        </section>

        {/* Price + application */}
        <section id="apply" className="mx-auto max-w-5xl scroll-mt-8 px-6 py-20">
          <div className="grid gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
            <div>
              <h2 className="text-3xl">Price and application</h2>
              <p className="mt-6 font-serif text-4xl">$2,499</p>
              <ul className="mt-8 space-y-3 text-muted-foreground">
                <li className="border-b border-border pb-3">Eight live sessions</li>
                <li className="border-b border-border pb-3">Weekly project review</li>
                <li className="border-b border-border pb-3">Permanent recordings</li>
                <li className="border-b border-border pb-3">Private cohort group</li>
              </ul>
              <p className="mt-8 text-sm text-muted-foreground">
                Limited seats. Application only.
              </p>
            </div>
            <ApplicationForm />
          </div>
        </section>

        <Divider />

        {/* FAQ */}
        <Section title="Questions">
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left font-serif text-lg">{q}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Placeholder Studio Ltd.</span>
          <nav className="flex gap-6">
            <a href="mailto:hello@placeholder.com" className="hover:text-foreground">
              hello@placeholder.com
            </a>
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function Divider() {
  return <div className="mx-auto max-w-5xl px-6"><hr className="border-border" /></div>;
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-muted-foreground">{subtitle}</p> : null}
      <div className="mt-12">{children}</div>
    </section>
  );
}
