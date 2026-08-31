import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Course login - Trellis VI Studio" },
      {
        name: "description",
        content: "Sign in to the Trellis VI course workspace.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">
        <h1 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">
          Course login
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-muted-foreground">
          Sign in to sessions, recordings, and the cohort workspace. This door is not open yet.
        </p>
      </main>
    </div>
  );
}
