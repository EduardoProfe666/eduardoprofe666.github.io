import {Icons} from "@/components/main/icons";

export const DATA = {
    name: "Eduardo González",
    initials: "EG",
    url: "https://eduardoprofe666.github.io",
    location: "Havana, CU",
    locationLink: "https://www.google.com/maps/place/havana",
    description:
        "\n" +
        "Estudiante de tercer año en Ingeniería Informática en la CUJAE, con pasión por la creación y el apoyo a otros. Activo en GitHub.",
    summary:
        "Comencé la carrera de Ingeniería Informática en la [Universidad Tecnológica de La Habana](/#education) (CUJAE) a mediados de 2021. Durante dos años, he [trabajado en varias empresas](/#work) y participado en [múltiples eventos](/#events), lo que ha fortalecido mi experiencia. Me apasiona mi trabajo y tengo el deseo de continuar aprendiendo y aplicando [nuevas tecnologías](/#skills).",
    avatarUrl: "/me.png",
    skills: [
        "React",
        "Next.js",
        "Typescript",
        "Node.js",
        "Python",
        "Go",
        "Postgres",
        "Docker",
        "Kubernetes",
        "Java",
        "C++",
    ],
    skill_slugs: [
        "gitforwindows",
        "django",
        "typescript",
        "javascript",
        "dotnet",
        "java",
        "react",
        "minio",
        "nextjs",
        "html5",
        "css3",
        "express",
        "python",
        "mongodb",
        "postgresql",
        "jupyter",
        "nestjs",
        "astro",
        "render",
        "jest",
        "railway",
        "docker",
        "git",
        "github",
        "gitlab",
        "vite",
        "githubpages",
        "vercel",
        "redis",
        "fastapi",
        "netlify",
        "tailwindcss",
        "jquery",
        "bootstrap",
        "jinja",
        "githubactions",
        "pypi",
        "c"
    ],
    contact: {
        email: "eduardoprofe666@gmail.com",
        tel: "+53 55839297",
        social: {
            Whatsapp: {
                url: "https://wa.me/5355839297",
                icon: Icons.whatsapp,
            },
            Telegram: {
                url: "https://www.linkedin.com/in/eduardo-gonzalez-23003628a",
                icon: Icons.telegram,
            },
            Correo: {
                url: "mailto:eduardoglez64377@gmail.com",
                icon: Icons.mail,
            }
            ,LinkedIn: {
                url: "https://www.linkedin.com/in/eduardo-gonzalez-23003628a",
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
            company: "Laboratorios Farmacéuticos AICA+",
            href: "https://aica.cu",
            badges: ["actual"],
            location: "La Habana, CU",
            title: "Ingeniero Informático",
            logoUrl: "/work/aica.png",
            start: "Mayo 2024",
            end: "Presente",
            description:
                "Desarrollé una aplicación web en .Net y Razor Pages para la gestión documental del Departamento de Gestión de Calidad, integrando PostgreSQL y MinIO. Actualmente, estoy implementando un sistema de Estrategia de Aseguramiento de la Producción con Nest.JS y Next.JS, diseñado para optimizar la producción considerando limitaciones de productos, recursos y almacenamiento, utilizando PostgreSQL y MongoDB.",
        },
        {
            company: "Facultad de Ingeniería Informática en la CUJAE",
            href: "https://cujae.cu",
            badges: [],
            location: "La Habana, CU",
            title: "Asistente Técnico de la Docencia (Profesor)",
            logoUrl: "/work/cujae.png",
            start: "Enero 2023",
            end: "Presente",
            description:
                "Impartí clases en primer y segundo año de Ingeniería Informática, abarcando materias como Introducción a la Programación, Diseño de Interfaces y Pruebas, Programación Orientada a Objetos, y Estructuras de Datos.",
        },
        {
            company: "AlsoftPro",
            badges: [],
            href: "https://www.directoriocubano.info/empresas/alsoftpro/",
            location: "La Habana, CU",
            title: "Ingeniero Informático",
            logoUrl: "/work/alsofpro.png",
            start: "Diciembre 2023",
            end: "Presente",
            description:
                "Co-desarrollé el backend de dos módulos (Contratación y Servicios) para ALCOM, la compañía de Aguas de La Habana, empleando Django y Django Rest Framework.",
        },
        {
            company: "Departamento de Economía de la CUJAE",
            href: "https://cujae.cu",
            badges: [],
            location: "La Habana, CU",
            title: "Contador E",
            logoUrl: "/work/cujae.png",
            start: "Junio 2021",
            end: "Abril 2022",
            description:
                "Trabajé en sistemas de inventario, contabilidad y auditorías a almacénes y bienes de la universidad",
        },
    ],
    education: [
        {
            school: "CUJAE",
            href: "https://cujae.cu",
            degree: "Estudiante de 3er año de Ingeniería Informática",
            logoUrl: "/work/cujae.png",
            start: "2022",
            end: "Presente",
        },
    ],
    projects: [
        {
            title: "Chat Collect",
            href: "https://chatcollect.com",
            dates: "Jan 2024 - Feb 2024",
            active: true,
            description:
                "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Stripe",
                "Shadcn UI",
                "Magic UI",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://chatcollect.com",
                    icon: <Icons.globe className="size-3"/>,
                },
            ],
            image: "",
            video:
                "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
        },
        {
            title: "Magic UI",
            href: "https://magicui.design",
            dates: "June 2023 - Present",
            active: true,
            description:
                "Designed, developed and sold animated UI components for developers.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Stripe",
                "Shadcn UI",
                "Magic UI",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://magicui.design",
                    icon: <Icons.globe className="size-3"/>,
                },
                {
                    type: "Source",
                    href: "https://github.com/magicuidesign/magicui",
                    icon: <Icons.github className="size-3"/>,
                },
            ],
            image: "",
            video: "https://cdn.magicui.design/bento-grid.mp4",
        },
        {
            title: "llm.report",
            href: "https://llm.report",
            dates: "April 2023 - September 2023",
            active: true,
            description:
                "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Shadcn UI",
                "Magic UI",
                "Stripe",
                "Cloudflare Workers",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://llm.report",
                    icon: <Icons.globe className="size-3"/>,
                },
                {
                    type: "Source",
                    href: "https://github.com/dillionverma/llm.report",
                    icon: <Icons.github className="size-3"/>,
                },
            ],
            image: "",
            video: "https://cdn.llm.report/openai-demo.mp4",
        },
        {
            title: "Automatic Chat",
            href: "https://automatic.chat",
            dates: "April 2023 - March 2024",
            active: true,
            description:
                "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Shadcn UI",
                "Magic UI",
                "Stripe",
                "Cloudflare Workers",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://automatic.chat",
                    icon: <Icons.globe className="size-3"/>,
                },
            ],
            image: "",
            video:
                "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
        },
    ],
    hackathons: [
        {
            title: "ICPC Caribe",
            dates: "2023",
            location: "Caribe",
            description:
                "Mención en concurso de programación de la ICPC a nivel del Caribe.",
            image:
                "/logos/icpc.ico",
            mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
            links: [],
        },
        {
            title: "Copa Cujae",
            dates: "2023",
            location: "Cujae, La Habana",
            description:
                "Primer Lugar en el evento, junto con mi equipo Error404",
            image:
                "/work/cujae.png",
            mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
            links: [],
        },
        {
            title: "Premios Yuca",
            dates: "2022 - 2023",
            location: "Cujae, La Habana",
            description:
                "Primer Lugar en el evento, debido a mis videos y recursos de programación.",
            icon: "/work/cujae.png",
            image:
                "/work/cujae.png",
            links: [
                {
                    title: "Api Personalizada",
                    icon: <Icons.github className="h-4 w-4"/>,
                    href: "https://github.com/EduardoProfe666/Proyecto-Api-Personalizada",
                },
                {
                    title: "Canal de Youtube",
                    icon: <Icons.github className="h-4 w-4"/>,
                    href: "https://youtube.com/@EduardoProfeCujae",
                }
            ],
        },
    ],
} as const;
