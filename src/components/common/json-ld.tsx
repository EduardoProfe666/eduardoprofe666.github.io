import { DATA } from "@/data/resume";

/**
 * Structured data for the page.
 *
 * Emitted as a single `@graph` so the Person, the WebSite and the ProfilePage
 * cross-reference each other by `@id`; Google then reads one connected entity
 * instead of three unrelated blobs.
 *
 * Two things were also removed rather than rewritten:
 *   - a `SearchAction` pointing at `/#projects`, which is not a search endpoint
 *     and only earns a Search Console warning;
 *   - a `BreadcrumbList` whose single item was the home page itself.
 */

const PERSON_ID = `${DATA.url}/#person`;
const WEBSITE_ID = `${DATA.url}/#website`;

const JOB_TITLE = "Fullstack Team Lead & AI Engineer";
const DESCRIPTION =
  "Fullstack Team Lead & AI Engineer with 4+ years of experience building scalable solutions with modern stacks, AI integration, and DevOps practices.";

/** Human-readable names for the skill slugs that feed `knowsAbout`. */
const KNOWS_ABOUT = [
  "Full-Stack Development",
  "Artificial Intelligence",
  "DevOps",
  "Cloud Infrastructure",
  "Team Leadership",
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  ".NET",
  "Node.js",
  "React Native",
  "Expo",
  "Docker",
  "AWS",
  "Railway",
  "DigitalOcean",
  "n8n",
  "PostgreSQL",
  "MongoDB",
];

export function JsonLd() {
  const [city, country] = DATA.location.split(", ");

  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: DATA.name,
    alternateName: "EduardoProfe666",
    url: DATA.url,
    image: {
      "@type": "ImageObject",
      url: `${DATA.url}${DATA.avatarUrl}`,
      width: 1150,
      height: 1150,
    },
    description: DESCRIPTION,
    jobTitle: JOB_TITLE,
    email: `mailto:${DATA.contact.email}`,
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: [
      { "@type": "Language", name: "Spanish", alternateName: "es" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    // Derived from the résumé rather than hardcoded, so it cannot drift.
    worksFor: DATA.work
      .filter((entry) => entry.end === null)
      .map((entry) => ({
        "@type": "Organization",
        name: entry.company,
        url: entry.href,
      })),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Technological University of Havana (CUJAE)",
      url: "https://cujae.edu.cu",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Computer Engineering - Gold Title Honors",
      credentialCategory: "degree",
      educationalLevel: "Bachelor",
    },
    award: DATA.events
      .filter((event) => event.award)
      .map((event) => `${event.title} ${event.dates}`),
    sameAs: [
      "https://github.com/EduardoProfe666",
      DATA.contact.social.LinkedIn.url,
      DATA.contact.social.Youtube.url,
      DATA.contact.social.Instagram.url,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressCountry: country,
    },
    nationality: { "@type": "Country", name: "Cuba" },
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: `${DATA.name} — Portfolio`,
    url: DATA.url,
    description: DESCRIPTION,
    inLanguage: ["en", "es", "fr", "de", "it"],
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${DATA.url}/#webpage`,
    url: DATA.url,
    name: `${DATA.name} — ${JOB_TITLE}`,
    description: DESCRIPTION,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    primaryImageOfPage: `${DATA.url}/og.png`,
  };

  const projects = DATA.projects.map((project) => ({
    "@type": "SoftwareApplication",
    "@id": `${DATA.url}/#project-${project.id}`,
    name: project.title.replace(/^\P{L}+/u, "").trim(),
    url: project.href,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    image: `${DATA.url}${project.image}`,
    dateCreated: project.date,
    author: { "@id": PERSON_ID },
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, ...projects],
  };

  return (
    <script
      type="application/ld+json"
      // `<` is escaped so a stray sequence in the data can never close the
      // script element early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
