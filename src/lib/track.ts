import { track } from "@vercel/analytics";

type EventProps = Record<string, string | number | boolean | null>;

export function trackEvent(name: string, props?: EventProps) {
  try {
    track(name, props);
  } catch {
    // Analytics must never break the funnel.
  }
}
