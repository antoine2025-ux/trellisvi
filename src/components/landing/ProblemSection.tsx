import { problem } from "@/content/landing";
import { Reveal } from "@/components/Reveal";
import { SectionHeader, Slab } from "./primitives";

export function ProblemSection() {
  return (
    <Slab id="problem" className="py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <SectionHeader index="01" label="The problem" title={problem.title} lede={problem.lede} />
        <ol className="failure-list">
          {problem.failures.map((failure, i) => (
            <li key={failure.label} className="failure-card">
              <p className="failure-label">
                <span className="failure-code">ERR {String(i + 1).padStart(2, "0")}</span>
                {failure.label}
              </p>
              <p className="failure-symptom">{failure.symptom}</p>
            </li>
          ))}
        </ol>
      </div>

      <Reveal>
        <figure className="problem-quote">
          <span className="problem-quote-rule" aria-hidden="true" />
          <blockquote>
            <p>{problem.quoteLead}</p>
            <p className="problem-quote-tail">{problem.quoteTail}</p>
          </blockquote>
        </figure>
      </Reveal>
    </Slab>
  );
}
