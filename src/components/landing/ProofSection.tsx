import { Reveal } from "@/components/Reveal";
import { featuredTestimonial, testimonials, type Testimonial } from "@/content/landing";
import { Pill, SectionHeader, Slab } from "./primitives";

function Attribution({ t }: { t: Testimonial }) {
  const initials = t.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .replace(/\./g, "");

  return (
    <footer className="quote-attribution">
      <span className="quote-avatar" aria-hidden="true">
        {initials}
      </span>
      <span className="min-w-0">
        <span className="quote-name">{t.name}</span>
        <span className="quote-role">{t.role}</span>
      </span>
    </footer>
  );
}

export function ProofSection() {
  return (
    <Slab id="proof" className="py-24 sm:py-32">
      <SectionHeader
        index="07"
        label="Proof"
        title="From prototypes that looked good to software that runs."
        lede="People who already used AI every day, and hit the same wall."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Reveal className="h-full">
          <figure className="quote-featured">
            <Pill tone="outline" className="quote-tag">
              {featuredTestimonial.tag}
            </Pill>
            <blockquote>
              <p>“{featuredTestimonial.quote}”</p>
            </blockquote>
            <Attribution t={featuredTestimonial} />
          </figure>
        </Reveal>

        <div className="flex flex-col gap-6">
          {testimonials.map((t) => (
            <Reveal key={t.name}>
              <figure className="quote-card">
                <Pill tone="soft" className="quote-tag">
                  {t.tag}
                </Pill>
                <blockquote>
                  <p>“{t.quote}”</p>
                </blockquote>
                <Attribution t={t} />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Slab>
  );
}
