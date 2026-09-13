"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Star } from "lucide-react";

function formatStars(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

/** sessionStorage never changes behind our back within a page view. */
const noopSubscribe = () => () => {};

export function GitHubStars({ repo }: { repo: string }) {
  const cacheKey = `gh-stars-${repo}`;

  // sessionStorage is an external store, so it is read through the hook meant
  // for one instead of being copied into state inside an effect.
  const cached = useSyncExternalStore(
    noopSubscribe,
    () => sessionStorage.getItem(cacheKey),
    () => null
  );
  const [fetched, setFetched] = useState<number | null>(null);

  useEffect(() => {
    if (cached !== null) return;

    const controller = new AbortController();

    fetch(`https://api.github.com/repos/${repo}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { stargazers_count?: number } | null) => {
        if (typeof data?.stargazers_count !== "number") return;
        setFetched(data.stargazers_count);
        sessionStorage.setItem(cacheKey, String(data.stargazers_count));
      })
      .catch(() => {});

    return () => controller.abort();
  }, [repo, cacheKey, cached]);

  const stars = fetched ?? (cached !== null ? Number(cached) : null);
  if (stars === null) return null;

  return (
    <span className="group/stars inline-flex items-center gap-1 text-[11px] text-muted-foreground/70 bg-secondary/50 px-2 py-0.5 rounded-full border border-border/50 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all duration-240 ease-state cursor-default">
      <Star className="size-3 fill-yellow-500/70 text-yellow-500/70 group-hover/stars:fill-yellow-500 group-hover/stars:text-yellow-500 group-hover/stars:scale-110 transition-all duration-240 ease-state" />
      <span className="tabular-nums group-hover/stars:text-foreground/80 transition-colors duration-240 ease-state">
        {formatStars(stars)}
      </span>
    </span>
  );
}
