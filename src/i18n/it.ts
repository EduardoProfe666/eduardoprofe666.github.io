import { Translations } from "./types";

const it: Translations = {
  // UI
  "hero.greeting": "Ciao, sono Eduardo",
  "hero.description":
    "Team Lead Fullstack & Ingegnere IA con oltre 4 anni di esperienza. Sviluppo soluzioni scalabili con stack moderni, integrazione IA e pratiche DevOps.",
  "about.title": "Chi sono",
  "about.summary":
    "Sono laureato in **Ingegneria Informatica** con **Titolo d'Oro** presso [CUJAE](/#education) e oltre **4 anni di esperienza** nello sviluppo software fullstack. Attualmente dirigo team di sviluppo e progetto soluzioni enterprise che integrano **IA, workflow di automazione e infrastruttura cloud** (AWS, DigitalOcean, Vercel). Il mio background spazia dai [sistemi distribuiti orientati al backend](/#work) all'[ingegneria frontend](/#work), con competenze pratiche in DevOps e infrastruttura tra cui **Docker, pipeline CI/CD e deployment cloud**. Mi trovo a mio agio in ambienti dinamici e mi piace fare mentoring ai team, partecipare a [competizioni di programmazione](/#events) e spingermi oltre i limiti delle [tecnologie moderne](/#skills).",
  "work.title": "Esperienza Lavorativa",
  "education.title": "Formazione",
  "skills.title": "Competenze",
  "skills.loading": "Caricamento competenze...",
  "projects.title": "I Miei Progetti",
  "projects.subtitle":
    "Ho lavorato su una varietà di progetti. Ecco alcuni dei miei preferiti. Puoi vederne altri sul mio {github}.",
  "events.title": "Eventi",
  "events.subtitle": "Ho partecipato a {count} eventi e competizioni.",
  "contact.chip": "Contatto",
  "contact.heading": "Contattami",
  "contact.description":
    "Vuoi chiacchierare? Mandami un messaggio e ti risponderò appena possibile.",
  "contact.cta": "Inviami un'e-mail",
  "nav.resume": "Curriculum",
  "nav.github": "GitHub",
  "nav.theme": "Cambia tema",
  "nav.language": "Lingua",
  "thesis.label": "Tesi",
  "thesis.repository": "Repository",
  "thesis.download": "Scarica",
  "duration.andCounting": "e oltre",
  "duration.year": "anno",
  "duration.years": "anni",
  "duration.month": "mese",
  "duration.months": "mesi",
  "timeago.thisMonth": "questo mese",
  "timeago.ago": "fa",
  "timeago.andCounting": "e oltre",

  // Work entries
  "work.aikoders.title": "Team Lead Fullstack | Ingegnere IA | DevOps",
  "work.aikoders.description":
    "Direzione dell'architettura e dello sviluppo fullstack di molteplici piattaforme in produzione che servono centinaia di utenti, tra cui EasySalon (gestione saloni), Guest Concierge AI (assistente IA per host) ed Easy Cargo Express (logistica e-commerce). Gestione e mentoring di diversi team di sviluppo interfunzionali nei settori frontend, backend, mobile e IA. Responsabilità dell'intera pipeline DevOps e infrastruttura — ottimizzazione dei deployment su AWS, DigitalOcean e Vercel. Creazione di workflow di automazione agentici multipiattaforma con n8n per collegare i servizi IA alla logica di business. Integrazione di gateway di pagamento (Clover, Stripe, Square) nei sistemi in produzione. Sviluppo di applicazioni mobili native con React Native, pubblicate su Google Play Store e Apple App Store.",
  "work.codes.title": "Sviluppatore Backend",
  "work.codes.description":
    "Sviluppo del backend per la piattaforma e-commerce transnazionale srmercado.com, implementando un'architettura a microservizi in .NET basata sui principi di Clean Architecture, CQRS e comunicazione event-driven tramite RabbitMQ. Gestione dell'infrastruttura di storage e content delivery tramite AWS (S3 e CloudFront CDN), successivamente direzione della migrazione verso una soluzione on-premise con MinIO per soddisfare rigorosi requisiti di sovranità dei dati. Integrazione di molteplici gateway di pagamento internazionali — tra cui Monei, PayNoPain (PayLands) e RedSys — garantendo flussi di transazioni transfrontaliere sicuri ed efficienti.",
  "work.emsifarma.title": "Ingegnere Software",
  "work.emsifarma.description":
    "Guida della trasformazione digitale verso l'Industria 4.0 attraverso lo sviluppo di un sistema MES/SCADA integrato utilizzando .NET e Next.js, incorporando WSO2 Identity Server per garantire una gestione dell'identità robusta e sicura. Direzione dell'ottimizzazione dei workflow legali e della gestione di casi complessi attraverso l'implementazione di soluzioni agentiche con n8n. Questa iniziativa ha automatizzato processi critici per aziende multi-settore, aumentando significativamente l'efficienza operativa tramite il deployment di workflow intelligenti e automatizzati.",
  "work.ecos.title": "Sviluppatore Fullstack",
  "work.ecos.description":
    "Direzione dello sviluppo del sistema Gesel per l'Associazione Cubana degli Studi Legali, implementando una soluzione completa di gestione legale utilizzando Angular.js, Tailwind CSS, Express.js e MySQL. Focus sul miglioramento dell'efficienza dei workflow legali e della gestione dei casi.",
  "work.medialityc.title": "Sviluppatore Backend / Project Manager",
  "work.medialityc.description":
    "Sviluppo di soluzioni backend per i progetti aziendali, dirigendo contemporaneamente team di sviluppo fullstack. Responsabile delle decisioni tecniche, del mentoring del team e dell'eccellenza nella consegna dei progetti attraverso diversi team di sviluppo.",
  "work.aica.title": "Ingegnere Software",
  "work.aica.description":
    "Sviluppo di un'applicazione web .NET e Razor Pages per la gestione documentale nel Dipartimento di Gestione della Qualità, integrando PostgreSQL e MinIO. Implementazione di successo di un sistema di Strategia di Assicurazione della Produzione utilizzando Nest.JS e Next.JS che ottimizza la produzione considerando vincoli di prodotto, risorse e limitazioni di stoccaggio, utilizzando PostgreSQL e MongoDB.",
  "work.cujae-prof.title": "Assistente alla Didattica / Professore",
  "work.cujae-prof.description":
    "Insegnamento di corsi del primo e secondo anno di Ingegneria Informatica, tra cui Introduzione alla Programmazione, Progettazione di Interfacce e Testing, Programmazione Orientata agli Oggetti e Strutture Dati. Insegnamento anche di Programmazione Web per studenti del terzo anno di Ingegneria Informatica.",
  "work.alsoftpro.title": "Ingegnere Software",
  "work.alsoftpro.description":
    "Co-sviluppo del backend di due moduli (Contrattualistica e Servizi) per ALCOM, l'azienda idrica de L'Avana, utilizzando Django e Django Rest Framework.",
  "work.cujae-econ.title": "Contabile E",
  "work.cujae-econ.description":
    "Gestione dei sistemi di inventario, contabilità e conduzione di audit dei magazzini e dei beni universitari.",

  // Education
  "education.cujae.degree":
    "Laureato in Ingegneria Informatica - Titolo d'Oro (Media: 5.0/5.0)",

  // Projects
  "project.sudoku.description":
    "Semplice gioco di Sudoku sviluppato come Progressive Web App installabile con funzionalità online/offline",
  "project.une.description":
    "Un sito web per visualizzare le statistiche del canale Telegram pubblico di UNE a L'Avana",
  "project.api.description":
    "Progetto API Java con componenti visivi (Java Swing), funzionalità logiche e utilità.",
  "project.weather.description": "App meteo basata su Open-Meteo",
  "project.anime.description":
    "Bot Telegram per scaricare anime con sottotitoli in spagnolo",
  "project.password.description":
    "Un insieme di strumenti per la sicurezza delle password, inclusi un generatore di password, un verificatore di robustezza e un calcolatore di entropia.",

  // Events
  "event.icpc2024.description":
    "Vincitore della competizione di programmazione ICPC a livello caraibico. Qualificato per il turno successivo a livello latinoamericano",
  "event.icpc2023.description":
    "Menzione d'onore nella competizione di programmazione ICPC a livello caraibico.",
  "event.copa2023.description":
    "Primo posto nell'evento con il mio team Error404",
  "event.yuca.description":
    "Premio primo posto per video e risorse didattiche di programmazione.",
};

export default it;
