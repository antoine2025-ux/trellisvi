import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ApplicationForm() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // [PLACEHOLDER] Wire this to your application inbox or CRM.
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Application received", {
        description: "[Placeholder] We reply to every application within three working days.",
      });
      (e.target as HTMLFormElement).reset();
    }, 400);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-card p-6 sm:p-10 border border-border">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="space-y-2 sm:max-w-xs">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="q1">What have you already built with AI?</Label>
        <Textarea id="q1" name="q1" rows={3} required placeholder="[Placeholder prompt copy]" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="q2">Where exactly are you stuck today?</Label>
        <Textarea id="q2" name="q2" rows={3} required placeholder="[Placeholder prompt copy]" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="q3">What would make the next eight weeks worth it?</Label>
        <Textarea id="q3" name="q3" rows={3} required placeholder="[Placeholder prompt copy]" />
      </div>
      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending…" : "Submit application"}
      </Button>
      <p className="text-sm text-muted-foreground">
        [Placeholder] Applications are reviewed by a person. No automated sales sequence.
      </p>
    </form>
  );
}
