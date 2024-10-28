import {Icons} from "@/components/main/icons";

export const DATA = {
    name: "Eduardo González",
    initials: "EG",
    url: "https://eduardoprofe666.github.io",
    location: "Havana, CU",
    locationLink: "https://www.google.com/maps/place/havana",
    description:
        "\n" +
        "Estudiante de cuarto año en Ingeniería Informática en la CUJAE, con pasión por la creación y el apoyo a otros. Activo en GitHub.",
    summary:
        "Comencé la carrera de Ingeniería Informática en la [Universidad Tecnológica de La Habana](/#education) (CUJAE) a mediados de 2021. Durante dos años, he [trabajado en varias empresas](/#work) y participado en [múltiples eventos](/#events), lo que ha fortalecido mi experiencia. Me apasiona mi trabajo y tengo el deseo de continuar aprendiendo y aplicando [nuevas tecnologías](/#skills).",
    avatarUrl: "/me.png",
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
        "railway",
        "docker",
        "git",
        "github",
        "gitlab",
        "vite",
        "githubpages",
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
            Correo: {
                url: "mailto:eduardoglez64377@gmail.com",
                icon: Icons.mail,
            }
            , LinkedIn: {
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
            company: "Mdialityc",
            badges: ["actual"],
            href: "https://github.com/Mdialityc",
            location: "La Habana, CU",
            title: "Desarrollador Backend",
            logoUrl: "/work/mdialityc.png",
            start: "Octubre 2024",
            end: "Presente",
            description:
                "Actualmente desarrollando backend para los proyectos de la empresa.",
        },
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
            badges: ["actual"],
            location: "La Habana, CU",
            title: "Asistente Técnico de la Docencia (Profesor)",
            logoUrl: "/work/cujae.png",
            start: "Enero 2023",
            end: "Presente",
            description:
                "Impartí clases en primer y segundo año de Ingeniería Informática, abarcando materias como Introducción a la Programación, Diseño de Interfaces y Pruebas, Programación Orientada a Objetos, y Estructuras de Datos. Actualmente estoy impartiendo clases de Programación Web para tercer año de Ingeniería Informática",
        },
        {
            company: "AlsoftPro",
            badges: [],
            href: "https://www.directoriocubano.info/empresas/alsoftpro/",
            location: "La Habana, CU",
            title: "Ingeniero Informático",
            logoUrl: "/work/alsofpro.png",
            start: "Diciembre 2023",
            end: "Julio 2023",
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
                "Trabajé en sistemas de inventario, contabilidad y auditorías a almacenes y bienes de la universidad",
        },
    ],
    education: [
        {
            school: "CUJAE",
            href: "https://cujae.cu",
            degree: "Estudiante de 4to año de Ingeniería Informática",
            logoUrl: "/work/cujae.png",
            start: "2022",
            end: "Presente",
        },
    ],
    projects: [
        {
            title: "🔢 Sudoku Play",
            href: "https://sudoku-play.onrender.com",
            dates: "Agosto 2024",
            active: true,
            description:
                "Simple juego de sudoku, creado como una Progressive Web App instalable, que funciona On/Offline",
            technologies: [
                "HTML",
                "CSS",
                "JS",
            ],
            links: [
                {
                    type: "Sitio Web",
                    href: "https://sudoku-play.onrender.com",
                    icon: <Icons.globe className="size-3"/>,
                },
                {
                    type: "Fuente",
                    href: "https://github.com/EduardoProfe666/sudoku-play",
                    icon: <Icons.github className="size-3"/>,
                },
            ],
            image: '/projects/sudoku-play.png',
            video:
                "",
        },
        {
            title: "📸 PyImageEditor",
            href: "https://github.com/EduardoProfe666/PyImageEditor",
            dates: "Enero 2024",
            active: true,
            description:
                "Editor simple de imágenes en Python",
            technologies: [
                "Python",
                "CustomTkinter",
                "PIL",
            ],
            links: [
                {
                    type: "Fuente",
                    href: "https://github.com/EduardoProfe666/PyImageEditor",
                    icon: <Icons.github className="size-3"/>,
                },
            ],
            image: "/projects/pyimageeditor.png",
            video: "",
        },
        {
            title: "🌌 Api Personalizada",
            href: "https://eduardoprofe666.github.io/api-personalizada-wiki-vuepress/",
            dates: "2022 - Presente",
            active: true,
            description:
                "Proyecto de una api en Java con componentes visuales (Java Swing), funcionalidades y utilidades lógicas.",
            technologies: [
                "Java",
                "Java Swing",
            ],
            links: [
                {
                    type: "Documentación",
                    href: "https://eduardoprofe666.github.io/api-personalizada-wiki-vuepress/",
                    icon: <Icons.globe className="size-3"/>,
                },
                {
                    type: "Fuente",
                    href: "https://github.com/EduardoProfe666/Proyecto-Api-Personalizada",
                    icon: <Icons.github className="size-3"/>,
                },
            ],
            image: "/projects/api-personalizada.png",
            video: "",
        },
        {
            title: "🚀 Fastapi-Calculator",
            href: "https://github.com/EduardoProfe666/Fastapi-Calculator",
            dates: "Enero 2024",
            active: true,
            description:
                "Api de Calculadora que contiene cálculo básico, conversión (divisas incluidas), trigonometría, calculadora, estadística y más",
            technologies: [
                "Fastapi",
                "Python",
            ],
            links: [
                {
                    type: "Sitio Web",
                    href: "https://fastapi-calculadora.onrender.com/",
                    icon: <Icons.globe className="size-3"/>,
                },
                {
                    type: "Fuente",
                    href: "https://github.com/EduardoProfe666/fastapi-calculadora",
                    icon: <Icons.github className="size-3"/>,
                },
            ],
            image: "/projects/fastapi-calculadora.png",
            video:
                "",
        },
        {
            title: "⚔️ Descargar Anime Free Bot",
            href: "https://t.me/descargar_anime_free_bot",
            dates: "Julio 2024",
            active: true,
            description:
                "Bot de telegram para descargar animes subtitulados al español",
            technologies: [
                "Python",
                "Web Scrapping",
                "Telegram API"
            ],
            links: [
                {
                    type: "Telegram",
                    href: "https://t.me/descargar_anime_free_bot",
                    icon: <Icons.telegram className="size-3"/>,
                },
                {
                    type: "Fuente",
                    href: "https://github.com/EduardoProfe666/Descargar-Anime-Free-Bot",
                    icon: <Icons.github className="size-3"/>,
                },
            ],
            image: "/projects/bot.png",
            video:
                "",
        },
        {
            title: "💔 Perdoname ",
            href: "https://perdoname.onrender.com/",
            dates: "Marzo 2024",
            active: true,
            description:
                "Proyecto para los bros que necesitan el perdón",
            technologies: [
                "HTML",
                "CSS",
                "JS"
            ],
            links: [
                {
                    type: "Sitio Web",
                    href: "https://perdoname.onrender.com/",
                    icon: <Icons.globe className="size-3"/>,
                },
                {
                    type: "Fuente",
                    href: "https://github.com/EduardoProfe666/Perdoname",
                    icon: <Icons.github className="size-3"/>,
                },
            ],
            image: "/projects/perdoname.png",
            video:
                "",
        },
    ],
    events: [
        {
            title: "ICPC Caribe",
            dates: "2024",
            location: "Caribe",
            description:
                "Ganador en concurso de programación de la ICPC a nivel del Caribe. Clasificado a la siguiente ronda a nivel de América Latina",
            image:
                "/logos/icpc.ico",
            mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
            links: [],
        },
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
                    icon: <Icons.youtube className="h-4 w-4"/>,
                    href: "https://youtube.com/@EduardoProfeCujae",
                }
            ],
        },
    ],
} as const;
