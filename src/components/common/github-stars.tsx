"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

function formatStars(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

export function GitHubStars({ repo }: { repo: string }) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem(`gh-stars-${repo}`);
    if (cached) {
      setStars(Number(cached));
      return;
    }

    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.stargazers_count != null) {
          setStars(data.stargazers_count);
          sessionStorage.setItem(`gh-stars-${repo}`, String(data.stargazers_count));
        }
      })
      .catch(() => {});
  }, [repo]);

  if (stars === null) return null;

  return (
    <span className="group/stars inline-flex items-center gap-1 text-[11px] text-muted-foreground/70 bg-secondary/50 px-2 py-0.5 rounded-full border border-border/50 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all duration-300 cursor-default">
      <Star className="size-3 fill-yellow-500/70 text-yellow-500/70 group-hover/stars:fill-yellow-500 group-hover/stars:text-yellow-500 group-hover/stars:scale-110 transition-all duration-300" />
      <span className="tabular-nums group-hover/stars:text-foreground/80 transition-colors duration-300">{formatStars(stars)}</span>
    </span>
  );
}
