import { useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { applicationSchema } from "@/lib/application";
import { submitApplication } from "@/lib/submit-application";

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Malta",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Tanzania",
  "Thailand",
  "Tunisia",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Zambia",
  "Zimbabwe",
] as const;

const selectClassName =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

function RequiredMark() {
  return (
    <span className="text-brown" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

function FieldSelect({
  id,
  name,
  children,
  defaultLabel,
}: {
  id: string;
  name: string;
  children: ReactNode;
  defaultLabel?: string;
}) {
  return (
    <select
      id={id}
      name={name}
      required
      aria-required="true"
      defaultValue=""
      className={selectClassName}
    >
      <option value="" disabled>
        {defaultLabel ?? "Select"}
      </option>
      {children}
    </select>
  );
}

const REQUIRED_FIELDS = [
  "name",
  "email",
  "country",
  "phone",
  "job",
  "experience",
  "tools",
  "commit",
  "q1",
  "q2",
  "q3",
] as const;

export function ApplicationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const sendApplication = useServerFn(submitApplication);

  function refreshForm() {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setFormKey((key) => key + 1);
    setSent(true);
    window.setTimeout(() => setSent(false), reduced ? 500 : 2200);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    for (const name of REQUIRED_FIELDS) {
      const value = String(data.get(name) ?? "").trim();
      const field = form.elements.namedItem(name);
      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement ||
        field instanceof HTMLSelectElement
      ) {
        if (!value) {
          field.setCustomValidity("This question is required.");
          field.reportValidity();
          return;
        }
        field.setCustomValidity("");
      }
    }

    const parsed = applicationSchema.safeParse({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      country: String(data.get("country") ?? ""),
      phone: String(data.get("phone") ?? ""),
      job: String(data.get("job") ?? ""),
      experience: String(data.get("experience") ?? ""),
      tools: String(data.get("tools") ?? ""),
      commit: String(data.get("commit") ?? ""),
      q1: String(data.get("q1") ?? ""),
      q2: String(data.get("q2") ?? ""),
      q3: String(data.get("q3") ?? ""),
    });

    if (!parsed.success) {
      toast.error("Check the form and try again.");
      return;
    }

    setSubmitting(true);
    try {
      await sendApplication({ data: parsed.data });
      refreshForm();
    } catch {
      toast.error("We could not send your application.", {
        description: "Email trellis@powerintel.co and we will take it from there.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function clearValidity(e: FormEvent<HTMLFormElement>) {
    const target = e.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement
    ) {
      target.setCustomValidity("");
    }
  }

  return (
    <div className={`application-form-wrap${sent ? " is-sent" : ""}`}>
      <form
        key={formKey}
        onSubmit={onSubmit}
        onInput={clearValidity}
        onChange={clearValidity}
        className="application-form space-y-6 rounded-[2.25rem] border border-border bg-card p-6 sm:p-10"
      >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Full name
            <RequiredMark />
          </Label>
          <Input id="name" name="name" required aria-required="true" autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email
            <RequiredMark />
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">
            Country
            <RequiredMark />
          </Label>
          <FieldSelect id="country" name="country" defaultLabel="Select country">
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </FieldSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone
            <RequiredMark />
          </Label>
          <Input id="phone" name="phone" type="tel" required aria-required="true" autoComplete="tel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="job">
            Job
            <RequiredMark />
          </Label>
          <FieldSelect id="job" name="job">
            <option value="employed">Employed</option>
            <option value="freelance">Freelance</option>
            <option value="unemployed">Unemployed</option>
          </FieldSelect>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">
            Work experience
            <RequiredMark />
          </Label>
          <FieldSelect id="experience" name="experience">
            <option value="0-2">0-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6+">6+ years</option>
          </FieldSelect>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tools">
          The course requires you to use Claude and Cursor. You will be responsible for having
          them installed with a working account.
          <RequiredMark />
        </Label>
        <FieldSelect id="tools" name="tools">
          <option value="understand">I understand</option>
          <option value="no">No</option>
        </FieldSelect>
      </div>

      <div className="space-y-2">
        <Label htmlFor="commit">
          Are you willing to commit to the full 8 weeks?
          <RequiredMark />
        </Label>
        <FieldSelect id="commit" name="commit">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </FieldSelect>
      </div>

      <div className="space-y-2">
        <Label htmlFor="q1">
          What have you already built with AI?
          <RequiredMark />
        </Label>
        <Textarea id="q1" name="q1" rows={3} required aria-required="true" minLength={1} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="q2">
          Where exactly are you stuck today?
          <RequiredMark />
        </Label>
        <Textarea id="q2" name="q2" rows={3} required aria-required="true" minLength={1} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="q3">
          What would make the next eight weeks worth it?
          <RequiredMark />
        </Label>
        <Textarea id="q3" name="q3" rows={3} required aria-required="true" minLength={1} />
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending…" : "Submit application"}
      </Button>
      <p className="text-sm text-muted-foreground">
        We review every application individually to ensure this course is the right fit for you.
        Our goal is only to accept students who we are confident will extract real, measurable
        value from the program.
      </p>
      </form>
      <div className="application-sent" aria-live="polite" aria-atomic="true">
        <div className="application-letter" aria-hidden="true">
          <span className="application-letter-flap" />
          <span className="application-letter-body">
            <span className="application-letter-stamp">VI</span>
            <span className="application-letter-address">Trellis VI</span>
          </span>
        </div>
        <p className="application-sent-copy">Application sent</p>
      </div>
    </div>
  );
}
