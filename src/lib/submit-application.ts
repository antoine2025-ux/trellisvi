import { createServerFn } from "@tanstack/react-start";
import {
  applicationSchema,
  applicationToEmailText,
  qualifyApplication,
} from "@/lib/application";
import { applicantEmailFor, applicantEventName } from "@/lib/application-emails";

const FROM = "Trellis VI <trellis@powerintel.co>";
const INBOX = "trellis@powerintel.co";

async function resendRequest(
  apiKey: string,
  path: string,
  payload: Record<string, unknown>,
) {
  const response = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail);
  }
}

export const submitApplication = createServerFn({ method: "POST" })
  .validator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("APPLICATION_SEND_FAILED");
    }

    const lane = qualifyApplication(data);
    const applicant = applicantEmailFor(data, lane);
    const first = data.name.trim().split(/\s+/)[0] || "there";

    try {
      await resendRequest(apiKey, "/emails", {
        from: FROM,
        to: [INBOX],
        reply_to: data.email,
        subject: `Trellis VI application [${lane.toUpperCase()}] — ${data.name}`,
        text: applicationToEmailText(data, lane),
      });
    } catch (error) {
      console.error("Resend rejected the application email", error);
      throw new Error("APPLICATION_SEND_FAILED");
    }

    try {
      await resendRequest(apiKey, "/emails", {
        from: FROM,
        to: [data.email],
        reply_to: INBOX,
        subject: applicant.subject,
        text: applicant.text,
      });
    } catch (error) {
      console.error("Resend rejected the applicant outcome email", error);
      throw new Error("APPLICATION_SEND_FAILED");
    }

    try {
      await resendRequest(apiKey, "/events/send", {
        event: applicantEventName(lane),
        email: data.email,
        payload: { name: first, lane },
      });
    } catch (error) {
      console.error("Resend rejected the application outcome event", error);
    }

    return { ok: true as const };
  });
