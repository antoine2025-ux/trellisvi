import { useLayoutEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ComparisonSection } from "@/components/ComparisonSection";
import { STREAM_ORIGIN } from "@/components/GatedVideo";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { Terms } from "@/components/Terms";
import { CheckpointSection } from "@/components/landing/CheckpointSection";
import { CurriculumSection } from "@/components/landing/CurriculumSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { Hero } from "@/components/landing/Hero";
import { InstructorSection } from "@/components/landing/InstructorSection";
import { CohortBar, LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MethodSection } from "@/components/landing/MethodSection";
import { OfferSection } from "@/components/landing/OfferSection";
import { PlatformSection } from "@/components/landing/PlatformSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ProofSection } from "@/components/landing/ProofSection";
import { StickyApplyBar } from "@/components/landing/StickyApplyBar";
import { TracksSection } from "@/components/landing/TracksSection";
import { homepageJsonLdScript, SITE_URL, OG_IMAGE } from "@/lib/jsonld";

const TITLE = "Trellis VI: AI-Assisted Development Course | 8-Week Cohort";
const DESCRIPTION =
  "Learn to direct AI coding agents like an engineering team. An 8-week, 10-seat cohort using Cursor and Claude to ship production software you can defend.";
const SOCIAL_TITLE = "Run AI like an engineering team. Ship software that survives production.";

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: homepageJsonLdScript,
      },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: STREAM_ORIGIN },
    ],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: SOCIAL_TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "Trellis VI" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:secure_url", content: OG_IMAGE },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: SOCIAL_TITLE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SOCIAL_TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: Landing,
});

function Landing() {
  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="landing min-h-screen bg-background text-foreground">
      <CohortBar />
      <LandingHeader />

      <main>
        <Hero />
        <ProblemSection />
        <MethodSection />
        <ComparisonSection />
        <TracksSection />
        <CurriculumSection />
        <PlatformSection />
        <ProofSection />
        <InstructorSection />
        <CheckpointSection />
        <OfferSection />
        <FaqSection />
        <FinalCta />
      </main>

      <LandingFooter />
      <StickyApplyBar />
      <PrivacyPolicy />
      <Terms />
    </div>
  );
}
