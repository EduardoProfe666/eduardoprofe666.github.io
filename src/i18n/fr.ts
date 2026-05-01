import { Translations } from "./types";

const fr: Translations = {
  // UI
  "hero.greeting": "Salut, je suis Eduardo",
  "hero.description":
    "Team Lead Fullstack & Ingénieur IA avec plus de 4 ans d'expérience. Je crée des solutions évolutives avec des stacks modernes, l'intégration de l'IA et des pratiques DevOps.",
  "about.title": "À propos",
  "about.summary":
    "Je suis diplômé en **Ingénierie Informatique** avec la mention **Titre d'Or** de [CUJAE](/#education) et plus de **4 ans d'expérience** dans le développement logiciel fullstack. Je dirige actuellement des équipes de développement et conçois des solutions d'entreprise intégrant **l'IA, les workflows d'automatisation et l'infrastructure cloud** (AWS, DigitalOcean, Vercel). Mon parcours s'étend des [systèmes distribués orientés backend](/#work) à l'[ingénierie frontend](/#work), avec des compétences pratiques en DevOps et infrastructure incluant **Docker, les pipelines CI/CD et les déploiements cloud**. Je m'épanouis dans les environnements dynamiques et j'apprécie le mentorat d'équipes, la participation à des [compétitions de programmation](/#events) et l'exploration des limites des [technologies modernes](/#skills).",
  "work.title": "Expérience Professionnelle",
  "education.title": "Formation",
  "skills.title": "Compétences",
  "skills.loading": "Chargement des compétences...",
  "projects.title": "Mes Projets",
  "projects.subtitle":
    "J'ai travaillé sur une variété de projets. Voici quelques-uns de mes préférés. Vous pouvez en voir plus sur mon {github}.",
  "events.title": "Événements",
  "events.subtitle": "J'ai participé à {count} événements et compétitions.",
  "contact.chip": "Contact",
  "contact.heading": "Contactez-moi",
  "contact.description":
    "Envie de discuter ? Envoyez-moi un message et je vous répondrai dès que possible.",
  "contact.cta": "Envoyez-moi un e-mail",
  "nav.resume": "CV",
  "nav.github": "GitHub",
  "nav.theme": "Changer le thème",
  "nav.language": "Langue",
  "thesis.label": "Thèse",
  "thesis.repository": "Dépôt",
  "thesis.download": "Télécharger",
  "duration.andCounting": "et plus",
  "duration.year": "an",
  "duration.years": "ans",
  "duration.month": "mois",
  "duration.months": "mois",
  "timeago.thisMonth": "ce mois-ci",
  "timeago.ago": "il y a",
  "timeago.andCounting": "et plus",

  // Work entries
  "work.aikoders.title": "Team Lead Fullstack | Ingénieur IA | DevOps",
  "work.aikoders.description":
    "Direction de l'architecture et du développement fullstack de multiples plateformes en production servant des centaines d'utilisateurs, dont EasySalon (gestion de salons), Guest Concierge AI (assistant IA pour hôtes) et Easy Cargo Express (logistique e-commerce). Gestion et mentorat de plusieurs équipes de développement pluridisciplinaires couvrant le frontend, le backend, le mobile et l'IA. Responsable de l'ensemble du pipeline DevOps et d'infrastructure — optimisation des déploiements sur AWS, DigitalOcean et Vercel. Création de workflows d'automatisation agentique multiplateforme avec n8n pour connecter les services d'IA à la logique métier. Intégration de passerelles de paiement (Clover, Stripe, Square) dans les systèmes en production. Développement d'applications mobiles natives avec React Native, publiées sur Google Play Store et Apple App Store.",
  "work.codes.title": "Développeur Backend",
  "work.codes.description":
    "Développement du backend de la plateforme e-commerce transnationale srmercado.com, en implémentant une architecture microservices en .NET basée sur les principes de Clean Architecture, CQRS et la communication événementielle via RabbitMQ. Gestion de l'infrastructure de stockage et de diffusion de contenu via AWS (S3 et CloudFront CDN), puis direction de la migration vers une solution on-premise avec MinIO pour répondre aux exigences strictes de souveraineté des données. Intégration de multiples passerelles de paiement internationales — dont Monei, PayNoPain (PayLands) et RedSys — garantissant des flux de transactions transfrontalières sécurisés et efficaces.",
  "work.emsifarma.title": "Ingénieur Logiciel",
  "work.emsifarma.description":
    "Conduite de la transformation numérique vers l'Industrie 4.0 par le développement d'un système MES/SCADA intégré utilisant .NET et Next.js, incorporant WSO2 Identity Server pour assurer une gestion d'identité robuste et sécurisée. Direction de l'optimisation des workflows juridiques et de la gestion de dossiers complexes par l'implémentation de solutions agentiques avec n8n. Cette initiative a automatisé des processus critiques pour des entreprises multi-sectorielles, augmentant significativement l'efficacité opérationnelle grâce au déploiement de workflows intelligents et automatisés.",
  "work.ecos.title": "Développeur Fullstack",
  "work.ecos.description":
    "Direction du développement du système Gesel pour l'Association Cubaine des Cabinets d'Avocats, en implémentant une solution complète de gestion juridique utilisant Angular.js, Tailwind CSS, Express.js et MySQL. Accent mis sur l'amélioration de l'efficacité des workflows juridiques et de la gestion des dossiers.",
  "work.medialityc.title": "Développeur Backend / Chef de Projet",
  "work.medialityc.description":
    "Développement de solutions backend pour les projets de l'entreprise tout en dirigeant des équipes de développement fullstack. Responsable des décisions techniques, du mentorat d'équipe et de l'excellence dans la livraison des projets au sein de plusieurs équipes de développement.",
  "work.aica.title": "Ingénieur Logiciel",
  "work.aica.description":
    "Développement d'une application web .NET et Razor Pages pour la gestion documentaire au sein du Département de Management de la Qualité, intégrant PostgreSQL et MinIO. Implémentation réussie d'un système de Stratégie d'Assurance Production utilisant Nest.JS et Next.JS qui optimise la production en tenant compte des contraintes produits, des ressources et des limitations de stockage, utilisant PostgreSQL et MongoDB.",
  "work.cujae-prof.title": "Assistant d'Enseignement / Professeur",
  "work.cujae-prof.description":
    "Enseignement de cours de première et deuxième année en Ingénierie Informatique, incluant Introduction à la Programmation, Conception d'Interfaces et Tests, Programmation Orientée Objet et Structures de Données. Enseignement également de la Programmation Web pour les étudiants de troisième année en Ingénierie Informatique.",
  "work.alsoftpro.title": "Ingénieur Logiciel",
  "work.alsoftpro.description":
    "Co-développement du backend de deux modules (Contrats et Services) pour ALCOM, l'entreprise des eaux de La Havane, utilisant Django et Django Rest Framework.",
  "work.cujae-econ.title": "Comptable E",
  "work.cujae-econ.description":
    "Gestion des systèmes d'inventaire, de la comptabilité et réalisation d'audits des entrepôts et des actifs universitaires.",

  // Education
  "education.cujae.degree":
    "Diplômé en Ingénierie Informatique - Mention Titre d'Or (Moyenne : 5.0/5.0)",

  // Projects
  "project.sudoku.description":
    "Jeu de Sudoku simple développé comme Progressive Web App installable avec fonctionnalité en ligne/hors ligne",
  "project.une.description":
    "Un site web pour afficher les statistiques de la chaîne Telegram publique d'UNE à La Havane",
  "project.api.description":
    "Projet d'API Java comprenant des composants visuels (Java Swing), des fonctionnalités logiques et des utilitaires.",
  "project.weather.description":
    "Application météo alimentée par Open-Meteo",
  "project.anime.description":
    "Bot Telegram pour télécharger des animes sous-titrés en espagnol",
  "project.password.description":
    "Un ensemble d'outils pour la sécurité des mots de passe, incluant un générateur de mots de passe, un vérificateur de robustesse et un calculateur d'entropie.",

  // Events
  "event.icpc2024.description":
    "Vainqueur de la compétition de programmation ICPC au niveau caribéen. Qualifié pour le tour suivant au niveau Amérique latine",
  "event.icpc2023.description":
    "Mention honorable à la compétition de programmation ICPC au niveau caribéen.",
  "event.copa2023.description":
    "Première place à l'événement avec mon équipe Error404",
  "event.yuca.description":
    "Prix de la première place pour des vidéos et ressources pédagogiques de programmation.",
};

export default fr;
