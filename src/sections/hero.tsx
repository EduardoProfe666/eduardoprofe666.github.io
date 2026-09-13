"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { AvatarFlip } from "@/components/main/avatar-flip";
import { HeroTitle } from "@/components/main/hero-title";
import { Island } from "@/components/common/island";
import { DATA } from "@/data/resume";
import { useTranslation } from "@/i18n/store";
import { ENTRANCE, entrance } from "@/lib/entrance";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <Island>
      <section id="hero" aria-label="Introduction">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-6 flex justify-between items-center">
            <div className="flex-col flex flex-1 space-y-3">
              <BlurFade eager delay={entrance(ENTRANCE.heroTitle)}>
                <HeroTitle
                  greeting={t("hero.greeting")}
                  name={DATA.name.split(" ")[0]}
                  alias="EduardoProfe666"
                />
              </BlurFade>
              <BlurFade eager delay={entrance(ENTRANCE.heroDescription)}>
                <p className="max-w-[600px] text-pretty text-muted-foreground md:text-lg leading-relaxed transition-colors duration-240 ease-state">
                  {t("hero.description")}
                </p>
              </BlurFade>
            </div>
            <BlurFade eager delay={entrance(ENTRANCE.heroAvatar)}>
              <AvatarFlip
                src={DATA.avatarUrl}
                alt={DATA.name}
                fallback={DATA.initials}
              />
            </BlurFade>
          </div>
        </div>
      </section>
    </Island>
  );
}
