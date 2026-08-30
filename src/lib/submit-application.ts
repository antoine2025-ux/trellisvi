import { createServerFn } from "@tanstack/react-start";
import { applicationSchema, applicationToEmailText } from "@/lib/application";

const FROM = "Trellis VI <trellis@powerintel.co>";
const TO = "trellis@powerintel.co";

export const submitApplication = createServerFn({ method: "POST" })
  .validator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("APPLICATION_SEND_FAILED");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: data.email,
        subject: `Trellis VI application — ${data.name}`,
        text: applicationToEmailText(data),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the application email", response.status, detail);
      throw new Error("APPLICATION_SEND_FAILED");
    }

    return { ok: true as const };
  });
