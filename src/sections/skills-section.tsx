"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Skills from "@/components/main/skills";
import { Island } from "@/components/common/island";
import { SectionHeading } from "@/sections/section-heading";
import { ALL_SKILLS } from "@/data/skills";
import { useTranslation } from "@/i18n/store";

/**
 * The grid is no longer lazy-loaded behind `Suspense`: the island itself is
 * `client:visible`, so the forty brand marks and the spring loop are fetched
 * when the section scrolls up rather than as part of the page's JavaScript.
 * Astro does at the network layer what `React.lazy` was doing at the bundler
 * layer, which also means the skeleton that held the space is unnecessary —
 * the real markup is in the prerendered HTML from the start.
 */
export default function SkillsSection() {
  const { t } = useTranslation();

  return (
    <Island>
      <section id="skills" aria-label={t("skills.title")}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade>
            <SectionHeading>{t("skills.title")}</SectionHeading>
          </BlurFade>
          <BlurFade>
            <p className="text-pretty text-sm text-muted-foreground">
              {t("skills.subtitle").replace("{count}", String(ALL_SKILLS.length))}
            </p>
          </BlurFade>
          <BlurFade>
            <Skills />
          </BlurFade>
        </div>
      </section>
    </Island>
  );
}
