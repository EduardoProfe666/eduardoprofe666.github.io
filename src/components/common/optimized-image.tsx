"use client";

import React from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
}

export const OptimizedImage = React.memo(function OptimizedImage({
  src,
  alt,
  className,
  loading = "lazy",
  priority = false,
}: OptimizedImageProps) {
  return (
    // `output: export` serves unoptimized images, so next/image would only add
    // a wrapper with no optimizer behind it.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : loading}
      decoding="async"
      style={{
        willChange: loading === "lazy" ? "auto" : "transform",
      }}
    />
  );
});
