"use client";

import { EventCard } from "@/components/main/event-card";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/main/project-card";
import { ResumeCard } from "@/components/main/resume-card";
import { AvatarFlip } from "@/components/main/avatar-flip";
import { HeroTitle } from "@/components/main/hero-title";
import { ContactCta } from "@/components/main/contact-cta";
import { DATA } from "@/data/resume";
import { useTranslation } from "@/i18n/provider";
import { calcDuration, formatPeriod } from "@/lib/duration";
import { ENTRANCE, entrance, sibling } from "@/lib/entrance";
import Link from "next/link";
import Markdown from "react-markdown";
import { lazy, Suspense } from "react";

const LazyIconCloud = lazy(() => import("@/components/magicui/icon-cloud"));

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="group/heading relative w-fit cursor-default text-xl font-bold tracking-tight">
      <span className="inline-flex items-center">
        <span className="inline-block w-0 select-none overflow-hidden font-mono text-lg text-muted-foreground opacity-0 transition-all duration-400 ease-spring group-hover/heading:w-[1.2em] group-hover/heading:opacity-60">
          #
        </span>
        {children}
      </span>
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 origin-left rounded-full bg-foreground/25 transition-[width] duration-240 ease-state group-hover/heading:w-full" />
    </h2>
  );
}

export default function Page() {
  const { t, locale } = useTranslation();

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-14">
      {/* Hero */}
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
                <p className="max-w-[600px] text-pretty text-muted-foreground md:text-lg leading-relaxed hover:text-muted-foreground/80 transition-colors duration-240 ease-state">
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

      {/* About */}
      <section id="about" aria-label={t("about.title")}>
        <BlurFade eager delay={entrance(ENTRANCE.aboutHeading)}>
          <SectionHeading>{t("about.title")}</SectionHeading>
        </BlurFade>
        <BlurFade eager delay={entrance(ENTRANCE.aboutBody)}>
          <div className="mt-2 prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed [&_a]:text-foreground/70 [&_a]:no-underline [&_a]:font-medium [&_a]:relative [&_a]:transition-colors [&_a]:duration-240 [&_a]:ease-state [&_a:hover]:text-foreground [&_a]:after:absolute [&_a]:after:bottom-0 [&_a]:after:left-0 [&_a]:after:h-[1px] [&_a]:after:w-0 [&_a]:after:bg-foreground/30 [&_a]:after:transition-[width] [&_a]:after:duration-240 [&_a]:after:ease-state [&_a:hover]:after:w-full [&_strong]:text-foreground/80 [&_strong]:transition-all [&_strong]:duration-240 [&_strong]:ease-state [&_strong]:hover:text-foreground [&_strong]:hover:drop-shadow-sm">
            <Markdown>{t("about.summary")}</Markdown>
          </div>
        </BlurFade>
      </section>

      {/* Work */}
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

      {/* Education */}
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
                          className="text-foreground/70 font-medium relative z-10 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground/30 after:transition-[width] after:duration-240 after:ease-state hover:after:w-full hover:text-foreground transition-colors duration-240 ease-state"
                        >
                          {t("thesis.repository")}
                        </a>
                        {" · "}
                        <a
                          href={education.thesis.download}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/70 font-medium relative z-10 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground/30 after:transition-[width] after:duration-240 after:ease-state hover:after:w-full hover:text-foreground transition-colors duration-240 ease-state"
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

      {/* Skills */}
      <section id="skills" aria-label={t("skills.title")}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <SectionHeading>{t("skills.title")}</SectionHeading>
          </BlurFade>
          <BlurFade inView>
            <div className="text-center items-center justify-center flex flex-wrap gap-1">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-64 w-full">
                    <div className="animate-pulse text-muted-foreground text-sm">
                      {t("skills.loading")}
                    </div>
                  </div>
                }
              >
                <LazyIconCloud iconSlugs={[...DATA.skill_slugs]} />
              </Suspense>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" aria-label={t("projects.title")}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <SectionHeading>{t("projects.title")}</SectionHeading>
          </BlurFade>
          <BlurFade inView>
            <p className="text-pretty text-sm text-muted-foreground">
              {t("projects.subtitle").split("{github}")[0]}
              <a
                className="text-foreground/70 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground/30 after:transition-[width] after:duration-240 after:ease-state hover:after:w-full hover:text-foreground transition-colors duration-240 ease-state"
                href="https://github.com/EduardoProfe666"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              {t("projects.subtitle").split("{github}")[1]}
            </p>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[800px] mx-auto mt-3">
            {DATA.projects.map((project, index) => (
              <BlurFade key={project.id} delay={sibling(index)} inView>
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={t(`project.${project.id}.description`)}
                  date={project.date}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
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
            <ul className="mt-3 mb-4 ml-4 divide-y divide-dashed border-l border-border/60">
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

      {/* Contact */}
      <section id="contact" aria-label={t("contact.chip")}>
        <div className="flex flex-col items-center justify-center gap-8 px-4 text-center md:px-6 w-full py-16">
          <BlurFade inView>
            <div className="space-y-4">
              <div className="inline-block cursor-default rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-all duration-400 ease-spring hover:scale-105 hover:shadow-lg">
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
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social flex size-11 items-center justify-center rounded-full border border-border bg-background transition-all duration-240 ease-state hover:bg-muted hover:border-foreground/20 hover:shadow-lg hover:scale-110 hover:-translate-y-1 active:scale-95 active:duration-100"
                      aria-label={name}
                    >
                      <social.icon className="size-4 transition-transform duration-400 ease-spring group-hover/social:scale-110" />
                    </Link>
                  </BlurFade>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
