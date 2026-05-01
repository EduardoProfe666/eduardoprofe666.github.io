import { DATA } from "@/data/resume";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${DATA.url}/#person`,
    name: DATA.name,
    alternateName: "EduardoProfe666",
    url: DATA.url,
    image: {
      "@type": "ImageObject",
      url: `${DATA.url}/me.avif`,
      width: 400,
      height: 400,
    },
    description:
      "Fullstack Team Lead & AI Engineer with 4+ years of experience building scalable solutions with modern stacks, AI integration, and DevOps practices.",
    jobTitle: "Fullstack Team Lead & AI Engineer",
    worksFor: DATA.work.slice(0, 2).map((w) => ({
      "@type": "Organization",
      name: w.company,
      url: w.href,
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
    knowsAbout: [
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
      "Docker",
      "AWS",
      "DigitalOcean",
      "n8n",
      "PostgreSQL",
      "MongoDB",
    ],
    knowsLanguage: [
      { "@type": "Language", name: "Spanish", alternateName: "es" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    sameAs: [
      "https://github.com/EduardoProfe666",
      DATA.contact.social.LinkedIn?.url,
      DATA.contact.social.Youtube?.url,
      DATA.contact.social.Instagram?.url,
    ].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Havana",
      addressCountry: "CU",
    },
    nationality: {
      "@type": "Country",
      name: "Cuba",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${DATA.url}/#website`,
    name: `${DATA.name} — Portfolio`,
    url: DATA.url,
    description:
      "Personal portfolio of Eduardo González (EduardoProfe666) — Fullstack Team Lead & AI Engineer.",
    inLanguage: ["en", "es", "fr", "de", "it"],
    author: { "@id": `${DATA.url}/#person` },
    publisher: { "@id": `${DATA.url}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${DATA.url}/#projects`,
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: DATA.url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
