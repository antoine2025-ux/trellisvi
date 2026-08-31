export type VideoLead = {
  name: string;
  email: string;
};

const STORAGE_KEY = "trellis-intro-video-lead";
const LEGACY_KEY = "trellis-intro-video-email";
const LEAD_EVENT = "trellis-video-lead";

function asLead(value: unknown): VideoLead | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const name = typeof record["name"] === "string" ? record["name"].trim() : "";
  const email = typeof record["email"] === "string" ? record["email"].trim() : "";
  if (!email) return null;
  return { name, email };
}

export function readVideoLead(): VideoLead | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = asLead(JSON.parse(raw) as unknown);
      if (parsed) return parsed;
    }

    const legacy = sessionStorage.getItem(LEGACY_KEY)?.trim() ?? "";
    if (legacy.includes("@")) return { name: "", email: legacy };
  } catch {
    // Private browsing can block storage.
  }
  return null;
}

export function writeVideoLead(lead: VideoLead) {
  const next: VideoLead = { name: lead.name.trim(), email: lead.email.trim() };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    sessionStorage.removeItem(LEGACY_KEY);
  } catch {
    // Ignore storage failures; the current visit still works.
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<VideoLead>(LEAD_EVENT, { detail: next }));
  }
}

export function subscribeVideoLead(listener: (lead: VideoLead) => void) {
  if (typeof window === "undefined") return () => undefined;

  const onLead = (event: Event) => {
    const detail = (event as CustomEvent<VideoLead>).detail;
    if (detail?.email) listener(detail);
  };
  window.addEventListener(LEAD_EVENT, onLead);
  return () => window.removeEventListener(LEAD_EVENT, onLead);
}

export function hasVideoLeadContact(lead: VideoLead | null): lead is VideoLead {
  return Boolean(lead && lead.name.trim() && lead.email.trim());
}
