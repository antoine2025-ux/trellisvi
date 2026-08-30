"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VIDEO_ID = "aqz-KE-bpKQ";
const STORAGE_KEY = "trellis-intro-video-email";
const POSTER = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export function GatedVideo() {
  const [unlocked, setUnlocked] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [asking, setAsking] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setUnlocked(true);
      }
    } catch {
      // Private browsing can block storage; the gate still works.
    }
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    const field = e.currentTarget.elements.namedItem("video-email");
    if (!(field instanceof HTMLInputElement)) return;

    if (!value || !field.checkValidity()) {
      field.reportValidity();
      return;
    }

    // [PLACEHOLDER] Wire this email to your list or CRM.
    try {
      sessionStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore storage failures; still unlock this visit.
    }

    setAutoplay(true);
    setUnlocked(true);
    setAsking(false);
  }

  const src = `https://www.youtube.com/embed/${VIDEO_ID}${autoplay ? "?autoplay=1&rel=0" : "?rel=0"}`;

  return (
    <div className="gated-video aspect-video w-full overflow-hidden border border-border bg-card">
      {unlocked ? (
        <iframe
          className="h-full w-full"
          src={src}
          title="Program introduction"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="gated-video-stage">
          <img src={POSTER} alt="" className="gated-video-poster" />
          <div className="gated-video-scrim" aria-hidden="true" />
          {asking ? (
            <form className="gated-video-form" onSubmit={onSubmit}>
              <p className="gated-video-form-title">Enter your email to watch</p>
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
                  autoFocus
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
  );
}
