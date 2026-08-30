import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/built")({
  head: () => ({
    meta: [
      { title: "Built with Trellis VI" },
      {
        name: "description",
        content: "Software built with the Trellis VI AI-assisted development framework.",
      },
    ],
  }),
  component: BuiltPage,
});

function BuiltPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">
        <h1 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">
          Built with Trellis VI
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-muted-foreground">
          Live systems designed and shipped with the Trellis VI framework — by the studio
          and by people who took the course.
        </p>
      </main>
    </div>
  );
}
