import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community - Trellis VI Studio" },
      {
        name: "description",
        content: "The Trellis VI community for people building with the framework.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">
        <h1 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">Community</h1>
        <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-muted-foreground">
          The Trellis VI cohort groups. A place for people who are building past the demo, not
          collecting another prompt pack.
        </p>
      </main>
    </div>
  );
}
