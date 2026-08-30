import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PrivacyPolicy, openPrivacyPolicy } from "@/components/PrivacyPolicy";
import { Terms, openTerms } from "@/components/Terms";

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
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Outlet />
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{new Date().getFullYear()} PowerIntel - trading name of ACMPOWER OÜ</span>
          <nav className="flex gap-6">
            <a href="mailto:trellis@powerintel.co" className="hover:text-foreground">
              trellis@powerintel.co
            </a>
            <button type="button" className="hover:text-foreground" onClick={openPrivacyPolicy}>
              Privacy
            </button>
            <button type="button" className="hover:text-foreground" onClick={openTerms}>
              Terms
            </button>
          </nav>
        </div>
      </footer>
      <PrivacyPolicy />
      <Terms />
    </div>
  );
}
