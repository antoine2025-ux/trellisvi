// Stream Player API:
// https://developers.cloudflare.com/stream/viewing-videos/using-the-stream-player/using-the-player-api/
const SDK_SRC = "https://embed.cloudflarestream.com/embed/sdk.latest.js";

export type StreamPlayer = {
  addEventListener: (event: string, handler: EventListener) => void;
  removeEventListener: (event: string, handler: EventListener) => void;
  destroy: () => void;
  currentTime: number;
  duration: number;
};

type StreamApi = (iframe: HTMLIFrameElement) => StreamPlayer;

declare global {
  interface Window {
    Stream?: StreamApi;
  }
}

let apiPromise: Promise<StreamApi> | null = null;

export function loadStreamApi() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Stream API is browser-only"));
  }
  if (typeof window.Stream === "function") return Promise.resolve(window.Stream);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve, reject) => {
    const finish = () => {
      if (typeof window.Stream === "function") {
        resolve(window.Stream);
        return;
      }
      apiPromise = null;
      reject(new Error("Stream SDK loaded without the Stream constructor"));
    };

    const fail = () => {
      apiPromise = null;
      reject(new Error("Stream SDK failed to load"));
    };

    const existing = document.querySelector(`script[src="${SDK_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener("error", fail, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = SDK_SRC;
    script.addEventListener("load", finish, { once: true });
    script.addEventListener("error", fail, { once: true });
    document.head.appendChild(script);
  });

  return apiPromise;
}
