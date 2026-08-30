import { z } from "zod";

export const applicationSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  country: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  job: z.enum(["employed", "freelance", "unemployed"]),
  experience: z.enum(["0-2", "3-5", "6+"]),
  tools: z.enum(["understand", "no"]),
  commit: z.enum(["yes", "no"]),
  q1: z.string().trim().min(1),
  q2: z.string().trim().min(1),
  q3: z.string().trim().min(1),
});

export type Application = z.infer<typeof applicationSchema>;

const LABELS = {
  job: {
    employed: "Employed",
    freelance: "Freelance",
    unemployed: "Unemployed",
  },
  experience: {
    "0-2": "0-2 years",
    "3-5": "3-5 years",
    "6+": "6+ years",
  },
  tools: {
    understand: "I understand",
    no: "No",
  },
  commit: {
    yes: "Yes",
    no: "No",
  },
} as const;

export function applicationToEmailText(data: Application) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Country: ${data.country}`,
    `Phone: ${data.phone}`,
    `Job: ${LABELS.job[data.job]}`,
    `Work experience: ${LABELS.experience[data.experience]}`,
    `Claude and Cursor: ${LABELS.tools[data.tools]}`,
    `Eight-week commit: ${LABELS.commit[data.commit]}`,
    "",
    "What have you already built with AI?",
    data.q1,
    "",
    "Where exactly are you stuck today?",
    data.q2,
    "",
    "What would make the next eight weeks worth it?",
    data.q3,
  ].join("\n");
}
