"use client";

import React from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
}

/**
 * A cached image can finish decoding before React attaches `onLoad`, in which
 * case the event never fires and the image would sit at `opacity: 0` forever.
 */
function revealIfAlreadyLoaded(node: HTMLImageElement | null) {
  if (node?.complete) node.dataset.loaded = "true";
}

export const OptimizedImage = React.memo(function OptimizedImage({
  src,
  alt,
  className,
  loading = "lazy",
  priority = false,
}: OptimizedImageProps) {
  const eager = priority || loading === "eager";

  return (
    // `output: export` serves unoptimized images, so next/image would only add
    // a wrapper with no optimizer behind it.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      // Fade in once the pixels are actually there, instead of painting in
      // bands as the file arrives. Never on an eager image: those are in the
      // first screen, and holding one transparent until `load` would push
      // Largest Contentful Paint out by the length of the fade.
      data-reveal={eager ? undefined : ""}
      ref={eager ? undefined : revealIfAlreadyLoaded}
      onLoad={
        eager
          ? undefined
          : (event) => {
              event.currentTarget.dataset.loaded = "true";
            }
      }
    />
  );
});
