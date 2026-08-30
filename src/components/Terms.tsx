import { openLegalDialog } from "@/lib/open-legal-dialog";

export function openTerms() {
  openLegalDialog("terms-dialog");
}

export function Terms() {
  return (
    <dialog id="terms-dialog" className="legal-dialog">
      <form method="dialog">
        <button type="submit" className="legal-dialog-close" aria-label="Close terms">
          Close
        </button>
      </form>
      <header className="legal-dialog-header">
        <h2 id="terms-title" className="legal-dialog-title">
          Terms
        </h2>
        <p className="legal-dialog-date">Last updated 30 August 2026</p>
      </header>
      <div className="legal-dialog-body">
        <p>
          These terms govern your use of this site and your place on Trellis VI,
          the eight-week AI-assisted development course run by PowerIntel, the
          trading name of ACMPOWER OÜ (“we”, “us”). By applying, paying, or
          joining a cohort, you agree to them. Questions go to{" "}
          <a href="mailto:trellis@powerintel.co">trellis@powerintel.co</a>.
        </p>

        <h3>The course</h3>
        <p>
          Trellis VI is an application-only cohort. A seat includes eight live
          sessions, weekly project review, permanent recordings, the private
          cohort group, and any extras listed on this page at the time you are
          accepted. We may adjust session dates, tools, or teaching order when
          that helps the cohort. The substance of what we promised will still
          be delivered.
        </p>

        <h3>Application and acceptance</h3>
        <p>
          Applying does not guarantee a place. We review every application and
          accept only students we believe we can support in a cohort of up to
          20. We may refuse or withdraw an offer if the information you gave us
          was incomplete or untrue, or if we cannot reasonably teach you in
          that intake.
        </p>

        <h3>Your responsibilities</h3>
        <p>
          You are responsible for bringing a working Claude and Cursor setup,
          a computer you can build on, and the time the course asks for —
          typically 10 to 15 hours a week. You keep the rights to the software
          you build. You also keep the duty to do the work, attend the required
          sessions, and treat other members of the cohort with ordinary
          professional respect.
        </p>

        <h3>Payment and installments</h3>
        <p>
          Full payment is required before you gain access to the course
          materials or begin the cohort. We do offer a zero-interest, three-part
          installment plan, which is granted on a case-by-case basis at our
          sole discretion. If you are approved for a payment plan, all
          scheduled payments must be met on time to maintain your access to
          the program.
        </p>

        <h3>The Checkpoint refund guarantee</h3>
        <p>
          Refunds are not granted because you changed your mind or got too
          busy. To be eligible for a refund under our guarantee, you must hit
          the Week 4 Checkpoint. This means you must explicitly prove you have
          completed all assigned coursework, attended the required sessions,
          and built the foundational systems up to that point. If you do the
          work and still do not possess the promised artifacts, you are
          eligible for the refund.
        </p>
        <p>
          The promised artifacts are the three outcomes named in The Guarantee
          on this site: a live system with an architectural blueprint, the
          ability to work around the limits of AI coding tools using Trellis
          VI, and a packaged, priced offer with a defined client and a way to
          close them.
        </p>

        <h3>Third-party cost exclusions</h3>
        <p>
          If you are deemed eligible for a refund under the Week 4 Checkpoint
          guarantee, the final amount returned to you will exclude any hard
          costs we have already incurred to purchase external software licenses
          or subscriptions on your behalf (such as a Claude Max subscription).
          You will retain ownership and access to those third-party tools for
          the duration of their purchased terms.
        </p>

        <h3>Intellectual property</h3>
        <p>
          The Trellis VI method, recordings, written materials, and site copy
          belong to us. You may use them for your own learning and for the
          work you ship during and after the course. You may not resell,
          republish, or teach the course materials as your own. What you build
          remains yours.
        </p>

        <h3>Recordings and the community group</h3>
        <p>
          Live sessions are recorded and shared with the cohort. Other
          students will see your name and whatever you choose to show in
          sessions, reviews, and the group. Lifetime access to the community
          group means access for as long as we keep that group running. We may
          remove someone who disrupts the cohort or misuses the materials.
        </p>

        <h3>Liability</h3>
        <p>
          We teach a method. We do not guarantee you a client, a salary, or a
          particular commercial result. To the extent the law allows, our
          liability for a paid seat is limited to the fees you paid us for
          that seat, minus any third-party costs already spent on your behalf
          as described above. We are not responsible for outages or policy
          changes at tools we do not control, including Claude, Cursor, and
          hosting providers.
        </p>

        <h3>Changes</h3>
        <p>
          If we change these terms, we will update the date at the top. The
          version that applied when you paid for your seat is the one that
          governs that cohort, unless a change is required by law.
        </p>

        <h3>Governing law</h3>
        <p>
          These terms are governed by the laws of Estonia. If a dispute cannot
          be resolved by writing to{" "}
          <a href="mailto:trellis@powerintel.co">trellis@powerintel.co</a>, the
          courts of Estonia have jurisdiction.
        </p>
      </div>
    </dialog>
  );
}
