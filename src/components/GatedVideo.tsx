"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Play } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { captureVideoLead } from "@/lib/capture-video-lead";
import { openLegalDialog } from "@/lib/open-legal-dialog";
import { loadStreamApi, type StreamPlayer } from "@/lib/stream-api";
import { readVideoLead, writeVideoLead } from "@/lib/video-lead";

const STREAM_CUSTOMER_CODE = "n4cgp5b2m1lc9wi1";
const STREAM_VIDEO_ID = "59aa2f45504b2ec8c6bcd4f6d6f7bd02";
const STREAM_POSTER_TIME = "10s";

const STREAM_EMBED = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${STREAM_VIDEO_ID}`;
const STREAM_POSTER = `${STREAM_EMBED}/thumbnails/thumbnail.jpg?time=${STREAM_POSTER_TIME}&height=720`;
const STREAM_ALLOW = "accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;";

function streamSrc(autoplay: boolean) {
  const params = new URLSearchParams({
    poster: STREAM_POSTER,
    defaultTextTrack: "en",
  });
  if (autoplay) params.set("autoplay", "true");
  return `${STREAM_EMBED}/iframe?${params.toString()}`;
}

export function GatedVideo() {
  const captureLead = useServerFn(captureVideoLead);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<StreamPlayer | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [asking, setAsking] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promptOpen, setPromptOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

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

    const onEnded = () => {
      try {
        if (sessionStorage.getItem("trellis-intro-apply-prompted")) return;
        sessionStorage.setItem("trellis-intro-apply-prompted", "1");
      } catch {
        // Still show the prompt if storage is blocked.
      }
      setPromptOpen(true);
      setFormOpen(false);
    };

    loadStreamApi()
      .then((Stream) => {
        if (cancelled || iframeRef.current !== iframe) return;

        const player = Stream(iframe);
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
      player.removeEventListener("ended", onEnded);
      player.destroy();
      playerRef.current = null;
    };
  }, [unlocked, autoplay]);

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
      void captureLead({ data: { name: nextName, email: nextEmail, company } }).catch((error) => {
        console.error("Video lead capture failed", error);
      });
    }
    setAutoplay(true);
    setUnlocked(true);
    setAsking(false);
  }

  function onDialogChange(open: boolean) {
    setPromptOpen(open);
    if (!open) setFormOpen(false);
  }

  return (
    <>
      <div className="gated-video aspect-video w-full overflow-hidden border border-border bg-card">
        {unlocked ? (
          <iframe
            ref={iframeRef}
            className="h-full w-full"
            src={streamSrc(autoplay)}
            title="Introduction video"
            allow={STREAM_ALLOW}
            allowFullScreen
          />
        ) : (
          <div className="gated-video-stage">
            <img src={STREAM_POSTER} alt="" className="gated-video-poster" />
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
                <p className="gated-video-form-title">Enter your name and email to watch</p>
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
              </button>
            )}
          </div>
        )}
      </div>

      <Dialog open={promptOpen} onOpenChange={onDialogChange}>
        <DialogContent
          className={
            formOpen
              ? "max-h-[90vh] overflow-y-auto sm:max-w-xl"
              : "sm:max-w-md"
          }
        >
          {formOpen ? (
            <>
              <DialogHeader>
                <DialogTitle>Apply for the next cohort</DialogTitle>
                <DialogDescription>Limited seats. Application only.</DialogDescription>
              </DialogHeader>
              <ApplicationForm compact />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Ready to apply?</DialogTitle>
                <DialogDescription>
                  You've seen what the program is, what you leave with, and who it is not for.
                </DialogDescription>
              </DialogHeader>
              <Button
                size="lg"
                className="w-full rounded-full sm:w-auto"
                onClick={() => setFormOpen(true)}
              >
                Apply now
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
