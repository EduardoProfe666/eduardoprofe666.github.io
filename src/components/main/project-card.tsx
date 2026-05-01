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
        "flex flex-col overflow-hidden border hover:border-border/80 hover:shadow-lg transition-all duration-300 ease-out h-full group",
        className
      )}
    >
      <Link
        href={href || "#"}
        className="block cursor-pointer overflow-hidden"
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
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {image && (
          <OptimizedImage
            src={image}
            alt={title}
            className="h-40 w-full overflow-hidden object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </Link>
      <CardHeader className="px-4 pt-4 pb-0">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold leading-tight">
            {title}
          </CardTitle>
          {githubRepo && <GitHubStars repo={githubRepo} />}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Calendar className="size-3 text-muted-foreground" />
          <time className="text-xs text-muted-foreground">{dates}</time>
        </div>
        <div className="hidden font-sans text-xs underline print:visible">
          {link?.replace("https://", "").replace("www.", "").replace("/", "")}
        </div>
        <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert mt-2 leading-relaxed">
          <Markdown>{description}</Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-4 pb-0">
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                className="px-1.5 py-0.5 text-[10px] font-medium"
                variant="secondary"
                key={tag}
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
                <Badge
                  className="flex gap-1.5 px-2.5 py-1 text-[10px] hover:shadow-sm transition-shadow"
                >
                  {linkItem.icon}
                  {linkItem.type}
                  <ExternalLink className="size-2.5 opacity-50" />
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
});
