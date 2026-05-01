import { EventCard } from "@/components/main/event-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/main/project-card";
import { ResumeCard } from "@/components/main/resume-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar";
import { DATA } from "@/data/resume";
import { calcDuration } from "@/lib/duration";
import Link from "next/link";
import Markdown from "react-markdown";
import { lazy, Suspense } from "react";

const LazyIconCloud = lazy(() => import("@/components/magicui/icon-cloud"));

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="group/heading text-xl font-bold cursor-default relative w-fit">
      <span className="inline-flex items-center">
        <span className="inline-block w-0 overflow-hidden opacity-0 group-hover/heading:w-[1.2em] group-hover/heading:opacity-60 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-muted-foreground font-mono text-lg select-none">
          #
        </span>
        {children}
      </span>
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-foreground/25 rounded-full transition-all duration-500 ease-out group-hover/heading:w-full" />
    </h2>
  );
}

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-14">
      {/* Hero */}
      <section id="hero" aria-label="Introduction">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-6 flex justify-between items-center">
            <div className="flex-col flex flex-1 space-y-3">
              <BlurFadeText
                delay={0}
                characterDelay={0.025}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-5xl/none text-balance"
                yOffset={10}
                animateByCharacter
                text={`Hi, I'm ${DATA.name.split(" ")[0]} `}
              >
                <span className="inline-block origin-[70%_70%] hover:animate-wave cursor-default">
                  👋
                </span>
              </BlurFadeText>
              <BlurFade delay={0.4}>
                <p className="max-w-[600px] text-pretty text-muted-foreground md:text-lg leading-relaxed hover:text-muted-foreground/80 transition-colors duration-500">
                  {DATA.description}
                </p>
              </BlurFade>
            </div>
            <BlurFade delay={0.3}>
              <div className="relative group/avatar cursor-default">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-foreground/5 to-foreground/10 opacity-0 group-hover/avatar:opacity-100 blur-md transition-opacity duration-700" />
                <Avatar className="relative size-28 border-2 shadow-xl ring-4 ring-border/20 group-hover/avatar:ring-foreground/15 group-hover/avatar:shadow-2xl group-hover/avatar:scale-[1.03] transition-all duration-500 ease-out">
                  <AvatarImage
                    alt={DATA.name}
                    src={DATA.avatarUrl}
                    loading="eager"
                    className="group-hover/avatar:brightness-105 transition-[filter] duration-500"
                  />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" aria-label="About Me">
        <BlurFade delay={0.15}>
          <SectionHeading>About Me</SectionHeading>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div className="mt-2 prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed [&_a]:text-foreground/70 [&_a]:no-underline [&_a]:font-medium [&_a]:relative [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-foreground [&_a]:after:absolute [&_a]:after:bottom-0 [&_a]:after:left-0 [&_a]:after:h-[1px] [&_a]:after:w-0 [&_a]:after:bg-foreground/30 [&_a]:after:transition-all [&_a]:after:duration-300 [&_a]:after:ease-out [&_a:hover]:after:w-full [&_strong]:text-foreground/80 [&_strong]:transition-all [&_strong]:duration-300 [&_strong]:hover:text-foreground [&_strong]:hover:drop-shadow-sm">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </BlurFade>
      </section>

      {/* Work */}
      <section id="work" aria-label="Work Experience">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={0.25}>
            <SectionHeading>Work Experience</SectionHeading>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade key={work.company} delay={id * 0.03} inView>
              <ResumeCard
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                duration={calcDuration(work.start, work.end ?? "Present")}
                description={work.description}
                location={work.location}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" aria-label="Education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <SectionHeading>Education</SectionHeading>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade key={education.school} delay={id * 0.03} inView>
              <ResumeCard
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                href={"https://cujae.edu.cu/"}
                period={`${education.start} - ${education.end}`}
                duration={calcDuration(education.start, education.end)}
                description={
                  <>
                    {education.degree}
                    {"thesis" in education && education.thesis && (
                      <span className="block mt-1.5">
                        Thesis:{" "}
                        <a
                          href={education.thesis.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/70 font-medium relative z-10 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground/30 after:transition-all after:duration-300 after:ease-out hover:after:w-full hover:text-foreground transition-colors duration-300"
                        >
                          Repository
                        </a>
                        {" · "}
                        <a
                          href={education.thesis.download}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/70 font-medium relative z-10 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground/30 after:transition-all after:duration-300 after:ease-out hover:after:w-full hover:text-foreground transition-colors duration-300"
                        >
                          Download PDF
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
      <section id="skills" aria-label="Technologies">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <SectionHeading>Technologies</SectionHeading>
          </BlurFade>
          <BlurFade inView>
            <div className="text-center items-center justify-center flex flex-wrap gap-1">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-64 w-full">
                    <div className="animate-pulse text-muted-foreground text-sm">
                      Loading skills...
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
      <section id="projects" aria-label="Projects">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <SectionHeading>Projects</SectionHeading>
          </BlurFade>
          <BlurFade inView>
            <p className="text-pretty text-sm text-muted-foreground">
              I&apos;ve worked on a variety of projects, from desktop apps to
              complex web platforms. Here are some of my favorites. Check out{" "}
              <a
                className="text-foreground/70 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground/30 after:transition-all after:duration-300 after:ease-out hover:after:w-full hover:text-foreground transition-colors duration-300"
                href="https://github.com/EduardoProfe666"
                rel="noopener noreferrer"
                target="_blank"
              >
                my GitHub
              </a>{" "}
              to find more.
            </p>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[800px] mx-auto mt-3">
            {DATA.projects.map((project, id) => (
              <BlurFade key={project.title} delay={id * 0.04} inView>
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
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
      <section id="events" aria-label="Events">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <SectionHeading>Events &amp; Competitions</SectionHeading>
          </BlurFade>
          <BlurFade inView>
            <p className="text-pretty text-sm text-muted-foreground">
              Throughout my journey, I&apos;ve participated in{" "}
              <span className="font-medium text-foreground/80">{DATA.events.length}+ competitive events</span>
              —from{" "}
              <span className="font-medium text-foreground/80">ICPC</span>
              {" "}programming contests at the Caribbean level to university
              hackathons and academic awards.
            </p>
          </BlurFade>
          <BlurFade inView>
            <ul className="mt-3 mb-4 ml-4 divide-y divide-dashed border-l border-border/60">
              {DATA.events.map((event, id) => (
                <BlurFade key={event.title + event.dates} delay={id * 0.04} inView>
                  <EventCard
                    title={event.title}
                    description={event.description}
                    location={event.location}
                    dates={event.dates}
                    image={event.image}
                    links={event.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-label="Contact">
        <div className="flex flex-col items-center justify-center gap-8 px-4 text-center md:px-6 w-full py-16">
          <BlurFade inView>
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-foreground text-background px-4 py-1.5 text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-balance leading-tight">
                Let&apos;s work together
              </h2>
              <p className="mx-auto max-w-[500px] text-pretty text-muted-foreground md:text-lg/relaxed">
                Have a project in mind or just want to say hi? I&apos;m always
                open to new opportunities and collaborations.
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={0.05} inView>
            <div className="flex flex-col items-center gap-5">
              <Link
                href={DATA.contact.social.Email.url}
                className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground text-background px-8 py-3.5 text-sm font-medium hover:bg-foreground/90 hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                <DATA.contact.social.Email.icon className="size-4 group-hover/cta:rotate-12 transition-transform duration-300" />
                Send me an email
              </Link>
              <div className="flex items-center gap-3">
                {Object.entries(DATA.contact.social)
                  .filter(([name]) => name !== "Email")
                  .map(([name, social]) => (
                    <Link
                      key={name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social flex items-center justify-center size-11 rounded-full border border-border bg-background hover:bg-muted hover:border-foreground/20 hover:shadow-lg hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300"
                      aria-label={name}
                    >
                      <social.icon className="size-4 group-hover/social:scale-110 transition-transform duration-300" />
                    </Link>
                  ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
