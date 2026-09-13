import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar";
import { Badge } from "@/components/common/badge";
import { MapPin, Calendar, ExternalLink, Trophy } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  /** Renders the trophy and the gold timeline marker. */
  award?: boolean;
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
  award = false,
  links,
}: Props) {

  return (
    // The <li> is provided by the BlurFade wrapper, so that the events <ul>
    // has list items as its direct children.
    <div className="relative ml-10 py-4 group">
      {/* Avatar + timeline dot */}
      <div className="absolute -left-16 top-4 flex items-center justify-center">
        <div className={`absolute -left-[23.5px] top-1/2 -translate-y-1/2 z-10 size-3 rounded-full border-2 transition-all duration-240 ease-state ${
          award
            ? "border-yellow-500/50 bg-yellow-500/20 group-hover:border-yellow-500 group-hover:bg-yellow-500/40 group-hover:shadow-[0_0_8px_rgba(234,179,8,0.4)]"
            : "border-border bg-background group-hover:border-foreground/40 group-hover:bg-foreground/5"
        } group-hover:scale-125`} />
        <Avatar className="size-12 border shadow-sm transition-[transform,box-shadow] duration-400 ease-state group-hover:shadow-lg group-hover:scale-[1.06]">
          <AvatarImage
            src={image}
            alt={title}
            className="object-contain"
            loading="lazy"
          />
          <AvatarFallback className="text-xs font-bold">{title[0]}</AvatarFallback>
        </Avatar>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-start gap-1.5 rounded-xl p-3 -ml-3 transition-[transform,background-color] duration-240 ease-state hover:bg-accent/30 hover:-translate-y-0.5">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold leading-none text-sm transition-transform duration-240 ease-state group-hover:translate-x-0.5">
            {title}
          </h2>
          {award && (
            <Trophy className="size-3.5 text-yellow-500/60 transition-all duration-400 ease-spring group-hover:text-yellow-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap transition-transform duration-240 ease-state delay-75 group-hover:translate-x-0.5">
          {dates && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-240 ease-state">
              <Calendar className="size-3" />
              {dates}
            </span>
          )}
          {location && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-240 ease-state">
              <MapPin className="size-3" />
              {location}
            </span>
          )}
        </div>

        {description && (
          <p className="text-sm text-pretty text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-240 ease-state">
            {description}
          </p>
        )}

        {links && links.length > 0 && (
          <div className="mt-1.5 flex flex-row flex-wrap items-start gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-240 ease-state">
            {links.map((link, idx) => (
              <Link href={link.href} key={idx} target="_blank" rel="noopener noreferrer">
                <Badge
                  className="flex gap-1.5 px-2.5 py-1 text-[10px] rounded-full hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:duration-100"
                  style={{ transitionDelay: `${Math.min(idx, 4) * 25}ms` }}
                >
                  {link.icon}
                  {link.title}
                  <ExternalLink className="size-2.5 -translate-x-1 opacity-0 transition-all duration-240 ease-state group-hover:translate-x-0 group-hover:opacity-40" />
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
