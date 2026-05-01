import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar";
import { Badge } from "@/components/common/badge";
import { MapPin, Calendar } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
}

export function EventCard({
  title,
  description,
  dates,
  location,
  image,
  links,
}: Props) {
  return (
    <li className="relative ml-10 py-4 group">
      <div className="absolute -left-16 top-4 flex items-center justify-center">
        <div className="absolute size-3 -left-[22.5px] top-5 rounded-full border-2 border-border bg-background group-hover:border-foreground/40 transition-colors duration-300" />
        <Avatar className="border size-12 ring-2 ring-transparent group-hover:ring-border/30 transition-all duration-300">
          <AvatarImage
            src={image}
            alt={title}
            className="object-contain"
            loading="lazy"
          />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1.5 rounded-lg p-3 -ml-3 hover:bg-muted/30 transition-colors duration-300">
        <h2 className="font-semibold leading-none text-sm">{title}</h2>
        <div className="flex items-center gap-3 flex-wrap">
          {dates && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3" />
              {dates}
            </span>
          )}
          {location && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {location}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
            {description}
          </p>
        )}
        {links && links.length > 0 && (
          <div className="mt-2 flex flex-row flex-wrap items-start gap-1.5">
            {links.map((link, idx) => (
              <Link href={link.href} key={idx} target="_blank" rel="noopener noreferrer">
                <Badge className="flex gap-1.5 px-2 py-1 text-[10px] hover:shadow-sm transition-shadow">
                  {link.icon}
                  {link.title}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
