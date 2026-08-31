"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  applicationSchema,
  CAPITAL_LABELS,
  PAIN_LABELS,
  TIME_LABELS,
  qualifyApplication,
  unqualifiedReasons,
  type Application,
  type ApplicationLane,
} from "@/lib/application";
import { submitApplication } from "@/lib/submit-application";
import { hasVideoLeadContact, readVideoLead, subscribeVideoLead, writeVideoLead } from "@/lib/video-lead";
import type { VideoLead } from "@/lib/video-lead";

const DEFAULT_BOOKING_URL = "https://calendly.com/antoine-powerintel/trellis-vi-onboarding";
const BOOKING_URL =
  typeof import.meta.env["VITE_BOOKING_URL"] === "string"
    ? import.meta.env["VITE_BOOKING_URL"].trim()
    : "";

const PAIN_OPTIONS = [
  { value: "simple", label: PAIN_LABELS.simple },
  { value: "have_not", label: PAIN_LABELS.have_not },
  { value: "hit_wall", label: PAIN_LABELS.hit_wall },
  { value: "paid_service", label: PAIN_LABELS.paid_service },
] as const;

const TIME_OPTIONS = [
  { value: "yes", label: TIME_LABELS.yes },
  { value: "no", label: TIME_LABELS.no },
] as const;

const CAPITAL_YES_NO = [
  { value: "yes", label: TIME_LABELS.yes },
  { value: "no", label: TIME_LABELS.no },
] as const;

const BUDGET_FOLLOW_UP = [
  { value: "plan", label: CAPITAL_LABELS.plan },
  { value: "no", label: CAPITAL_LABELS.no },
] as const;

type Step = "contact" | "goal" | "pain" | "time" | "capital" | "budget";

function previousStep(step: Step, includeContact: boolean): Step | null {
  if (step === "budget") return "capital";
  if (step === "capital") return "time";
  if (step === "time") return "pain";
  if (step === "pain") return "goal";
  if (step === "goal" && includeContact) return "contact";
  return null;
}

function RequiredMark() {
  return (
    <span className="text-brown" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

function ChoiceButton({
  selected,
  children,
  disabled,
  onClick,
}: {
  selected: boolean;
  children: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`apply-choice${selected ? " is-selected" : ""}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ApplicationForm({ compact = false }: { compact?: boolean }) {
  const sendApplication = useServerFn(submitApplication);
  const advanceTimer = useRef<number | null>(null);
  const idPrefix = compact ? "apply-dialog" : "apply-page";

  const [mounted, setMounted] = useState(false);
  const [includeContact, setIncludeContact] = useState(true);
  const [step, setStep] = useState<Step>("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [pain, setPain] = useState<Application["pain"] | "">("");
  const [time, setTime] = useState<Application["time"] | "">("");
  const [capital, setCapital] = useState<Application["capital"] | "">("");
  const [capitalGate, setCapitalGate] = useState<"" | "yes" | "no">("");
  const [submitting, setSubmitting] = useState(false);
  const [lane, setLane] = useState<ApplicationLane | null>(null);
  const [rejectReasons, setRejectReasons] = useState({ time: false, budget: false });
  const answersRef = useRef({ name, email, goal, pain, time, capital });
  answersRef.current = { name, email, goal, pain, time, capital };

  useEffect(() => {
    function applyLead(lead: VideoLead) {
      setName(lead.name);
      setEmail(lead.email);
      if (hasVideoLeadContact(lead)) {
        setIncludeContact(false);
        setStep((current) => (current === "contact" ? "goal" : current));
      }
    }

    const stored = readVideoLead();
    if (stored) applyLead(stored);
    setMounted(true);
    return subscribeVideoLead(applyLead);
  }, []);

  useEffect(() => {
    return () => {
      if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  function goTo(next: Step) {
    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
    setStep(next);
  }

  function goBack() {
    const previous = previousStep(step, includeContact);
    if (!previous || submitting) return;
    goTo(previous);
  }

  const backTo = previousStep(step, includeContact);

  async function submitWith(picked: Partial<Pick<Application, "pain" | "time" | "capital">> = {}) {
    const latest = answersRef.current;
    const capital = picked.capital ?? latest.capital;
    const parsed = applicationSchema.safeParse({
      name: latest.name,
      email: latest.email,
      goal: latest.goal,
      pain: picked.pain ?? latest.pain,
      time: picked.time ?? latest.time,
      ...(capital === "yes" || capital === "plan" || capital === "no" ? { capital } : {}),
    });

    if (!parsed.success) {
      toast.error("Check the form and try again.");
      return;
    }

    const nextLane = qualifyApplication(parsed.data);
    const reasons = unqualifiedReasons(parsed.data);
    writeVideoLead({ name: parsed.data.name, email: parsed.data.email });
    setSubmitting(true);

    void sendApplication({ data: parsed.data }).catch(() => {
      if (nextLane !== "red") {
        toast.error("We could not send your application.", {
          description: "Email trellis@powerintel.co and we will take it from there.",
        });
      }
    });

    setRejectReasons(reasons);
    setLane(nextLane);
    setSubmitting(false);
  }

  function onContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextName = name.trim();
    const nextEmail = email.trim();
    const nameField = e.currentTarget.elements.namedItem("name");
    const emailField = e.currentTarget.elements.namedItem("email");
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
    goTo("goal");
  }

  function onGoal(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!goal.trim()) {
      const field = e.currentTarget.elements.namedItem("goal");
      if (field instanceof HTMLTextAreaElement) field.reportValidity();
      return;
    }
    goTo("pain");
  }

  if (lane) {
    return (
      <ApplyOutcome
        lane={lane}
        compact={compact}
        reasons={rejectReasons}
        name={name}
        email={email}
      />
    );
  }

  if (!mounted) {
    return (
      <div
        className={`application-form-wrap${compact ? " is-compact" : ""}`}
        aria-hidden="true"
      >
        <div className="application-form space-y-6 rounded-[2.25rem] border border-border bg-card p-6 sm:p-10">
          <div className="h-40" />
        </div>
      </div>
    );
  }

  return (
    <div className={`application-form-wrap${compact ? " is-compact" : ""}`}>
      <div className="application-form space-y-6 rounded-[2.25rem] border border-border bg-card p-6 sm:p-10">
        <div className="apply-step-bar">
          <p className="apply-progress" aria-live="polite">
            {stepLabel(step, includeContact)}
          </p>
          {backTo ? (
            <button
              type="button"
              className="apply-back"
              disabled={submitting}
              onClick={goBack}
            >
              Back
            </button>
          ) : null}
        </div>

        {step === "contact" ? (
          <form className="apply-step space-y-8" onSubmit={onContact}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <label htmlFor={`${idPrefix}-name`} className="apply-question">
                  Full name
                  <RequiredMark />
                </label>
                <Input
                  id={`${idPrefix}-name`}
                  name="name"
                  required
                  autoComplete="name"
                  autoFocus={compact}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label htmlFor={`${idPrefix}-email`} className="apply-question">
                  Email
                  <RequiredMark />
                </label>
                <Input
                  id={`${idPrefix}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Continue
            </Button>
          </form>
        ) : null}

        {step === "goal" ? (
          <form className="apply-step space-y-8" onSubmit={onGoal}>
            <div className="apply-field-grow space-y-8">
              <label htmlFor={`${idPrefix}-goal`} className="apply-question">
                What are you trying to build?
                <RequiredMark />
              </label>
              <Textarea
                id={`${idPrefix}-goal`}
                name="goal"
                rows={5}
                required
                autoFocus={compact}
                className="text-base md:text-base"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Continue
            </Button>
          </form>
        ) : null}

        {step === "pain" ? (
          <div className="apply-step space-y-8">
            <p className="apply-question">
              Have you tried before?
              <RequiredMark />
            </p>
            <div className="apply-choices">
              {PAIN_OPTIONS.map((option) => (
                <ChoiceButton
                  key={option.value}
                  selected={pain === option.value}
                  onClick={() => {
                    setPain(option.value);
                    answersRef.current.pain = option.value;
                    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
                    advanceTimer.current = window.setTimeout(() => setStep("time"), 180);
                  }}
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
          </div>
        ) : null}

        {step === "time" ? (
          <div className="apply-step space-y-8">
            <p className="apply-question">
              This requires 10–15 hours a week of focused work. Can you commit to this?
              <RequiredMark />
            </p>
            <div className="apply-choices">
              {TIME_OPTIONS.map((option) => (
                <ChoiceButton
                  key={option.value}
                  selected={time === option.value}
                  onClick={() => {
                    setTime(option.value);
                    answersRef.current.time = option.value;
                    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
                    if (option.value === "no") {
                      void submitWith({
                        pain: answersRef.current.pain as Application["pain"],
                        time: "no",
                      });
                      return;
                    }
                    advanceTimer.current = window.setTimeout(() => setStep("capital"), 180);
                  }}
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
          </div>
        ) : null}

        {step === "capital" ? (
          <div className="apply-step space-y-8">
            <p className="apply-question">
              The course costs $2,499. Are you in a position to invest this in your skills right
              now?
              <RequiredMark />
            </p>
            <div className="apply-choices">
              {CAPITAL_YES_NO.map((option) => (
                <ChoiceButton
                  key={option.value}
                  selected={capitalGate === option.value}
                  disabled={submitting}
                  onClick={() => {
                    if (submitting) return;
                    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
                    setCapitalGate(option.value);
                    if (option.value === "yes") {
                      setCapital("yes");
                      answersRef.current.capital = "yes";
                      void submitWith({
                        pain: answersRef.current.pain as Application["pain"],
                        time: answersRef.current.time as Application["time"],
                        capital: "yes",
                      });
                      return;
                    }
                    setCapital("");
                    answersRef.current.capital = "";
                    advanceTimer.current = window.setTimeout(() => setStep("budget"), 180);
                  }}
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
            {submitting ? (
              <p className="text-sm text-muted-foreground">Sending your application…</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                We review every application individually to ensure this course is the right fit.
              </p>
            )}
          </div>
        ) : null}

        {step === "budget" ? (
          <div className="apply-step space-y-8">
            <p className="apply-question">
              If the full investment isn't possible right now:
              <RequiredMark />
            </p>
            <div className="apply-choices">
              {BUDGET_FOLLOW_UP.map((option) => (
                <ChoiceButton
                  key={option.value}
                  selected={capital === option.value}
                  disabled={submitting}
                  onClick={() => {
                    if (submitting) return;
                    setCapital(option.value);
                    answersRef.current.capital = option.value;
                    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
                    void submitWith({
                      pain: answersRef.current.pain as Application["pain"],
                      time: answersRef.current.time as Application["time"],
                      capital: option.value,
                    });
                  }}
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
            {submitting ? (
              <p className="text-sm text-muted-foreground">Sending your application…</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function stepLabel(step: Step, includeContact: boolean) {
  const steps: Step[] = includeContact
    ? ["contact", "goal", "pain", "time", "capital"]
    : ["goal", "pain", "time", "capital"];
  const index = step === "budget" ? steps.length - 1 : steps.indexOf(step);
  return `${Math.max(index, 0) + 1} of ${steps.length}`;
}

function calendlyEmbedSrc(bookingUrl: string, name: string, email: string) {
  try {
    const url = new URL(bookingUrl);
    url.searchParams.set("embed_type", "Inline");
    url.searchParams.set("hide_gdpr_banner", "1");
    const nextName = name.trim();
    const nextEmail = email.trim();
    if (nextName) url.searchParams.set("name", nextName);
    if (nextEmail) url.searchParams.set("email", nextEmail);
    return url.toString();
  } catch {
    return bookingUrl;
  }
}

function ApplyOutcome({
  lane,
  compact,
  reasons,
  name,
  email,
}: {
  lane: ApplicationLane;
  compact: boolean;
  reasons: { time: boolean; budget: boolean };
  name: string;
  email: string;
}) {
  const bookingUrl = BOOKING_URL || DEFAULT_BOOKING_URL;
  const calendarSrc = calendlyEmbedSrc(bookingUrl, name, email);

  if (lane === "green") {
    return (
      <div className={`application-form-wrap${compact ? " is-compact" : ""}`} data-lane="green">
        <div className="apply-outcome rounded-[2.25rem] border border-border bg-card p-6 sm:p-10">
          <h3 className="apply-outcome-title">You look like a great fit</h3>
          <p className="mt-4 text-lg font-semibold leading-relaxed">
            Book your onboarding call below.
          </p>
          {bookingUrl ? (
            <iframe
              className="apply-calendar mt-8"
              title="Book your onboarding call"
              src={calendarSrc}
              loading="lazy"
            />
          ) : (
            <p className="mt-8 rounded-2xl border border-border bg-secondary px-5 py-4 text-sm leading-relaxed text-muted-foreground">
              Calendar coming soon. We'll email you a booking link.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (lane === "yellow") {
    return (
      <div className={`application-form-wrap${compact ? " is-compact" : ""}`} data-lane="yellow">
        <div className="apply-outcome rounded-[2.25rem] border border-border bg-card p-6 sm:p-10">
          <h3 className="apply-outcome-title">Thanks for applying</h3>
          <p className="mt-4 text-lg font-semibold leading-relaxed">
            Our team is reviewing your application to ensure this cohort is the right fit. We'll
            email you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`application-form-wrap${compact ? " is-compact" : ""}`} data-lane="red">
      <div className="apply-outcome rounded-[2.25rem] border border-border bg-card p-6 sm:p-10">
        <h3 className="apply-outcome-title">The live cohort isn't the right fit right now</h3>
        <p className="mt-4 text-lg font-semibold leading-relaxed">
          Based on your answers, we don't think this is the moment to join. That is not a
          judgment of you. It is how we keep the cohort small and workable.
        </p>
        {reasons.time || reasons.budget ? (
          <ul className="mt-6 space-y-3 text-base font-semibold leading-relaxed">
            {reasons.time ? (
              <li>
                Trellis VI requires 10–15 hours of focused building each week. We want to make
                sure you have the bandwidth to get the maximum value out of the cohort before
                you jump in.
              </li>
            ) : null}
            {reasons.budget ? (
              <li>
                At $2,499, Trellis VI is a significant investment. We only want you joining when
                the timing and budget align perfectly, so you can focus entirely on the build
                rather than the cost.
              </li>
            ) : null}
          </ul>
        ) : null}
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          You can still master the basics using our free resources, then apply again when the
          time and investment line up.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          If you still would really like to participate in the course and would like to discuss
          your situation so we can find a solution, send an email to{" "}
          <a href="mailto:trellis@powerintel.co" className="font-semibold text-brown hover:underline">
            trellis@powerintel.co
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/resources">Browse free resources</Link>
          </Button>
          <Link to="/blog" className="font-serif text-lg italic text-brown hover:underline">
            Read the blog
          </Link>
        </div>
      </div>
    </div>
  );
}
