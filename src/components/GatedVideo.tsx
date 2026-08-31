"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Play } from "lucide-react";
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
import { readVideoLead, writeVideoLead } from "@/lib/video-lead";
import { loadYouTubeApi, type YouTubePlayer } from "@/lib/youtube-api";

const VIDEO_ID = "aqz-KE-bpKQ";
const POSTER = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export function GatedVideo() {
  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
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

    let cancelled = false;

    loadYouTubeApi()
      .then((YT) => {
        const host = playerHostRef.current;
        if (cancelled || !host) return;

        host.replaceChildren();
        const mount = document.createElement("div");
        mount.style.width = "100%";
        mount.style.height = "100%";
        host.appendChild(mount);

        playerRef.current?.destroy();
        playerRef.current = new YT.Player(mount, {
          videoId: VIDEO_ID,
          width: "100%",
          height: "100%",
          playerVars: {
            rel: 0,
            autoplay: autoplay ? 1 : 0,
            modestbranding: 1,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onStateChange: (event) => {
              if (event.data !== YT.PlayerState.ENDED) return;
              try {
                if (sessionStorage.getItem("trellis-intro-apply-prompted")) return;
                sessionStorage.setItem("trellis-intro-apply-prompted", "1");
              } catch {
                // Still show the prompt if storage is blocked.
              }
              setPromptOpen(true);
              setFormOpen(false);
            },
          },
        });
      })
      .catch(() => {
        // The poster/play gate still works if the API fails to load.
      });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
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

    writeVideoLead({ name: nextName, email: nextEmail });
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
          <div ref={playerHostRef} className="h-full w-full" />
        ) : (
          <div className="gated-video-stage">
            <img src={POSTER} alt="" className="gated-video-poster" />
            <div className="gated-video-scrim" aria-hidden="true" />
            {asking ? (
              <form className="gated-video-form" onSubmit={onSubmit}>
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
