import { ApplicationForm } from "@/components/ApplicationForm";
import { cohort, included } from "@/content/landing";
import { APPLY_ID } from "./apply";
import { SectionHeader, Slab } from "./primitives";

export function OfferSection() {
  return (
    <Slab id={APPLY_ID} className="scroll-mt-24 py-24 sm:py-32">
      <SectionHeader
        index="10"
        label={`Apply · ${cohort.name}`}
        title="Ten seats. Every one reviewed by hand."
        lede="Applications are reviewed individually so the cohort stays small enough for every repo to be graded properly."
      />

      <div className="mt-14 grid items-start gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-10">
        <aside className="offer-card" aria-label="What's included">
          <p className="eyebrow">Trellis VI · {cohort.name}</p>
          <p className="offer-price">{cohort.price}</p>
          <p className="offer-price-note">
            One payment, or a zero-interest three-part plan on approval
          </p>

          <ul className="included-list">
            {included.map((item) => (
              <li key={item.title}>
                <span className="included-title">{item.title}</span>
                <span className="included-note">{item.note}</span>
              </li>
            ))}
          </ul>

          <dl className="offer-dates">
            <div>
              <dt>Starts</dt>
              <dd>{cohort.startLong}</dd>
            </div>
            <div>
              <dt>Applications close</dt>
              <dd>{cohort.closeLong}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{cohort.hoursPerWeek}</dd>
            </div>
          </dl>
          <p className="offer-guarantee">Covered by the Week 4 checkpoint guarantee.</p>
        </aside>

        <ApplicationForm />
      </div>
    </Slab>
  );
}
