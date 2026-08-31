import { z } from "zod";

export const painValues = ["simple", "have_not", "hit_wall", "paid_service"] as const;
export const timeValues = ["yes", "no"] as const;
export const capitalValues = ["yes", "plan", "no"] as const;
export const laneValues = ["green", "yellow", "red"] as const;

export const applicationSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  goal: z.string().trim().min(1),
  pain: z.enum(painValues),
  time: z.enum(timeValues),
  capital: z.enum(capitalValues).optional(),
});

export type Application = z.infer<typeof applicationSchema>;
export type ApplicationLane = (typeof laneValues)[number];

export const PAIN_LABELS = {
  simple: "Built simple things",
  have_not: "Have not",
  hit_wall: "Hit a wall",
  paid_service: "I'm ready to turn my AI building into a paid service",
} as const;

export const TIME_LABELS = {
  yes: "Yes",
  no: "No",
} as const;

export const CAPITAL_LABELS = {
  yes: "Yes",
  plan: "I need a payment plan",
  no: "I do not have the budget",
} as const;

export const LANE_LABELS = {
  green: "GREEN",
  yellow: "YELLOW",
  red: "RED",
} as const;

export function qualifyApplication(
  data: Pick<Application, "pain" | "time" | "capital">,
): ApplicationLane {
  if (data.time === "no" || data.capital === "no") return "red";
  if (data.capital === "yes" || data.capital === "plan") return "green";
  return "yellow";
}

export function unqualifiedReasons(data: Pick<Application, "time" | "capital">) {
  return {
    time: data.time === "no",
    budget: data.capital === "no",
  };
}

export function applicationToEmailText(data: Application, lane: ApplicationLane) {
  return [
    `Lane: ${LANE_LABELS[lane]}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    "",
    "What are you trying to build?",
    data.goal,
    "",
    `Have you tried before?: ${PAIN_LABELS[data.pain]}`,
    `Time (10–15 hours/week): ${TIME_LABELS[data.time]}`,
    `Investment ($2,499): ${data.capital ? CAPITAL_LABELS[data.capital] : "Not asked"}`,
  ].join("\n");
}
