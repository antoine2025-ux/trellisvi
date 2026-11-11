import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ResendRequestError, resendRequest } from "@/lib/resend";

const videoLeadSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
});

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

function isExistingContact(error: unknown) {
  if (!(error instanceof ResendRequestError)) return false;
  if (error.status === 409) return true;
  return error.status === 422 && /already exists/i.test(error.message);
}

export const captureVideoLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => videoLeadSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return { ok: true as const };
    }

    const first = firstName(data.name);

    try {
      await resendRequest(apiKey, "/contacts", {
        email: data.email,
        first_name: first,
      });
    } catch (error) {
      if (!isExistingContact(error)) {
        console.error("Resend rejected the video lead contact", error);
      } else {
        try {
          await resendRequest(
            apiKey,
            `/contacts/${encodeURIComponent(data.email)}`,
            { first_name: first },
            "PATCH",
          );
        } catch (updateError) {
          console.error("Resend rejected the video lead contact update", updateError);
        }
      }
    }

    try {
      await resendRequest(apiKey, "/events/send", {
        event: "video.lead",
        email: data.email,
        payload: { name: data.name },
      });
    } catch (error) {
      console.error("Resend rejected the video lead event", error);
    }

    return { ok: true as const };
  });
