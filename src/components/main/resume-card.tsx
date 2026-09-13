import { Badge } from "@/components/common/badge";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { ChevronRight, MapPin, Briefcase, Clock } from "lucide-react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  duration?: string;
  description?: React.ReactNode;
  location?: string;
  /** First card only: its logo is inside the first screen, so it loads eagerly. */
  priority?: boolean;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  duration,
  description,
  location,
  priority = false,
}: ResumeCardProps) => {
  return (
    // `surface` draws the hairline as a shadow. The previous `hover:border`
    // added a real 1px border on hover, which grew the card by two pixels and
    // nudged every line of text inside it.
    <Card className="surface group relative flex gap-4 rounded-xl p-4 hover:bg-accent/25 hover:-translate-y-0.5 active:scale-[0.995] active:duration-100">
      <div className="flex-none pt-0.5">
        {/* A plain <img> rather than Radix's Avatar: that one mounts the image
            from JavaScript, so the first card's logo was invisible to the
            preload scanner and only started downloading ~2.7s in, which made it
            the Largest Contentful Paint. `lazy` still loads in-viewport images
            straight away and skips the ones further down the page.

            No initial behind the image: Radix unmounted its fallback once the
            logo loaded, and these logos have transparent backgrounds, so a
            permanent one showed through. `alt` still covers a failed load. */}
        <span className="relative flex size-12 shrink-0 overflow-hidden rounded-full border bg-muted dark:bg-foreground shadow-sm transition-[transform,box-shadow] duration-400 ease-state group-hover:shadow-md group-hover:scale-[1.06]">
          {/* eslint-disable-next-line @next/next/no-img-element -- `output: export`
              serves unoptimized images, so next/image would add nothing here. */}
          <img
            src={logoUrl}
            alt={altText}
            width={48}
            height={48}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            className="relative aspect-square h-full w-full object-contain"
          />
        </span>
      </div>
      <div className="flex-grow flex flex-col min-w-0 gap-1">
        <CardHeader>
          <div className="flex items-start justify-between gap-x-2">
            <div className="min-w-0">
              <h3 className="inline-flex items-center text-balance font-semibold text-sm leading-tight group-hover:text-foreground transition-colors duration-240 ease-state">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="after:absolute after:inset-0 after:rounded-xl after:content-['']"
                  >
                    {title}
                  </a>
                ) : (
                  title
                )}
                {badges && badges.length > 0 && (
                  <span className="inline-flex gap-x-1 pl-2">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="text-2xs px-1.5 py-0 rounded-full group-hover:bg-secondary/80"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                {href && (
                  <ChevronRight className="size-4 ml-1 -translate-x-1 opacity-0 transition-all duration-240 ease-state group-hover:translate-x-0 group-hover:opacity-100" />
                )}
              </h3>
              {subtitle && (
                <div className="flex items-center gap-1.5 mt-1 translate-x-0 group-hover:translate-x-0.5 transition-transform duration-240 ease-state">
                  <Briefcase className="size-3 text-muted-foreground/70 flex-shrink-0 group-hover:text-muted-foreground transition-colors duration-240 ease-state" />
                  <span className="text-xs text-muted-foreground font-medium">{subtitle}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-1.5 mt-0.5 translate-x-0 group-hover:translate-x-0.5 transition-transform duration-240 ease-state delay-75">
                  <MapPin className="size-3 text-muted-foreground/70 flex-shrink-0 group-hover:text-muted-foreground transition-colors duration-240 ease-state" />
                  <span className="text-xs text-muted-foreground">{location}</span>
                </div>
              )}
            </div>
            <div className="flex-shrink-0 mt-0.5 h-[18px] overflow-hidden">
              <div className="flex flex-col transition-transform duration-400 ease-spring group-hover:-translate-y-[18px]">
                <div className="h-[18px] flex items-center justify-end text-2xs tabular-nums text-muted-foreground whitespace-nowrap">
                  {period}
                </div>
                <div className="h-[18px] flex items-center justify-end gap-1.5 text-2xs font-medium text-foreground/80 whitespace-nowrap">
                  {duration && (
                    <>
                      <Clock className="size-3 flex-shrink-0" />
                      {duration}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        {description && (
          <CardContent className="text-xs sm:text-sm text-pretty hyphenate leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-240 ease-state">
            {description}
          </CardContent>
        )}
      </div>
    </Card>
  );
};
