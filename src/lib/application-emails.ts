import {
  qualifyApplication,
  unqualifiedReasons,
  type Application,
  type ApplicationLane,
} from "@/lib/application";

const SITE = "https://www.trellistudio.tech";
const BOOKING_URL = "https://calendly.com/antoine-powerintel/trellis-vi-onboarding";
const INBOX = "trellis@powerintel.co";

const CREAM = "#F7F1E8";
const CARD = "#FFFFFF";
const INK = "#2A3354";
const BROWN = "#8B5A3C";
const MUTED = "#6A7084";
const BORDER = "#E6D9CC";
const SERIF = "'Libre Baskerville', Georgia, 'Times New Roman', serif";
const SANS = "'IBM Plex Sans', Arial, Helvetica, sans-serif";

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type ApplicantEmail = {
  subject: string;
  text: string;
  html: string;
};

function emailShell(inner: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Trellis VI</title>
</head>
<body style="margin:0;padding:0;background:${CREAM};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:${CARD};border:1px solid ${BORDER};border-radius:36px;">
          <tr>
            <td style="padding:40px 36px 44px;font-family:${SANS};color:${INK};">
              ${inner}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function heading(text: string) {
  return `<h1 style="margin:0 0 20px;font-family:${SERIF};font-size:30px;line-height:1.2;font-weight:700;color:${INK};">${escapeHtml(text)}</h1>`;
}

function strongP(text: string) {
  return `<p style="margin:0 0 16px;font-family:${SANS};font-size:16px;line-height:1.55;font-weight:700;color:${INK};">${escapeHtml(text)}</p>`;
}

function mutedP(html: string) {
  return `<p style="margin:0 0 16px;font-family:${SANS};font-size:16px;line-height:1.55;font-weight:400;color:${MUTED};">${html}</p>`;
}

function kicker() {
  return `<p style="margin:0 0 6px;font-family:${SERIF};font-size:22px;line-height:1.3;font-weight:700;color:${INK};">Apply for the next cohort</p>
<p style="margin:0 0 28px;font-family:${SANS};font-size:14px;line-height:1.4;color:${MUTED};">Limited seats. Application only.</p>`;
}

function actions(primaryLabel: string, primaryHref: string, secondaryLabel: string, secondaryHref: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
  <tr>
    <td>
      <a href="${escapeHtml(primaryHref)}" style="display:inline-block;background:${BROWN};color:#ffffff;font-family:${SANS};font-size:16px;font-weight:600;line-height:1;text-decoration:none;padding:16px 28px;border-radius:999px;">${escapeHtml(primaryLabel)}</a>
    </td>
    <td style="padding-left:24px;">
      <a href="${escapeHtml(secondaryHref)}" style="font-family:${SERIF};font-size:18px;font-style:italic;color:${BROWN};text-decoration:none;">${escapeHtml(secondaryLabel)}</a>
    </td>
  </tr>
</table>`;
}

export function applicantEmailFor(
  data: Application,
  lane: ApplicationLane = qualifyApplication(data),
): ApplicantEmail {
  const first = firstName(data.name);

  if (lane === "red") {
    const reasons = unqualifiedReasons(data);
    const why: string[] = [];
    if (reasons.time) {
      why.push(
        "Trellis VI requires 10–15 hours of focused building each week. We want to make sure you have the bandwidth to get the maximum value out of the cohort before you jump in.",
      );
    }
    if (reasons.budget) {
      why.push(
        "At $2,499, Trellis VI is a significant investment. We only want you joining when the timing and budget align perfectly, so you can focus entirely on the build rather than the cost.",
      );
    }

    const html = emailShell(`
      ${kicker()}
      ${heading("The live cohort isn't the right fit right now")}
      ${strongP("Based on your answers, we don't think this is the moment to join. That is not a judgment of you. It is how we keep the cohort small and workable.")}
      ${why.map((line) => strongP(line)).join("")}
      ${mutedP("You can still master the basics using our free resources, then apply again when the time and investment line up.")}
      ${mutedP(`If you still would really like to participate in the course and would like to discuss your situation so we can find a solution, send an email to <a href="mailto:${INBOX}" style="color:${BROWN};font-weight:700;text-decoration:none;">${INBOX}</a>.`)}
      ${actions("Browse free resources", `${SITE}/resources`, "Read the blog", `${SITE}/blog`)}
    `);

    return {
      subject: "Trellis VI: not the right fit right now",
      text: [
        `Hi ${first},`,
        "",
        "The live cohort isn't the right fit right now. That is not a judgment of you. It is how we keep the cohort small and workable.",
        "",
        ...why.flatMap((line) => [line, ""]),
        "You can still master the basics using our free resources, then apply again when the time and investment line up:",
        `${SITE}/resources`,
        "",
        `If you still would really like to participate in the course and would like to discuss your situation so we can find a solution, send an email to ${INBOX}.`,
        "",
        "Antoine",
        "Trellis VI",
      ].join("\n"),
      html,
    };
  }

  if (lane === "green") {
    const html = emailShell(`
      ${kicker()}
      ${heading("You look like a great fit")}
      ${strongP("Based on your application, you look like a great fit for the next Trellis VI cohort.")}
      ${mutedP("Book your onboarding call below. Once you pick a time, Calendly will send you a separate email with the meeting details.")}
      ${actions("Book your onboarding call", BOOKING_URL, "Read the blog", `${SITE}/blog`)}
    `);

    return {
      subject: "You're a fit for Trellis VI. Book your onboarding call.",
      text: [
        `Hi ${first},`,
        "",
        "Based on your application, you look like a great fit for the next Trellis VI cohort.",
        "",
        "Book your onboarding call on the calendar you just saw. Once you pick a time, Calendly will send you a separate email with the meeting details. Watch for that one. We will not send a second copy of the booking from this address.",
        "",
        "If you closed the page, you can book here:",
        BOOKING_URL,
        "",
        `Questions? ${INBOX}`,
        "",
        "Antoine",
        "Trellis VI",
      ].join("\n"),
      html,
    };
  }

  const html = emailShell(`
    ${kicker()}
    ${heading("Thanks for applying")}
    ${strongP("Our team is reviewing your application to ensure this cohort is the right fit. We'll email you within 24 hours.")}
    ${mutedP(`Questions in the meantime? <a href="mailto:${INBOX}" style="color:${BROWN};font-weight:700;text-decoration:none;">${INBOX}</a>`)}
  `);

  return {
    subject: "We received your Trellis VI application",
    text: [
      `Hi ${first},`,
      "",
      "Thanks for applying. Our team is reviewing your application to ensure this cohort is the right fit. We'll email you within 24 hours.",
      "",
      `Questions in the meantime? ${INBOX}`,
      "",
      "Antoine",
      "Trellis VI",
    ].join("\n"),
    html,
  };
}

export function applicantEventName(lane: ApplicationLane) {
  if (lane === "red") return "application.rejected";
  if (lane === "green") return "application.approved";
  return "application.submitted";
}
