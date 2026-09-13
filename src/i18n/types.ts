import type {
  EducationId,
  EventId,
  ProjectId,
  WorkId,
} from "@/data/resume";

export type Locale = "en" | "es" | "fr" | "de" | "it";

/** Keys that are not tied to a résumé entry. */
interface UiTranslations {
  /** Followed by the first name, so it must not include it. */
  "hero.greeting": string;
  "hero.description": string;
  "about.title": string;
  "about.summary": string;
  "work.title": string;
  "education.title": string;
  "skills.title": string;
  "skills.subtitle": string;
  "skills.all": string;
  "skills.group.languages": string;
  "skills.group.frontend": string;
  "skills.group.backend": string;
  "skills.group.cloud": string;
  "skills.group.ai": string;
  "projects.title": string;
  "projects.subtitle": string;
  "events.title": string;
  "events.subtitle": string;
  "contact.chip": string;
  "contact.heading": string;
  "contact.description": string;
  "contact.cta": string;
  "nav.resume": string;
  "nav.github": string;
  "nav.theme": string;
  "nav.soundOn": string;
  "nav.soundOff": string;
  "nav.volume": string;
  "contact.copied": string;
  "cmd.open": string;
  "cmd.placeholder": string;
  "cmd.empty": string;
  "cmd.goto": string;
  "cmd.actions": string;
  "cmd.settings": string;
  "cmd.top": string;
  "cmd.copyEmail": string;
  "cmd.downloadCv": string;
  "cmd.shortcuts": string;
  "keys.spotlight": string;
  "keys.sound": string;
  "keys.help": string;
  "keys.move": string;
  "keys.run": string;
  "keys.close": string;
  "nav.language": string;
  "thesis.label": string;
  "thesis.repository": string;
  "thesis.download": string;
  "date.present": string;
  "duration.andCounting": string;
  "duration.year": string;
  "duration.years": string;
  "duration.month": string;
  "duration.months": string;
  "timeago.thisMonth": string;
  "timeago.ago": string;
  "timeago.andCounting": string;
  "notFound.title": string;
  "notFound.description": string;
  "notFound.cta": string;
}

/**
 * Keys derived from the ids in `src/data/resume.tsx`.
 *
 * They used to be listed by hand, which meant a new job or project silently
 * fell back to English until someone noticed. Deriving them makes a missing
 * translation a compile error in all five dictionaries instead.
 */
type EntryTranslations = Record<
  | `work.${WorkId}.title`
  | `work.${WorkId}.description`
  | `education.${EducationId}.degree`
  | `project.${ProjectId}.description`
  | `event.${EventId}.description`,
  string
>;

export type Translations = UiTranslations & EntryTranslations;

export type TranslationKey = keyof Translations;
