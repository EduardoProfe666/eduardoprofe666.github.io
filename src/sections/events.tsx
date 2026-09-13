"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { EventCard } from "@/components/main/event-card";
import { Island } from "@/components/common/island";
import { SectionHeading } from "@/sections/section-heading";
import { DATA } from "@/data/resume";
import { useTranslation } from "@/i18n/store";
import { sibling } from "@/lib/entrance";

export default function Events() {
  const { t } = useTranslation();

  return (
    <Island>
      <section id="events" aria-label={t("events.title")}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <SectionHeading>{t("events.title")}</SectionHeading>
          </BlurFade>
          <BlurFade inView>
            <p className="text-pretty text-sm text-muted-foreground">
              {t("events.subtitle").replace("{count}", String(DATA.events.length) + "+")}
            </p>
          </BlurFade>
          <BlurFade inView>
            <ul className="mt-3 mb-4 ml-4 divide-y divide-dashed border-l border-border">
              {DATA.events.map((event, index) => (
                <BlurFade as="li" key={event.id} delay={sibling(index)} inView>
                  <EventCard
                    title={event.title}
                    description={t(`event.${event.id}.description`)}
                    location={event.location}
                    dates={event.dates}
                    image={event.image}
                    award={event.award}
                    links={event.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
    </Island>
  );
}
