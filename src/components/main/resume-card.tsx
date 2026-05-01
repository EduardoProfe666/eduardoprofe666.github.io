import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar";
import { Badge } from "@/components/common/badge";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { ChevronRight, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
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
  description,
  location,
}: ResumeCardProps) => {
  const content = (
    <Card className="flex gap-4 border border-transparent hover:border-border/50 hover:shadow-md transition-all duration-300 p-4 group">
      <div className="flex-none">
        <Avatar className="border size-12 bg-muted-background dark:bg-foreground ring-2 ring-transparent group-hover:ring-border/30 transition-all duration-300">
          <AvatarImage
            src={logoUrl}
            alt={altText}
            className="object-contain"
          />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-grow flex flex-col min-w-0">
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
                        className="text-[10px] px-1.5 py-0"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                {href && (
                  <ChevronRight className="size-4 ml-1 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                )}
              </h3>
              {subtitle && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Briefcase className="size-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{subtitle}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin className="size-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{location}</span>
                </div>
              )}
            </div>
            <div className="text-xs tabular-nums text-muted-foreground text-right whitespace-nowrap flex-shrink-0">
              {period}
            </div>
          </div>
        </CardHeader>
        {description && (
          <CardContent className="mt-2 text-xs sm:text-sm leading-relaxed">
            {description}
          </CardContent>
        )}
      </div>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block cursor-pointer" target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return <div className="block">{content}</div>;
};
