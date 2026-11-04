"use client";

import { ZoomInIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

import { BlurImage } from "@/components/ui/blur-image";
import { prefetchImage } from "@/lib/prefetch-images";
import { cn } from "@/lib/utils";

import { LIGHTBOX_SIZES } from "./gallery-lightbox";

/**
 * One clickable poster that opens the lightbox.
 *
 * - The poster shows a blurred preview until the full image has loaded.
 * - Hovering or focusing it starts fetching the full-size version, so the
 *   lightbox opens already loaded.
 * - Square posters fill a square tile; others keep their proportions.
 * - `fill` stretches the tile to a parent that already has the poster's exact
 *   aspect ratio (used by the collage, so nothing is cropped).
 * - `frame="polaroid"` wraps the poster in a white photo border.
 * - `flat` drops the card shadow (the hover lift stays).
 */
export function GalleryTile({
  image,
  alt,
  sizes,
  big = false,
  fill = false,
  frame = "card",
  flat = false,
  onOpen,
  className,
}: {
  image: StaticImageData;
  alt: string;
  sizes: string;
  /** Larger zoom badge, for feature tiles. */
  big?: boolean;
  fill?: boolean;
  frame?: "card" | "polaroid";
  flat?: boolean;
  onOpen: () => void;
  className?: string;
}) {
  const square = image.width === image.height;
  const polaroid = frame === "polaroid";
  const warm = () => prefetchImage({ image, sizes: LIGHTBOX_SIZES });

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      onPointerEnter={warm}
      onFocus={warm}
      className={cn(
        "group relative block w-full cursor-zoom-in text-left transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]",
        !flat && "shadow-clay hover:shadow-clay-hover",
        polaroid ? "rounded-2xl bg-white p-2.5 pb-9" : "rounded-3xl",
        fill && "h-full",
        className,
      )}
    >
      <span
        className={cn(
          "relative block w-full overflow-hidden bg-muted ring-1 ring-primary-300/50",
          polaroid ? "rounded-lg" : "rounded-3xl",
          fill && "h-full",
          !fill && square && "aspect-square",
        )}
      >
        {fill || square ? (
          <BlurImage
            src={image}
            alt={alt}
            fill
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <BlurImage
            src={image}
            alt={alt}
            sizes={sizes}
            className="h-auto w-full"
          />
        )}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute grid place-items-center rounded-full bg-white/90 text-primary opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
          big ? "size-11" : "size-9",
          polaroid
            ? "right-5 bottom-12"
            : big
              ? "right-4 bottom-4"
              : "right-3 bottom-3",
        )}
      >
        <ZoomInIcon className={big ? "size-6" : "size-5"} />
      </span>
    </button>
  );
}
