import { ArrowUpRight } from "lucide-react";
import instructorPhoto from "@/assets/instructor.jpg";
import { instructor } from "@/content/landing";
import { SectionHeader, Slab } from "./primitives";

export function InstructorSection() {
  return (
    <Slab id="instructor" tone="paper" className="py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <div className="instructor-photo">
            <img
              src={instructorPhoto}
              alt="Antoine Morlet"
              width={728}
              height={1024}
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="mt-5 font-serif text-2xl text-ink">{instructor.name}</p>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">{instructor.title}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {instructor.builtWith.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="built-link"
                >
                  {item.name}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">({item.note}, opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeader
            index="08"
            label="Who teaches it"
            title="Ten years directing builds. Now the agent writes the code."
          />
          <div className="mt-8 max-w-2xl space-y-5 text-[1.075rem] leading-[1.75] text-[var(--text-soft)]">
            {instructor.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <dl className="credential-list mt-10">
            {instructor.credentials.map(([term, detail]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Slab>
  );
}
