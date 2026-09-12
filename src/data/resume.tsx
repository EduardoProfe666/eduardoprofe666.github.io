import { Icons } from "@/components/main/icons";

/**
 * Structural résumé data: identifiers, dates, links and assets.
 *
 * Every human-readable string (job titles, descriptions, the degree name) lives
 * in `src/i18n/*` and is looked up by the `id` declared here. Keeping the prose
 * in exactly one place is what stops the English copy in this file from drifting
 * away from `src/i18n/en.ts`.
 *
 * Dates are stored as `YYYY-MM` and formatted per locale at render time (see
 * `src/lib/duration.ts`). They used to be English month names printed verbatim,
 * so a Spanish visitor still read "May 2024 - September 2026". An `end` of
 * `null` means the role is still ongoing.
 */
export const DATA = {
  name: "Eduardo González",
  initials: "EG",
  url: "https://eduardoprofe666.github.io",
  location: "Havana, CU",
  locationLink: "https://www.google.com/maps/place/havana",
  avatarUrl: "/me.avif",
  skill_slugs: [
    "python",
    "typescript",
    "javascript",
    "openjdk",
    "dotnet",
    "react",
    "railway",
    "nextdotjs",
    "gitlab",
    "nuxt",
    "vuedotjs",
    "angular",
    "vercel",
    "django",
    "fastapi",
    "nestjs",
    "postgresql",
    "mongodb",
    "docker",
    "git",
    "github",
    "tailwindcss",
    "html5",
    "css3",
    "express",
    "vite",
    "githubactions",
    "c",
    "amazonwebservices",
    "digitalocean",
    "android",
    "apple",
    "n8n",
    "anthropic",
  ],
  contact: {
    email: "eduardoprofe666@gmail.com",
    tel: "+53 55839297",
    social: {
      Email: {
        url: "mailto:eduardoprofe666@gmail.com",
        icon: Icons.mail,
      },
      LinkedIn: {
        url: "https://www.linkedin.com/in/eduardoprofe666",
        icon: Icons.linkedin,
      },
      Youtube: {
        url: "https://youtube.com/@EduardoProfeCujae",
        icon: Icons.youtube,
      },
      Instagram: {
        url: "https://www.instagram.com/eduardoglez02",
        icon: Icons.instagram,
      },
    },
  },

  work: [
    {
      id: "aikoders",
      company: "AIKoders LLC",
      badges: [],
      href: "https://aikoders.tech/",
      location: "Cape Coral, Florida, USA",
      logoUrl: "/work/aikoders.avif",
      start: "2025-12",
      end: null,
    },
    {
      id: "codes",
      company: "Codes SRL",
      badges: [],
      href: "https://www.codestic.net/",
      location: "Havana, CU",
      logoUrl: "/work/codes.avif",
      start: "2025-05",
      end: "2026-01",
    },
    {
      id: "emsifarma",
      company: "EMSI FARMA TECH",
      badges: [],
      href: "https://www.emsifarma.com",
      location: "Havana, CU",
      logoUrl: "/work/emsifarma.avif",
      start: "2025-03",
      end: "2025-12",
    },
    {
      id: "ecos",
      company: "Ecos Productions",
      badges: [],
      href: "https://www.ecosvideos.com",
      location: "Mayabeque, CU",
      logoUrl: "/work/ecos.avif",
      start: "2025-03",
      end: "2025-06",
    },
    {
      id: "medialityc",
      company: "Medialityc",
      badges: [],
      href: "https://github.com/medialityc/",
      location: "Havana, CU",
      logoUrl: "/work/medialityc.avif",
      start: "2024-10",
      end: "2025-06",
    },
    {
      id: "aica",
      company: "AICA+ Pharmaceutical Laboratories",
      badges: [],
      href: "https://aica.cu",
      location: "Havana, CU",
      logoUrl: "/work/aica.avif",
      start: "2024-05",
      end: "2026-09",
    },
    {
      id: "cujae-prof",
      company: "Faculty of Computer Engineering at CUJAE",
      badges: [],
      href: "https://cujae.cu",
      location: "Havana, CU",
      logoUrl: "/work/cujae.avif",
      start: "2023-01",
      end: "2025-03",
    },
    {
      id: "alsoftpro",
      company: "AlsoftPro",
      badges: [],
      href: "https://www.directoriocubano.info/empresas/alsoftpro/",
      location: "Havana, CU",
      logoUrl: "/work/alsofpro.avif",
      start: "2023-12",
      end: "2024-07",
    },
    {
      id: "cujae-econ",
      company: "CUJAE Economics Department",
      badges: [],
      href: "https://cujae.cu",
      location: "Havana, CU",
      logoUrl: "/work/cujae.avif",
      start: "2021-06",
      end: "2022-04",
    },
  ],
  education: [
    {
      id: "cujae",
      school: "CUJAE",
      href: "https://cujae.cu",
      logoUrl: "/work/cujae.avif",
      start: "2022-04",
      end: "2025-03",
      thesis: {
        repository:
          "https://repositorio.cujae.edu.cu/items/4fafa995-04f7-4c3e-ba52-8f375b4b0129",
        download:
          "https://repositorio.cujae.edu.cu/server/api/core/bitstreams/a105cbae-d41c-4fde-b1b3-81cc6c99e315/content",
      },
    },
  ],
  projects: [
    {
      id: "sudoku",
      title: "🔢 Sudoku Play",
      href: "https://sudoku-play.onrender.com",
      date: "2024-08",
      technologies: ["HTML", "CSS", "JS"],
      links: [
        {
          type: "Website",
          href: "https://sudoku-play.onrender.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/EduardoProfe666/sudoku-play",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/sudoku-play.avif",
      video: "",
    },
    {
      id: "une",
      title: "⚡ UNE Unwrapped",
      href: "https://une-unwrapped.vercel.app",
      date: "2025-12",
      technologies: ["Python", "Telethon", "React.js"],
      links: [
        {
          type: "Source",
          href: "https://github.com/EduardoProfe666/une-unwrapped-habana",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Website",
          href: "https://une-unwrapped.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/une-unwrapped.avif",
      video: "",
    },
    {
      id: "api",
      title: "🌌 Custom API",
      href: "https://eduardoprofe666.github.io/api-personalizada-wiki-vuepress/",
      date: "2022-11",
      technologies: ["Java", "Java Swing"],
      links: [
        {
          type: "Documentation",
          href: "https://eduardoprofe666.github.io/api-personalizada-wiki-vuepress/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/EduardoProfe666/Proyecto-Api-Personalizada",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/api-personalizada.avif",
      video: "",
    },
    {
      id: "weather",
      title: "🌤️ Weather App",
      href: "https://the-cool-weather-app.onrender.com/",
      date: "2025-04",
      technologies: ["Next.js", "Tailwind", "OpenMeteo"],
      links: [
        {
          type: "Website",
          href: "https://the-cool-weather-app.onrender.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/EduardoProfe666/weather-app",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/weather-app.avif",
      video: "",
    },
    {
      id: "anime",
      title: "⚔️ Download Anime Free Bot",
      href: "https://t.me/descargar_anime_free_bot",
      date: "2024-07",
      technologies: ["Python", "Web Scrapping", "Telegram API"],
      links: [
        {
          type: "Telegram",
          href: "https://t.me/descargar_anime_free_bot",
          icon: <Icons.telegram className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/EduardoProfe666/Descargar-Anime-Free-Bot",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/bot.avif",
      video: "",
    },
    {
      id: "password",
      title: "🔐 Password Security Toolkit",
      href: "https://password-security-toolkit.onrender.com/",
      date: "2024-03",
      technologies: ["React", "Password", "Tailwind"],
      links: [
        {
          type: "Website",
          href: "https://password-security-toolkit.onrender.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/EduardoProfe666/password-generator",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/password-generator.avif",
      video: "",
    },
  ],
  events: [
    {
      id: "icpc2024",
      title: "ICPC Caribbean",
      dates: "2024",
      location: "Caribbean",
      // Declared here rather than sniffed out of the description: the card used
      // to match /winner|first place/ against text that is translated, so the
      // trophy only ever appeared in English.
      award: true,
      image: "/logos/icpc.avif",
      links: [],
    },
    {
      id: "icpc2023",
      title: "ICPC Caribbean",
      dates: "2023",
      location: "Caribbean",
      award: false,
      image: "/logos/icpc.avif",
      links: [],
    },
    {
      id: "copa2023",
      title: "Copa Cujae",
      dates: "2023",
      location: "Cujae, Havana",
      award: true,
      image: "/work/cujae.avif",
      links: [],
    },
    {
      id: "yuca",
      title: "Yuca Awards",
      dates: "2022 - 2023",
      location: "Cujae, Havana",
      award: true,
      image: "/work/cujae.avif",
      links: [
        {
          title: "Custom API",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/EduardoProfe666/Proyecto-Api-Personalizada",
        },
        {
          title: "YouTube Channel",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://youtube.com/@EduardoProfeCujae",
        },
      ],
    },
  ],
} as const;

export type WorkId = (typeof DATA.work)[number]["id"];
export type ProjectId = (typeof DATA.projects)[number]["id"];
export type EventId = (typeof DATA.events)[number]["id"];
export type EducationId = (typeof DATA.education)[number]["id"];
