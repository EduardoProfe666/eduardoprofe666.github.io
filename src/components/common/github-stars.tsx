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
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Star className="size-3 fill-yellow-500 text-yellow-500" />
      {formatStars(stars)}
    </span>
  );
}
