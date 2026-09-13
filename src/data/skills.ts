/**
 * The skills grid, authored here and grouped the way you would actually explain
 * them out loud rather than as one undifferentiated pile.
 *
 * `slug` is a Simple Icons slug. `scripts/generate-skill-icons.mjs` reads this
 * file, fetches each one once and writes the path data into
 * `skill-icons.generated.ts`, so the page ships its icons and never asks the
 * network for them.
 *
 * `mono` is the fallback for a brand Simple Icons does not carry: AWS was
 * withdrawn from the set over trademark, so it gets a monogram tile rather than
 * a hand-drawn approximation of somebody's logo.
 */

export interface Skill {
  slug: string;
  /** Overrides the title that comes with the icon. */
  name?: string;
  /** Rendered instead of an icon when Simple Icons has no mark for it. */
  mono?: string;
}

/** Kept as a union so `skills.group.<id>` stays a checked translation key. */
export type SkillGroupId = "languages" | "frontend" | "backend" | "cloud" | "ai";

export interface SkillGroup {
  id: SkillGroupId;
  skills: readonly Skill[];
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: "languages",
    skills: [
      { slug: "python" },
      { slug: "typescript" },
      { slug: "javascript" },
      { slug: "openjdk", name: "Java" },
      { slug: "dotnet", name: ".NET" },
      { slug: "c" },
    ],
  },
  {
    id: "frontend",
    skills: [
      { slug: "react" },
      { slug: "nextdotjs", name: "Next.js" },
      { slug: "vuedotjs", name: "Vue" },
      { slug: "nuxt" },
      { slug: "angular" },
      { slug: "tailwindcss", name: "Tailwind" },
      { slug: "html5", name: "HTML" },
      { slug: "css" },
      { slug: "vite" },
      { slug: "astro" },
    ],
  },
  {
    id: "backend",
    skills: [
      { slug: "django" },
      { slug: "fastapi", name: "FastAPI" },
      { slug: "nestjs", name: "NestJS" },
      { slug: "express" },
      { slug: "rabbitmq", name: "RabbitMQ" },
      { slug: "postgresql", name: "Postgres" },
      { slug: "mongodb" },
      { slug: "mysql", name: "MySQL" },
    ],
  },
  {
    id: "cloud",
    skills: [
      { slug: "docker" },
      { slug: "aws", name: "AWS", mono: "AWS" },
      { slug: "digitalocean", name: "DigitalOcean" },
      { slug: "railway" },
      { slug: "vercel" },
      { slug: "githubactions", name: "Actions" },
      { slug: "git" },
      { slug: "github" },
      { slug: "gitlab" },
    ],
  },
  {
    id: "ai",
    skills: [
      { slug: "anthropic" },
      { slug: "openai", name: "OpenAI", mono: "OpenAI" },
      { slug: "githubcopilot", name: "Copilot" },
      { slug: "mistralai", name: "Mistral" },
      { slug: "n8n" },
      { slug: "expo" },
      { slug: "android" },
      { slug: "apple" },
    ],
  },
] as const;

export const ALL_SKILLS = SKILL_GROUPS.flatMap((g) =>
  g.skills.map((s) => ({ ...s, group: g.id }))
);
