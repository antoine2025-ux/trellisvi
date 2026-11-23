"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Play } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { captureVideoLead } from "@/lib/capture-video-lead";
import { openLegalDialog } from "@/lib/open-legal-dialog";
import { loadStreamApi, type StreamPlayer } from "@/lib/stream-api";
import { trackEvent } from "@/lib/track";
import { readVideoLead, writeVideoLead } from "@/lib/video-lead";

const STREAM_CUSTOMER_CODE = "n4cgp5b2m1lc9wi1";
const STREAM_VIDEO_ID = "59aa2f45504b2ec8c6bcd4f6d6f7bd02";
const STREAM_POSTER_TIME = "10s";

export const STREAM_ORIGIN = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com`;
const STREAM_EMBED = `${STREAM_ORIGIN}/${STREAM_VIDEO_ID}`;
export const STREAM_POSTER = `${STREAM_EMBED}/thumbnails/thumbnail.jpg?time=${STREAM_POSTER_TIME}&height=720`;
export const STREAM_IFRAME = `${STREAM_EMBED}/iframe`;
const STREAM_ALLOW = "accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;";

const PROGRESS_MARKS = [25, 50, 75];

export type VideoRevealReason = "pitch" | "ended";

function streamSrc(autoplay: boolean) {
  const params = new URLSearchParams({
    poster: STREAM_POSTER,
    defaultTextTrack: "en",
  });
  if (autoplay) params.set("autoplay", "true");
  return `${STREAM_IFRAME}?${params.toString()}`;
}

export function GatedVideo({
  onReveal,
  pitchAtSeconds = null,
}: {
  onReveal?: (reason: VideoRevealReason) => void;
  pitchAtSeconds?: number | null;
}) {
  const captureLead = useServerFn(captureVideoLead);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<StreamPlayer | null>(null);
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;
  const [unlocked, setUnlocked] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [asking, setAsking] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const lead = readVideoLead();
    if (lead?.email) {
      setName(lead.name);
      setEmail(lead.email);
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!unlocked) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;
    let pitchFired = false;
    let started = false;
    const marksHit = new Set<number>();

    const onPlay = () => {
      if (started) return;
      started = true;
      trackEvent("video_play");
    };

    const onTimeUpdate = () => {
      const player = playerRef.current;
      if (!player) return;
      const { currentTime, duration } = player;
      if (!pitchFired && pitchAtSeconds !== null && currentTime >= pitchAtSeconds) {
        pitchFired = true;
        onRevealRef.current?.("pitch");
      }
      if (!duration) return;
      const percent = (currentTime / duration) * 100;
      for (const mark of PROGRESS_MARKS) {
        if (percent >= mark && !marksHit.has(mark)) {
          marksHit.add(mark);
          trackEvent(`video_progress_${mark}`);
        }
      }
    };

    const onEnded = () => {
      trackEvent("video_progress_100");
      onRevealRef.current?.("ended");
    };

    loadStreamApi()
      .then((Stream) => {
        if (cancelled || iframeRef.current !== iframe) return;

        const player = Stream(iframe);
        player.addEventListener("play", onPlay);
        player.addEventListener("timeupdate", onTimeUpdate);
        player.addEventListener("ended", onEnded);
        playerRef.current = player;
      })
      .catch(() => {
        // The iframe still plays if the SDK fails to load.
      });

    return () => {
      cancelled = true;
      const player = playerRef.current;
      if (!player) return;
      player.removeEventListener("play", onPlay);
      player.removeEventListener("timeupdate", onTimeUpdate);
      player.removeEventListener("ended", onEnded);
      player.destroy();
      playerRef.current = null;
    };
  }, [unlocked, autoplay, pitchAtSeconds]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextName = name.trim();
    const nextEmail = email.trim();
    const nameField = e.currentTarget.elements.namedItem("video-name");
    const emailField = e.currentTarget.elements.namedItem("video-email");
    if (!(nameField instanceof HTMLInputElement) || !(emailField instanceof HTMLInputElement)) {
      return;
    }

    if (!nextName) {
      nameField.reportValidity();
      return;
    }
    if (!nextEmail || !emailField.checkValidity()) {
      emailField.reportValidity();
      return;
    }

    const companyField = e.currentTarget.elements.namedItem("company");
    const company = companyField instanceof HTMLInputElement ? companyField.value : "";
    const stored = readVideoLead();
    writeVideoLead({ name: nextName, email: nextEmail });
    if (stored?.email.toLowerCase() !== nextEmail.toLowerCase()) {
      trackEvent("video_gate_submit");
      void captureLead({ data: { name: nextName, email: nextEmail, company } }).catch((error) => {
        console.error("Video lead capture failed", error);
      });
    }
    setAutoplay(true);
    setUnlocked(true);
    setAsking(false);
  }

  return (
    <div className="gated-video aspect-video w-full overflow-hidden">
      {unlocked ? (
        <iframe
          ref={iframeRef}
          className="h-full w-full"
          src={streamSrc(autoplay)}
          title="Trellis VI introduction video"
          allow={STREAM_ALLOW}
          allowFullScreen
        />
      ) : (
        <div className="gated-video-stage">
          <img
            src={STREAM_POSTER}
            alt=""
            className="gated-video-poster"
            fetchPriority="high"
            decoding="async"
          />
          <div className="gated-video-scrim" aria-hidden="true" />
          {asking ? (
            <form className="gated-video-form" onSubmit={onSubmit}>
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
                defaultValue=""
              />
              <p className="gated-video-form-title">Watch the 12-minute introduction</p>
              <p className="-mt-1 text-sm leading-snug text-muted-foreground">
                Enter your name and email to unlock it.
              </p>
              <div className="space-y-2">
                <Label htmlFor="video-name">
                  Full name
                  <span className="text-brown" aria-hidden="true">
                    {" "}
                    *
                  </span>
                </Label>
                <Input
                  id="video-name"
                  name="video-name"
                  required
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video-email">
                  Email
                  <span className="text-brown" aria-hidden="true">
                    {" "}
                    *
                  </span>
                </Label>
                <Input
                  id="video-email"
                  name="video-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We'll email you about Trellis VI. Unsubscribe any time.{" "}
                <a
                  href="#privacy-dialog"
                  className="underline underline-offset-2 hover:text-foreground"
                  onClick={(event) => {
                    event.preventDefault();
                    openLegalDialog("privacy-dialog");
                  }}
                >
                  Privacy policy
                </a>
              </p>
              <Button type="submit" size="lg" className="w-full rounded-full">
                Play video
              </Button>
            </form>
          ) : (
            <button
              type="button"
              className="gated-video-play"
              onClick={() => setAsking(true)}
              aria-label="Play the introduction video"
            >
              <span className="gated-video-button" aria-hidden="true">
                <Play className="gated-video-icon" />
              </span>
              <span className="gated-video-badge" aria-hidden="true">
                Watch the introduction · 12 min
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
