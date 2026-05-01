import { Badge } from "@/components/common/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { GitHubStars } from "@/components/common/github-stars";
import { cn } from "@/lib/utils";
import { Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import React from "react";
import { OptimizedImage } from "@/components/common/optimized-image";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

function extractGitHubRepo(
  links?: readonly { href: string }[]
): string | null {
  if (!links) return null;
  for (const l of links) {
    const match = l.href.match(/github\.com\/([^/]+\/[^/]+)/);
    if (match) return match[1];
  }
  return null;
}

export const ProjectCard = React.memo(function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const githubRepo = extractGitHubRepo(links);

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border border-border/40 hover:border-border hover:shadow-xl transition-all duration-300 ease-out h-full group rounded-xl hover:-translate-y-1",
        className
      )}
    >
      <Link
        href={href || "#"}
        className="block overflow-hidden relative"
        target="_blank"
        rel="noopener noreferrer"
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="pointer-events-none mx-auto h-44 w-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        )}
        {image && (
          <OptimizedImage
            src={image}
            alt={title}
            className="h-44 w-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      <CardHeader className="px-4 pt-4 pb-0 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold leading-tight group-hover:translate-x-0.5 transition-transform duration-300">
            {title}
          </CardTitle>
          {githubRepo && <GitHubStars repo={githubRepo} />}
        </div>
        <div className="flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform duration-300 delay-75">
          <Calendar className="size-3 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-300" />
          <time className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-300">{dates}</time>
        </div>
        <div className="hidden font-sans text-xs underline print:visible">
          {link?.replace("https://", "").replace("www.", "").replace("/", "")}
        </div>
        <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert leading-relaxed">
          <Markdown>{description}</Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-4 pb-0">
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map((tag, i) => (
              <Badge
                className="px-2 py-0.5 text-[10px] font-medium rounded-full transition-all duration-200 hover:scale-105 hover:shadow-sm"
                variant="secondary"
                key={tag}
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-3">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1.5">
            {links.map((linkItem, idx) => (
              <Link href={linkItem.href} key={idx} target="_blank" rel="noopener noreferrer">
                <Badge className="flex gap-1.5 px-2.5 py-1 text-[10px] rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95">
                  {linkItem.icon}
                  {linkItem.type}
                  <ExternalLink className="size-2.5 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-40 group-hover:translate-x-0" />
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
});
