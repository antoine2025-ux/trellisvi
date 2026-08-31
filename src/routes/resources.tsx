import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Free resources - Trellis VI Studio" },
      {
        name: "description",
        content: "Free Trellis VI resources on AI-assisted systems development.",
      },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">
        <h1 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">
          Free resources
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-muted-foreground">
          Guides, templates, and notes you can use without applying. More here soon.
        </p>
      </main>
    </div>
  );
}
