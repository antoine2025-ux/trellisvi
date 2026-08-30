import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog - Trellis VI Studio" },
      {
        name: "description",
        content: "Notes from Trellis VI on AI-assisted systems architecture.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">
        <h1 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">Blog</h1>
        <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-muted-foreground">
          Notes on AI-assisted systems architecture, context engineering, and shipping
          software that lasts past the demo.
        </p>
      </main>
    </div>
  );
}
