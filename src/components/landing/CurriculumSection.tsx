import { ChevronDown } from "lucide-react";
import {
  phases,
  SESSION_KIND_LABELS,
  weekByNumber,
  type CurriculumWeek,
} from "@/content/curriculum";
import { Pill, SectionHeader, Slab } from "./primitives";

const rhythm: [string, string][] = [
  ["~1 h", "Video lessons, text first"],
  ["90 min", "Live session every week"],
  ["45–60 min", "Build clinic from week 2"],
  ["1 task", "Submitted as a repo link"],
];

function WeekCard({ week }: { week: CurriculumWeek }) {
  const hasDetail = Boolean(week.sessions?.length || week.highlights?.length);

  return (
    <details className="week-card" open={week.n === 1}>
      <summary className="week-summary">
        <span className="week-tile">{week.n}</span>
        <span className="min-w-0 flex-1">
          <span className="week-title">
            Week {week.n}: {week.title}
          </span>
          <span className="week-outcome">{week.outcome}</span>
        </span>
        {hasDetail ? <ChevronDown className="week-chevron" aria-hidden="true" /> : null}
      </summary>
      <div className="week-body">
        <p className="week-goal">{week.goal}</p>
        {week.sessions ? (
          <ol className="session-list">
            {week.sessions.map((session, i) => (
              <li key={session.title} className="session-row">
                <span className="session-num">{i + 1}</span>
                <span className="session-title">{session.title}</span>
                <span className={`session-kind session-kind--${session.kind}`}>
                  {SESSION_KIND_LABELS[session.kind]}
                </span>
              </li>
            ))}
          </ol>
        ) : null}
        {week.highlights ? (
          <ul className="week-highlights">
            {week.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        <p className="week-live">
          <span className="week-live-label">Live</span>
          {week.live}
        </p>
        {week.business ? (
          <p className="week-business">
            <Pill tone="brown">Optional</Pill>
            {week.business}
          </p>
        ) : null}
      </div>
    </details>
  );
}

export function CurriculumSection() {
  return (
    <Slab id="curriculum" className="py-24 sm:py-32">
      <SectionHeader
        index="05"
        label="The eight weeks"
        title="You build real software twice."
        lede="Once from a spec designed to break undisciplined builds, graded at the checkpoint. Then again on your own idea, deployed. The second build is where the method sticks."
      />

      <ul className="rhythm-strip mt-12">
        {rhythm.map(([value, label]) => (
          <li key={value}>
            <span className="rhythm-value">{value}</span>
            <span className="rhythm-label">{label}</span>
          </li>
        ))}
      </ul>

      <ol className="phase-list mt-14">
        {phases.map((phase) => (
          <li key={phase.title} className="phase">
            <div className="phase-head">
              <p className="eyebrow">{phase.label}</p>
              <h3 className="phase-title">{phase.title}</h3>
              <p className="phase-summary">{phase.summary}</p>
            </div>
            <div className="phase-weeks">
              {phase.weeks.map((n) => {
                const week = weekByNumber(n);
                return week ? <WeekCard key={n} week={week} /> : null;
              })}
            </div>
          </li>
        ))}
      </ol>
    </Slab>
  );
}
