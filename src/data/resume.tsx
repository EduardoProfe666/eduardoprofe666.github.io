import { Icons } from "@/components/main/icons";

export const DATA = {
  name: "Eduardo González",
  initials: "EG",
  url: "https://eduardoprofe666.github.io",
  location: "Havana, CU",
  locationLink: "https://www.google.com/maps/place/havana",
  description:
    "\n" +
    "Computer Engineering graduate, passionate about software development and helping others. Active GitHub contributor.",
  summary:
    "I graduated with Gold Title honors from [Technological University of Havana](/#education) (CUJAE) in March 2025. Over my academic and professional journey, I've gained valuable experience through [various professional roles](/#work) and [competitive events](/#events). I'm passionate about my work and eager to continue learning and implementing [cutting-edge technologies](/#skills).",
  avatarUrl: "/me.jpg",
  skill_slugs: [
    "python",
    "typescript",
    "javascript",
    "java",
    "dotnet",
    "react",
    "nextjs",
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
      company: "AIKoders LLC",
      badges: [],
      href: "https://aikoders.tech/",
      location: "Miami, Florida, USA",
      title: "Lead Fullstack Developer | AI Architect",
      logoUrl: "/work/aikoders.png",
      start: "January 2026",
      end: "Present",
      description:
       "Leading the design and development of scalable enterprise solutions using Next.js, focusing on process optimization through the strategic integration of Artificial Intelligence. Implementing complex automation workflows with n8n to bridge AI services with core business logic, successfully reducing operational costs and significantly increasing the value delivered to end clients." 
    },
    {
      company: "Codes SRL",
      badges: [],
      href: "https://www.codestic.net/",
      location: "Havana, CU",
      title: "Backend Developer",
      logoUrl: "/work/codes.png",
      start: "May 2025",
      end: "January 2026",
      description:
        "Developed the backend for the transnational e-commerce platform srmercado.com, implementing a microservices architecture in .NET based on Clean Architecture principles, CQRS, and event-driven communication using RabbitMQ. I managed storage and content delivery infrastructure via AWS (S3 and CloudFront CDN), later leading the migration to an on-premise solution with MinIO to meet strict data sovereignty requirements. Additionally, I ensured the platform's financial operability by integrating multiple international payment gateways—including Monei, PayNoPain (PayLands), and RedSys—guaranteeing secure and efficient cross-border transaction flows.",
    },
    {
      company: "EMSI FARMA TECH",
      badges: [],
      href: "https://www.emsifarma.com",
      location: "Havana, CU",
      title: "Software Engineer",
      logoUrl: "/work/emsifarma.png",
      start: "March 2025",
      end: "December 20225",
      description:
        "Driven the digital transformation toward Industry 4.0 by developing an integrated MES/SCADA system using .NET and Next.js, incorporating WSO2 Identity Server to ensure robust and secure identity management. Additionally, I led the optimization of legal workflows and complex case management by implementing agentic solutions with n8n. This initiative automated critical processes for multi-sector companies, significantly increasing operational efficiency through the deployment of intelligent, automated workflows."
    },
    {
      company: "Ecos Productions",
      badges: [],
      href: "https://www.ecosvideos.com",
      location: "Mayabeque, CU",
      title: "Fullstack Developer",
      logoUrl: "/work/ecos.jpg",
      start: "March 2025",
      end: "June 2025",
      description:
        "Leaded the development of the Gesel system for the Cuban Law Firm Association, implementing a comprehensive legal management solution using Angular.js, Tailwind CSS, Express.js, and MySQL. Focus on improving legal workflow efficiency and case management.",
    },
    {
      company: "Medialityc",
      badges: [],
      href: "https://github.com/medialityc/",
      location: "Havana, CU",
      title: "Backend Developer / Project Manager",
      logoUrl: "/work/medialityc.png",
      start: "October 2024",
      end: "June 2025",
      description:
        "Developed backend solutions for company projects while leading full-stack development teams. Responsible for technical decision-making, team mentoring, and ensuring project delivery excellence across multiple development teams.",
    },
    {
      company: "AICA+ Pharmaceutical Laboratories",
      href: "https://aica.cu",
      badges: [],
      location: "Havana, CU",
      title: "Software Engineer",
      logoUrl: "/work/aica.png",
      start: "May 2024",
      end: "Present",
      description:
        "Developed a .NET and Razor Pages web application for document management in the Quality Management Department, integrating PostgreSQL and MinIO. Successfully implemented a Production Assurance Strategy system using Nest.JS and Next.JS that optimizes production considering product constraints, resources, and storage limitations, utilizing PostgreSQL and MongoDB.",
    },
    {
      company: "Faculty of Computer Engineering at CUJAE",
      href: "https://cujae.cu",
      badges: [],
      location: "Havana, CU",
      title: "Teaching Assistant / Professor",
      logoUrl: "/work/cujae.png",
      start: "January 2023",
      end: "March 2025",
      description:
        "Taught first and second-year Computer Engineering courses, including Introduction to Programming, Interface Design and Testing, Object-Oriented Programming, and Data Structures. Also taught Web Programming for third-year Computer Engineering students.",
    },
    {
      company: "AlsoftPro",
      badges: [],
      href: "https://www.directoriocubano.info/empresas/alsoftpro/",
      location: "Havana, CU",
      title: "Software Engineer",
      logoUrl: "/work/alsofpro.png",
      start: "December 2023",
      end: "July 2024",
      description:
        "Co-developed the backend for two modules (Contracting and Services) for ALCOM, Havana's Water Company, using Django and Django Rest Framework.",
    },
    {
      company: "CUJAE Economics Department",
      href: "https://cujae.cu",
      badges: [],
      location: "Havana, CU",
      title: "Accountant E",
      logoUrl: "/work/cujae.png",
      start: "June 2021",
      end: "April 2022",
      description:
        "Managed inventory systems, accounting, and conducted audits of university warehouses and assets.",
    },
  ],
  education: [
    {
      school: "CUJAE",
      href: "https://cujae.cu",
      degree: "Computer Engineering Graduate - Gold Title Honors",
      logoUrl: "/work/cujae.png",
      start: "2022",
      end: "March 2025",
    },
  ],
  projects: [
    {
      title: "🔢 Sudoku Play",
      href: "https://sudoku-play.onrender.com",
      dates: "August 2024",
      active: true,
      description:
        "Simple Sudoku game developed as an installable Progressive Web App with online/offline functionality",
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
      image: "/projects/sudoku-play.png",
      video: "",
    },
    {
      title: "⚡ UNE Unwrapped",
      href: "https://une-unwrapped-habana.vercel.app",
      dates: "December 2025",
      active: true,
      description:
        "A website for displaying statistics about UNE's public Telegram channel in Havana",
      technologies: ["Python", "Telethon", "React.js"],
      links: [
        {
          type: "Source",
          href: "https://github.com/EduardoProfe666/une-unwrapped-habana",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Website",
          href: "https://une-unwrapped-habana.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/une-unwrapped.png",
      video: "",
    },
    {
      title: "🌌 Custom API",
      href: "https://eduardoprofe666.github.io/api-personalizada-wiki-vuepress/",
      dates: "2022 - Present",
      active: true,
      description:
        "Java API project featuring visual components (Java Swing), logical functionalities, and utilities.",
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
      image: "/projects/api-personalizada.png",
      video: "",
    },
    {
      title: "🌤️ Weather App",
      href: "https://the-cool-weather-app.onrender.com/",
      dates: "April 2025",
      active: true,
      description: "Weather App powered by Open-Meteo",
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
      image: "/projects/weather-app.png",
      video: "",
    },
    {
      title: "⚔️ Download Anime Free Bot",
      href: "https://t.me/descargar_anime_free_bot",
      dates: "July 2024",
      active: true,
      description: "Telegram bot for downloading Spanish-subtitled anime",
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
      image: "/projects/bot.png",
      video: "",
    },
    {
      title: "🔐 Password Security Toolkit",
      href: "https://password-security-toolkit.onrender.com/",
      dates: "March 2024",
      active: true,
      description:
        "A set of tools for password security, including a password generator, strength checker, and entropy calculator.",
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
      image: "/projects/password-generator.png",
      video: "",
    },
  ],
  events: [
    {
      title: "ICPC Caribbean",
      dates: "2024",
      location: "Caribbean",
      description:
        "Winner of the ICPC programming competition at the Caribbean level. Qualified for the next round at Latin America level",
      image: "/logos/icpc.ico",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "ICPC Caribbean",
      dates: "2023",
      location: "Caribbean",
      description:
        "Honorable mention in the ICPC programming competition at the Caribbean level.",
      image: "/logos/icpc.ico",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Copa Cujae",
      dates: "2023",
      location: "Cujae, Havana",
      description: "First Place in the event with my team Error404",
      image: "/work/cujae.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Yuca Awards",
      dates: "2022 - 2023",
      location: "Cujae, Havana",
      description:
        "First Place award for educational programming videos and resources.",
      icon: "/work/cujae.png",
      image: "/work/cujae.png",
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
