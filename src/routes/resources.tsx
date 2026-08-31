import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

type ResourcesSearch = {
  from?: "apply";
};

export const Route = createFileRoute("/resources")({
  validateSearch: (search: Record<string, unknown>): ResourcesSearch => {
    if (search["from"] === "apply") return { from: "apply" };
    return {};
  },
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
  const { from } = Route.useSearch();
  const fromApply = from === "apply";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">
        {fromApply ? (
          <p className="mb-10 max-w-2xl text-lg font-semibold leading-relaxed text-foreground">
            Based on your answers, the live cohort isn't the right fit right now. However, you
            can still master the basics using our free resources.
          </p>
        ) : null}
        <h1 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">
          Free resources
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-muted-foreground">
          Guides, templates, and notes you can use without applying. More here soon.
        </p>
        {fromApply ? (
          <p className="mt-8">
            <Link to="/blog" className="font-serif text-lg italic text-brown hover:underline">
              Read the blog
            </Link>
          </p>
        ) : null}
      </main>
    </div>
  );
}
