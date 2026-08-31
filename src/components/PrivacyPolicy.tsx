import { openLegalDialog } from "@/lib/open-legal-dialog";

export function PrivacyPolicy() {
  return (
    <dialog id="privacy-dialog" className="legal-dialog">
      <form method="dialog">
        <button type="submit" className="legal-dialog-close" aria-label="Close privacy policy">
          Close
        </button>
      </form>
      <header className="legal-dialog-header">
        <h2 id="privacy-title" className="legal-dialog-title">
          Privacy policy
        </h2>
        <p className="legal-dialog-date">Last updated 31 August 2026</p>
      </header>
      <div className="legal-dialog-body">
        <p>
          This policy explains how PowerIntel, the trading name of ACMPOWER OÜ
          (“we”, “us”), handles personal information when you visit the Trellis
          VI site, watch the introduction video, apply for a cohort, or take
          the eight-week course.
        </p>

        <h3>Who we are</h3>
        <p>
          Trellis VI is an application-only course in AI-assisted development.
          We are the data controller for information collected through this
          site. Questions go to{" "}
          <a href="mailto:trellis@powerintel.co">trellis@powerintel.co</a>.
        </p>

        <h3>What we collect</h3>
        <p>We only ask for what we need to run the course:</p>
        <ul>
          <li>
            <strong>Application details.</strong> Name, email, what you are trying to
            build, whether you have built with AI before, whether you can commit 10 to
            15 hours a week, and whether you can invest in the course now.
          </li>
          <li>
            <strong>Video access.</strong> If you play the introduction video, we
            ask for your name and email so we can unlock it and, if you apply later,
            fill in those details for you.
          </li>
          <li>
            <strong>Course communications.</strong> If you are accepted, we use
            your contact details to send session links, recordings, project
            feedback, and access to the private cohort group.
          </li>
          <li>
            <strong>Payment information.</strong> If you take a paid seat,
            card details are handled by our payment provider. We do not store
            full card numbers on this site.
          </li>
          <li>
            <strong>Technical data.</strong> Standard server and browser data
            such as IP address, device type, and pages visited, used to keep
            the site working and secure.
          </li>
        </ul>

        <h3>Why we use it</h3>
        <p>We use this information to:</p>
        <ul>
          <li>review applications and decide who we can support in a 20-seat cohort</li>
          <li>tell you whether you have a place, and arrange payment if you do</li>
          <li>deliver the eight live sessions, weekly review, and recordings</li>
          <li>give you access to the private community group for the life of that group</li>
          <li>provide included extras such as a Claude Max period, where offered</li>
          <li>reply to questions sent to trellis@powerintel.co</li>
          <li>improve the site and protect it from abuse</li>
        </ul>
        <p>
          We process this because you asked us to consider your application or
          to provide the course, because we have a legitimate interest in
          running a small paid cohort safely, or because the law requires it
          (for example, invoices and accounting).
        </p>

        <h3>Who we share it with</h3>
        <p>
          We do not sell your information. We share it only with people who
          help us run Trellis VI: hosting, email, payment, and the tools we
          use for live sessions, recordings, and the cohort group. Those
          providers only get what they need to do that job.
        </p>
        <p>
          Other students in your cohort will see your name and what you share
          in sessions, reviews, and the group. Live sessions are recorded so
          the cohort has lifetime access to them. Do not put secrets in the
          group or on a recording that you would not want other members to
          see.
        </p>

        <h3>How long we keep it</h3>
        <p>
          Unsuccessful applications are kept long enough to finish selection
          and answer follow-up questions, then deleted or reduced to a short
          record if we still need it for accounting or disputes. If you join a
          cohort, we keep the details needed to teach you, give you recordings
          and community access, and meet our legal duties. You can ask us to
          delete what we no longer need.
        </p>

        <h3>Your rights</h3>
        <p>
          If you are in the EU/EEA or UK, you can ask us for a copy of your
          data, a correction, deletion, a limit on how we use it, or to move
          it elsewhere. You can object to some processing. You can also
          complain to your local data protection authority. To use these
          rights, email{" "}
          <a href="mailto:trellis@powerintel.co">trellis@powerintel.co</a>.
        </p>

        <h3>Cookies and local storage</h3>
        <p>
          This site uses only what it needs to function. After you enter a
          name and email to watch the introduction, we may store a short note
          in your browser so you are not asked again in the same visit, and so
          the application form can reuse those details. We do not use
          advertising cookies.
        </p>

        <h3>Where it is stored</h3>
        <p>
          ACMPOWER OÜ is established in Estonia. Some tools we use may store
          data in the EU or in other countries with a lawful transfer
          mechanism. If that matters for your situation, ask us and we will
          tell you which tools are involved.
        </p>

        <h3>Changes</h3>
        <p>
          If we change this policy, we will update the date at the top. The
          current version will always be available from this page.
        </p>
      </div>
    </dialog>
  );
}

export function openPrivacyPolicy() {
  openLegalDialog("privacy-dialog");
}
