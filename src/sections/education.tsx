"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/main/resume-card";
import { Island } from "@/components/common/island";
import { SectionHeading } from "@/sections/section-heading";
import { DATA } from "@/data/resume";
import { useTranslation } from "@/i18n/store";
import { calcDuration, formatPeriod } from "@/lib/duration";
import { sibling } from "@/lib/entrance";

/** Shared by the two thesis links; `z-10` lifts them above the card's overlay. */
const THESIS_LINK =
  "text-foreground/70 font-medium relative z-10 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground/30 after:transition-[width] after:duration-240 after:ease-state hover:after:w-full hover:text-foreground transition-colors duration-240 ease-state";

export default function Education() {
  const { t, locale } = useTranslation();

  return (
    <Island>
      <section id="education" aria-label={t("education.title")}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <SectionHeading>{t("education.title")}</SectionHeading>
          </BlurFade>
          {DATA.education.map((education, index) => (
            <BlurFade key={education.id} delay={sibling(index)} inView>
              <ResumeCard
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                href={"https://cujae.edu.cu/"}
                period={formatPeriod(education.start, education.end, locale, t)}
                duration={calcDuration(education.start, education.end, t)}
                description={
                  <>
                    {t(`education.${education.id}.degree`)}
                    {"thesis" in education && education.thesis && (
                      <span className="block mt-1.5">
                        {t("thesis.label")}:{" "}
                        <a
                          href={education.thesis.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={THESIS_LINK}
                        >
                          {t("thesis.repository")}
                        </a>
                        {" · "}
                        <a
                          href={education.thesis.download}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={THESIS_LINK}
                        >
                          {t("thesis.download")}
                        </a>
                      </span>
                    )}
                  </>
                }
              />
            </BlurFade>
          ))}
        </div>
      </section>
    </Island>
  );
}
