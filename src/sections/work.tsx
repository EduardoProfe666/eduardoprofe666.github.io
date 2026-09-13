"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/main/resume-card";
import { Island } from "@/components/common/island";
import { SectionHeading } from "@/sections/section-heading";
import { DATA } from "@/data/resume";
import { useTranslation } from "@/i18n/store";
import { calcDuration, formatPeriod } from "@/lib/duration";
import { ENTRANCE, entrance, sibling } from "@/lib/entrance";

export default function Work() {
  const { t, locale } = useTranslation();

  return (
    <Island>
      <section id="work" aria-label={t("work.title")}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade eager delay={entrance(ENTRANCE.workHeading)}>
            <SectionHeading>{t("work.title")}</SectionHeading>
          </BlurFade>
          {DATA.work.map((work, index) => (
            <BlurFade
              key={work.id}
              eager={index === 0}
              delay={index === 0 ? entrance(ENTRANCE.workFirstCard) : sibling(index)}
              inView
            >
              <ResumeCard
                priority={index === 0}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={t(`work.${work.id}.title`)}
                href={work.href}
                badges={work.badges}
                period={formatPeriod(work.start, work.end, locale, t)}
                duration={calcDuration(work.start, work.end, t)}
                description={t(`work.${work.id}.description`)}
                location={work.location}
              />
            </BlurFade>
          ))}
        </div>
      </section>
    </Island>
  );
}
