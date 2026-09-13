"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Markdown from "@/components/common/markdown";
import { Island } from "@/components/common/island";
import { SectionHeading } from "@/sections/section-heading";
import { useTranslation } from "@/i18n/store";
import { ENTRANCE, entrance } from "@/lib/entrance";

export default function About() {
  const { t } = useTranslation();

  return (
    <Island>
      <section id="about" aria-label={t("about.title")}>
        <BlurFade eager delay={entrance(ENTRANCE.aboutHeading)}>
          <SectionHeading>{t("about.title")}</SectionHeading>
        </BlurFade>
        <BlurFade eager delay={entrance(ENTRANCE.aboutBody)}>
          <div className="mt-3 prose max-w-full text-pretty hyphenate font-sans text-base text-muted-foreground dark:prose-invert leading-relaxed [&_a]:text-foreground/70 [&_a]:no-underline [&_a]:font-medium [&_a]:relative [&_a]:transition-colors [&_a]:duration-240 [&_a]:ease-state [&_a:hover]:text-foreground [&_a]:after:absolute [&_a]:after:bottom-0 [&_a]:after:left-0 [&_a]:after:h-[1px] [&_a]:after:w-0 [&_a]:after:bg-foreground/30 [&_a]:after:transition-[width] [&_a]:after:duration-240 [&_a]:after:ease-state [&_a:hover]:after:w-full [&_strong]:text-foreground/80 [&_strong]:transition-all [&_strong]:duration-240 [&_strong]:ease-state [&_strong]:hover:text-foreground">
            <Markdown>{t("about.summary")}</Markdown>
          </div>
        </BlurFade>
      </section>
    </Island>
  );
}
