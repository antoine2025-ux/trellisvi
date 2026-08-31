import {
  qualifyApplication,
  unqualifiedReasons,
  type Application,
  type ApplicationLane,
} from "@/lib/application";

const SITE = "https://www.trellistudio.tech";
const BOOKING_URL = "https://calendly.com/antoine-powerintel/trellis-vi-onboarding";
const INBOX = "trellis@powerintel.co";

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

export type ApplicantEmail = {
  subject: string;
  text: string;
};

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
    };
  }

  if (lane === "green") {
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
    };
  }

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
  };
}

export function applicantEventName(lane: ApplicationLane) {
  if (lane === "red") return "application.rejected";
  if (lane === "green") return "application.approved";
  return "application.submitted";
}
