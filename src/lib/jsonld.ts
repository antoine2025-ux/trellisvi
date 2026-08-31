import { weeks } from "@/content/curriculum";

const SITE_URL = "https://trellistudio.tech";
const OG_IMAGE = `${SITE_URL}/og-hero.png`;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#instructor`;
const COURSE_ID = `${SITE_URL}/#course`;
const OFFER_ID = `${SITE_URL}/#offer`;
const INSTANCE_ID = `${SITE_URL}/#course-instance`;

const LINKEDIN_URL = "https://www.linkedin.com/in/antoinemorlet/";

const ESTONIAN_REGISTER_URL = "https://ariregister.rik.ee/eng/company/16377052";

const offer = {
  "@type": "Offer",
  "@id": OFFER_ID,
  category: "Paid",
  price: "2499",
  priceCurrency: "USD",
  availability: "https://schema.org/LimitedAvailability",
  url: `${SITE_URL}/#apply`,
  seller: { "@id": ORGANIZATION_ID },
};

function syllabusDescription(week: (typeof weeks)[number]) {
  const parts = [week.shift, `Outcome: ${week.outcome}`];
  if (week.business) parts.push(`Business Track: ${week.business}`);
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
      name: "Learn to build with Trellis VI - AI assisted development course",
      alternateName: "Trellis VI Framework",
      description:
        "An intensive 8-week AI-assisted systems development course teaching the Technical Program Management framework to orchestrate AI agents, design scalable architectures, and deploy custom software.",
      url: `${SITE_URL}/`,
      image: OG_IMAGE,
      inLanguage: "en",
      isAccessibleForFree: false,
      timeRequired: "P8W",
      educationalLevel: "Intermediate",
      teaches: [
        "Technical Program Management framework for AI-assisted development",
        "Orchestrating AI agents",
        "Designing scalable architectures",
        "Deploying custom software to production",
      ],
      about: [
        "AI-assisted development",
        "Technical Program Management",
        "Systems architecture",
        "Production deployment",
      ],
      provider: { "@id": ORGANIZATION_ID },
      instructor: { "@id": PERSON_ID },
      offers: offer,
      hasCourseInstance: {
        "@type": "CourseInstance",
        "@id": INSTANCE_ID,
        name: "Trellis VI 8-week online cohort",
        courseMode: "Online",
        courseWorkload: "PT80H",
        instructor: { "@id": PERSON_ID },
        offers: offer,
      },
      syllabusSections: weeks.map((week) => ({
        "@type": "Syllabus",
        name: `Week ${Number.parseInt(week.n, 10)}: ${week.title}`,
        description: syllabusDescription(week),
        timeRequired: "P1W",
      })),
    },
  ],
};

export const homepageJsonLdScript = JSON.stringify(homepageJsonLd);
