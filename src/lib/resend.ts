export class ResendRequestError extends Error {
  readonly status: number;

  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ResendRequestError";
    this.status = status;
  }
}

export async function resendRequest(
  apiKey: string,
  path: string,
  payload: Record<string, unknown>,
  method: "POST" | "PATCH" = "POST",
) {
  const response = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new ResendRequestError(response.status, detail);
  }
}
