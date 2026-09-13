import { Badge } from "@/components/common/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { GitHubStars } from "@/components/common/github-stars";
import { TimeAgo } from "@/components/common/time-ago";
import type { YearMonth } from "@/lib/duration";
import { cn } from "@/lib/utils";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import React from "react";
import { OptimizedImage } from "@/components/common/optimized-image";

interface Props {
  title: string;
  href?: string;
  description: string;
  date: YearMonth;
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
  date,
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
        "surface group flex h-full flex-col overflow-hidden rounded-2xl",
        "hover:-translate-y-1.5",
        className
      )}
    >
      {/* Image area */}
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
            className="pointer-events-none mx-auto h-48 w-full object-cover object-top transition-transform duration-700 ease-glide group-hover:scale-[1.06]"
          />
        )}
        {image && (
          <OptimizedImage
            src={image}
            alt={title}
            className="h-48 w-full object-cover object-top transition-transform duration-700 ease-glide group-hover:scale-[1.06]"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Arrow indicator */}
        <div className="material absolute top-3 right-3 flex size-8 scale-75 items-center justify-center rounded-full opacity-0 transition-all duration-400 ease-spring group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="size-4 text-foreground transition-transform duration-500 ease-glide group-hover:rotate-45" />
        </div>
      </Link>

      {/* Content */}
      <CardHeader className="px-4 pt-4 pb-0 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold leading-tight group-hover:translate-x-0.5 transition-transform duration-300">
            {title}
          </CardTitle>
          {githubRepo && <GitHubStars repo={githubRepo} />}
        </div>
        <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <TimeAgo date={date} />
        </div>
        <div className="hidden font-sans text-xs underline print:visible">
          {link?.replace("https://", "").replace("www.", "").replace("/", "")}
        </div>
        <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert leading-relaxed">
          <Markdown>{description}</Markdown>
        </div>
      </CardHeader>

      {/* Tags */}
      <CardContent className="mt-auto flex flex-col px-4 pb-0">
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map((tag, i) => (
              <Badge
                className={cn(
                  "px-2 py-0.5 text-[10px] font-medium rounded-full",
                  "hover:scale-105 hover:shadow-sm",
                  "opacity-70 group-hover:opacity-100"
                )}
                variant="secondary"
                key={tag}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {/* Links */}
      <CardFooter className="px-4 pb-4 pt-3">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1.5">
            {links.map((linkItem, idx) => (
              <Link href={linkItem.href} key={idx} target="_blank" rel="noopener noreferrer">
                <Badge
                  className={cn(
                    "flex gap-1.5 px-2.5 py-1 text-[10px] rounded-full",
                    "hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:duration-100",
                    "opacity-80 group-hover:opacity-100"
                  )}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {linkItem.icon}
                  {linkItem.type}
                  <ExternalLink className="size-2.5 -translate-x-1 opacity-0 transition-all duration-500 ease-glide group-hover:translate-x-0 group-hover:opacity-40" />
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
});
