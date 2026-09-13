"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ContactCta } from "@/components/main/contact-cta";
import { Island } from "@/components/common/island";
import { DATA } from "@/data/resume";
import { useTranslation } from "@/i18n/store";
import { sibling } from "@/lib/entrance";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <Island>
      <section id="contact" aria-label={t("contact.chip")}>
        <div className="flex flex-col items-center justify-center gap-8 px-4 text-center md:px-6 w-full py-16">
          <BlurFade inView>
            <div className="space-y-4">
              <div className="inline-block cursor-default rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-all duration-400 ease-spring hover:scale-105 hover:elevate-2">
                {t("contact.chip")}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-balance leading-tight">
                {t("contact.heading")}
              </h2>
              <p className="mx-auto max-w-[500px] text-pretty text-muted-foreground md:text-lg/relaxed">
                {t("contact.description")}
              </p>
            </div>
          </BlurFade>
          <div className="flex flex-col items-center gap-5">
            <BlurFade delay={sibling(1)} inView>
              <ContactCta />
            </BlurFade>
            {/* One reveal per icon rather than one for the row, so they land
                left to right on the same cadence as every other list. */}
            <div className="flex items-center gap-3">
              {Object.entries(DATA.contact.social)
                .filter(([name]) => name !== "Email")
                .map(([name, social], index) => (
                  <BlurFade key={name} delay={sibling(index + 2)} inView>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social flex size-11 items-center justify-center rounded-full border border-border bg-background transition-all duration-240 ease-state hover:bg-muted hover:border-foreground/20 hover:elevate-2 hover:scale-110 hover:-translate-y-1 active:scale-95 active:duration-100"
                      aria-label={name}
                    >
                      <social.icon className="size-4 transition-transform duration-400 ease-spring group-hover/social:scale-110" />
                    </a>
                  </BlurFade>
                ))}
            </div>
          </div>
        </div>
      </section>
    </Island>
  );
}
