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
