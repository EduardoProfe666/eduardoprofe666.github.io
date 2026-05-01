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

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-14">
      {/* Hero */}
      <section id="hero" aria-label="Introduction">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-4 flex justify-between items-center">
            <div className="flex-col flex flex-1 space-y-2">
              <BlurFadeText
                delay={0.05}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-5xl/none text-balance"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} `}
              >
                <span className="inline-block origin-[70%_70%] hover:animate-wave cursor-default">
                  👋
                </span>
              </BlurFadeText>
              <BlurFadeText
                className="max-w-[600px] text-pretty text-muted-foreground md:text-lg"
                delay={0.1}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={0.1}>
              <Avatar className="size-28 border-2 shadow-xl ring-4 ring-border/20 hover:ring-border/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 ease-out cursor-default">
                <AvatarImage
                  alt={DATA.name}
                  src={DATA.avatarUrl}
                  loading="eager"
                />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" aria-label="About Me">
        <BlurFade delay={0.15}>
          <h2 className="text-xl font-bold mb-2 hover:translate-x-0.5 transition-transform duration-300 cursor-default">About Me</h2>
        </BlurFade>
        <BlurFade delay={0.2}>
          <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed [&_a]:transition-colors [&_a]:duration-200 [&_strong]:transition-colors [&_strong]:duration-200 [&_strong]:hover:text-foreground">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </BlurFade>
      </section>

      {/* Work */}
      <section id="work" aria-label="Work Experience">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={0.25}>
            <h2 className="text-xl font-bold hover:translate-x-0.5 transition-transform duration-300 cursor-default">Work Experience</h2>
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
            <h2 className="text-xl font-bold hover:translate-x-0.5 transition-transform duration-300 cursor-default">Education</h2>
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
                          className="text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-200 relative z-10"
                        >
                          Repository
                        </a>
                        {" · "}
                        <a
                          href={education.thesis.download}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-200 relative z-10"
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
            <h2 className="text-xl font-bold hover:translate-x-0.5 transition-transform duration-300 cursor-default">Technologies</h2>
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
        <div className="space-y-10 w-full py-6">
          <BlurFade inView>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-foreground text-background px-4 py-1.5 text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-balance leading-tight">
                  Check out my latest work
                </h2>
                <p className="mx-auto max-w-[600px] text-pretty text-muted-foreground md:text-lg/relaxed">
                  From web apps to bots and tools. Check out{" "}
                  <a
                    className="text-blue-500 font-medium hover:underline underline-offset-4 hover:text-blue-600 transition-colors duration-200"
                    href="https://github.com/EduardoProfe666"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    my GitHub
                  </a>{" "}
                  for more.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[800px] mx-auto">
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
        <div className="space-y-10 w-full py-6">
          <BlurFade inView>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-foreground text-background px-4 py-1.5 text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default">
                  Events
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-balance leading-tight">
                  I love to compete
                </h2>
                <p className="mx-auto max-w-[600px] text-pretty text-muted-foreground md:text-lg/relaxed">
                  {DATA.events.length}+ events ranging from ICPC competitions to
                  university hackathons and awards.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade inView>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.events.map((event, id) => (
                <BlurFade key={event.title + event.dates} delay={id * 0.03} inView>
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
