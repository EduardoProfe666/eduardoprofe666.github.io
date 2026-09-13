"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/main/project-card";
import { Island } from "@/components/common/island";
import { SectionHeading } from "@/sections/section-heading";
import { DATA } from "@/data/resume";
import { useTranslation } from "@/i18n/store";
import { sibling } from "@/lib/entrance";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <Island>
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
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 max-w-[800px] mx-auto mt-3">
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
    </Island>
  );
}
