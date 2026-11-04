"use client";

import Image, { type ImageProps, type StaticImageData } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * `next/image` with a blur-up: while the real image downloads, a tiny blurred
 * copy of it fills the frame; once the full image has loaded it fades in over
 * the top and the blur is removed.
 *
 * `src` must be a static import, which is where the blurred copy comes from.
 * The parent has to be `position: relative` with `overflow: hidden`, because
 * the blur layer is absolutely positioned and slightly oversized so its soft
 * edges stay out of sight.
 */
export function BlurImage({
  src,
  alt,
  className,
  onLoad,
  ...props
}: Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & {
  src: StaticImageData;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {src.blurDataURL && (
        <span
          aria-hidden="true"
          style={{ backgroundImage: `url("${src.blurDataURL}")` }}
          className={cn(
            "pointer-events-none absolute inset-0 scale-110 bg-cover bg-center blur-xl transition-opacity duration-500 ease-out motion-reduce:transition-none",
            loaded ? "opacity-0" : "opacity-100",
          )}
        />
      )}
      <Image
        {...props}
        src={src}
        alt={alt}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        className={cn(
          "transition-opacity duration-500 ease-out motion-reduce:transition-none",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </>
  );
}
