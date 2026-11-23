import { weeks } from "@/content/curriculum";
import { faqs } from "@/content/landing";

export const SITE_URL = "https://www.powerintel.co/studio";
export const OG_IMAGE = `${SITE_URL}/og-cohort-1.png`;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#instructor`;
const COURSE_ID = `${SITE_URL}/#course`;
const OFFER_ID = `${SITE_URL}/#offer`;
const INSTANCE_ID = `${SITE_URL}/#course-instance`;
const VIDEO_ID = `${SITE_URL}/#introduction-video`;
const FAQ_ID = `${SITE_URL}/#faq`;

const LINKEDIN_URL = "https://www.linkedin.com/in/antoinemorlet/";

const ESTONIAN_REGISTER_URL = "https://ariregister.rik.ee/eng/company/16377052";

const STREAM_EMBED =
  "https://customer-n4cgp5b2m1lc9wi1.cloudflarestream.com/59aa2f45504b2ec8c6bcd4f6d6f7bd02";

const offer = {
  "@type": "Offer",
  "@id": OFFER_ID,
  category: "Paid",
  price: "2499",
  priceCurrency: "USD",
  availability: "https://schema.org/LimitedAvailability",
  validThrough: "2027-01-06T23:59:59+02:00",
  url: `${SITE_URL}/#apply`,
  seller: { "@id": ORGANIZATION_ID },
};

function syllabusDescription(week: (typeof weeks)[number]) {
  const parts = [week.goal, `Outcome: ${week.outcome}.`];
  if (week.business) parts.push(week.business);
  return parts.join(" ");
}

export const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "PowerIntel",
      legalName: "ACMPOWER OÜ",
      alternateName: ["Trellis VI", "Trellis VI Framework"],
      url: SITE_URL,
      email: "trellis@powerintel.co",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Lille tn 27-9",
        addressLocality: "Tallinn",
        addressRegion: "Harju maakond",
        postalCode: "10614",
        addressCountry: "EE",
      },
      areaServed: "Worldwide",
      founder: { "@id": PERSON_ID },
      logo: OG_IMAGE,
      image: OG_IMAGE,
      sameAs: [LINKEDIN_URL, ESTONIAN_REGISTER_URL],
      contactPoint: {
        "@type": "ContactPoint",
        email: "trellis@powerintel.co",
        contactType: "customer support",
      },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Antoine Morlet",
      description: "Ex Wise, Ex Nordea, Founder of PowerIntel",
      jobTitle: "Founder of Trellis VI AI assisted development framework",
      url: SITE_URL,
      image: OG_IMAGE,
      worksFor: { "@id": ORGANIZATION_ID },
      alumniOf: [
        { "@type": "Organization", name: "Wise" },
        { "@type": "Organization", name: "Nordea" },
      ],
      knowsAbout: [
        "AI-assisted development",
        "Technical Program Management",
        "Systems architecture",
        "AI agent orchestration",
      ],
      sameAs: [LINKEDIN_URL],
    },
    {
      "@type": "Course",
      "@id": COURSE_ID,
      name: "Trellis VI: AI-assisted development course",
      alternateName: "Trellis VI Framework",
      description:
        "An eight-week, application-only cohort that teaches a Technical Program Management method for directing AI coding agents such as Cursor and Claude. Students build and deploy real software twice, once guided and once on their own idea, and are graded from their repository.",
      url: SITE_URL,
      image: OG_IMAGE,
      inLanguage: "en",
      isAccessibleForFree: false,
      timeRequired: "P8W",
      educationalLevel: "Intermediate",
      teaches: [
        "Directing AI coding agents with a Technical Program Management method",
        "Designing data models and system blueprints before code",
        "Context engineering with repository context files",
        "Phase-based delivery with audits, ADRs and stable seams",
        "Deploying and debugging production software",
      ],
      about: [
        "AI-assisted development",
        "Vibe coding",
        "Technical Program Management",
        "Systems architecture",
        "Production deployment",
      ],
      provider: { "@id": ORGANIZATION_ID },
      instructor: { "@id": PERSON_ID },
      offers: offer,
      video: { "@id": VIDEO_ID },
      hasCourseInstance: {
        "@type": "CourseInstance",
        "@id": INSTANCE_ID,
        name: "Trellis VI Cohort 1",
        courseMode: "Online",
        startDate: "2027-01-11",
        endDate: "2027-03-07",
        courseWorkload: "PT64H",
        courseSchedule: {
          "@type": "Schedule",
          repeatFrequency: "P1W",
          repeatCount: 8,
          duration: "PT1H30M",
        },
        maximumAttendeeCapacity: 10,
        instructor: { "@id": PERSON_ID },
        offers: offer,
      },
      syllabusSections: weeks.map((week) => ({
        "@type": "Syllabus",
        name: `Week ${week.n}: ${week.title}`,
        description: syllabusDescription(week),
        timeRequired: "P1W",
      })),
    },
    {
      "@type": "VideoObject",
      "@id": VIDEO_ID,
      name: "Trellis VI: what the program is, what you leave with, and who it is not for",
      description:
        "A 12-minute introduction to the Trellis VI cohort by Antoine Morlet: the method, the eight weeks, and who the course is not for.",
      thumbnailUrl: `${STREAM_EMBED}/thumbnails/thumbnail.jpg?time=10s&height=720`,
      uploadDate: "2026-11-17T16:38:07+08:00",
      duration: "PT12M",
      embedUrl: `${STREAM_EMBED}/iframe`,
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "FAQPage",
      "@id": FAQ_ID,
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export const homepageJsonLdScript = JSON.stringify(homepageJsonLd);
