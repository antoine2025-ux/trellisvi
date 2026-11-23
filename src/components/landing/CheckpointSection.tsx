import { rubric } from "@/content/landing";
import { SectionHeader, Slab } from "./primitives";

export function CheckpointSection() {
  return (
    <Slab id="guarantee" tone="ink" className="py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <SectionHeader
            index="09"
            label="The guarantee"
            onInk
            title="The Week 4 checkpoint guarantee."
            lede="This is run like an engineering environment, not a video course. At the end of week 3 you submit your guided project. In week 4 it is graded from the repo and the live URL, and you walk through the grade one to one."
          />
          <blockquote className="checkpoint-quote">
            “Graded from the repo, so the grade can be checked by anyone, including you.”
          </blockquote>
        </div>

        <div>
          <p className="eyebrow eyebrow--on-ink">The rubric</p>
          <ol className="rubric">
            {rubric.map((row, i) => (
              <li key={row.column} className="rubric-row">
                <span className="rubric-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="rubric-column">
                    {row.column}
                    <span className="rubric-scoring">{row.scoring}</span>
                  </p>
                  <p className="rubric-checks">{row.checks}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="checkpoint-promise">
        <p className="checkpoint-promise-title">
          The promise <span>(or your money back)</span>
        </p>
        <p className="checkpoint-promise-body">
          Do the work, complete the assignments, and submit your guided project by the checkpoint.
          If you don't believe the method will get your own build to production by week 8, we refund
          your investment in full.
        </p>
      </div>
    </Slab>
  );
}
