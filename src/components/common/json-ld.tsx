import { DATA } from "@/data/resume";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: DATA.name,
    url: DATA.url,
    image: `${DATA.url}/me.avif`,
    jobTitle: "Fullstack Team Lead & AI Engineer",
    worksFor: {
      "@type": "Organization",
      name: DATA.work[0]?.company,
      url: DATA.work[0]?.href,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Technological University of Havana (CUJAE)",
      url: "https://cujae.edu.cu",
    },
    knowsAbout: [
      "Full-Stack Development",
      "Artificial Intelligence",
      "DevOps",
      "Cloud Infrastructure",
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      ".NET",
      "Node.js",
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
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${DATA.name} - Portfolio`,
    url: DATA.url,
    author: { "@type": "Person", name: DATA.name },
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
    </>
  );
}
