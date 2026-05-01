import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar";
import { Badge } from "@/components/common/badge";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { ChevronRight, MapPin, Briefcase, Clock } from "lucide-react";
import Link from "next/link";

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
}: ResumeCardProps) => {
  const content = (
    <Card className="flex gap-4 hover:border hover:border-border hover:shadow-lg hover:bg-accent/30 transition-all duration-200 p-4 group rounded-xl">
      <div className="flex-none pt-0.5">
        <Avatar className="size-12 border bg-muted dark:bg-foreground shadow-sm group-hover:shadow-md transition-shadow duration-200">
          <AvatarImage
            src={logoUrl}
            alt={altText}
            className="object-contain"
          />
          <AvatarFallback className="text-xs font-bold">{altText[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-grow flex flex-col min-w-0 gap-1">
        <CardHeader>
          <div className="flex items-start justify-between gap-x-2">
            <div className="min-w-0">
              <h3 className="inline-flex items-center font-semibold text-sm leading-tight">
                {title}
                {badges && badges.length > 0 && (
                  <span className="inline-flex gap-x-1 pl-2">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 rounded-full"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                {href && (
                  <ChevronRight className="size-4 ml-1 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                )}
              </h3>
              {subtitle && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Briefcase className="size-3 text-muted-foreground/70 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground/90 font-medium">{subtitle}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin className="size-3 text-muted-foreground/70 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground/70">{location}</span>
                </div>
              )}
            </div>
            <div className="flex-shrink-0 mt-0.5 text-right">
              <div className="text-[11px] tabular-nums text-muted-foreground/70 whitespace-nowrap transition-all duration-200 group-hover:hidden">
                {period}
              </div>
              {duration && (
                <div className="hidden items-center gap-1 text-[11px] font-medium text-foreground/80 whitespace-nowrap group-hover:flex">
                  <Clock className="size-3 flex-shrink-0" />
                  {duration}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        {description && (
          <CardContent className="text-xs sm:text-sm text-pretty leading-relaxed text-muted-foreground">
            {description}
          </CardContent>
        )}
      </div>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block" target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
};
