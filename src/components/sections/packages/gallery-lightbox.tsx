"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useEffect, type CSSProperties, type KeyboardEvent } from "react";

import { BlurImage } from "@/components/ui/blur-image";
import { Button } from "@/components/ui/button";
import { interpolate } from "@/i18n/format";
import type { Dictionary } from "@/i18n/get-dictionary";
import { prefetchImage } from "@/lib/prefetch-images";

export type LightboxLabels =
  Dictionary["pricingMediaPage"]["gallery"]["lightbox"];

export type LightboxItem = {
  image: StaticImageData;
  alt: string;
};

/** Used by `next/image` to pick a file size; close to the frame below. */
export const LIGHTBOX_SIZES = "min(92vw, calc(100dvh - 8.5rem))";

function fit({ image: { width, height } }: LightboxItem): CSSProperties {
  const ratio = width / height;
  return ratio <= 1
    ? { height: "var(--frame)", width: `calc(var(--frame) * ${ratio})` }
    : { width: "var(--frame)", height: `calc(var(--frame) / ${ratio})` };
}

/**
 * Full-size viewer shared by every gallery section. Posters keep their own
 * proportions (portrait ones are not cropped) and arrow keys page through.
 */
export function GalleryLightbox({
  open,
  onOpenChange,
  items,
  index,
  onIndexChange,
  title,
  labels,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: LightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
  title: string;
  labels: LightboxLabels;
}) {
  const current = items[index] ?? items[0];

  // While the viewer is open, fetch the posters on either side so paging
  // through them is instant.
  useEffect(() => {
    if (!open || items.length < 2) return;
    for (const offset of [1, -1]) {
      const neighbour = items[(index + offset + items.length) % items.length];
      prefetchImage({ image: neighbour.image, sizes: LIGHTBOX_SIZES });
    }
  }, [open, index, items]);

  const step = (direction: 1 | -1) =>
    onIndexChange((index + direction + items.length) % items.length);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
    else return;
    event.preventDefault();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-primary-500/85 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          onKeyDown={onKeyDown}
          // --frame is the largest square the poster may fill. Phones have no
          // room beside it for the arrows, so they go in a row underneath and
          // the frame is a little shorter; from sm up they sit left and right.
          className="fixed top-1/2 left-1/2 z-50 flex w-(--frame) -translate-x-1/2 -translate-y-1/2 flex-col gap-3 outline-none transition duration-200 ease-out [--frame:min(92vw,calc(100dvh-12rem))] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:w-[calc(var(--frame)+7rem)] sm:[--frame:min(calc(100vw-8.5rem),calc(100dvh-8.5rem))]"
        >
          <div className="flex items-center justify-between gap-3 text-white sm:px-14">
            <Dialog.Title className="flex min-w-0 items-center gap-2.5 text-base font-extrabold">
              <span className="truncate">{title}</span>
              <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 text-sm font-bold tabular-nums">
                {interpolate(labels.counter, {
                  current: index + 1,
                  total: items.length,
                })}
              </span>
            </Dialog.Title>
            <Dialog.Close
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={labels.close}
                  className="shrink-0 bg-white/15 text-white hover:bg-white/25 aria-expanded:bg-white/25"
                />
              }
            >
              <XIcon aria-hidden="true" className="size-6" />
            </Dialog.Close>
          </div>

          <div className="grid grid-cols-2 items-center gap-3 sm:grid-cols-[2.75rem_1fr_2.75rem]">
            <div className="relative order-first col-span-2 grid aspect-square w-full place-items-center sm:order-none sm:col-span-1 sm:col-start-2 sm:row-start-1">
              {current && (
                <div
                  key={current.image.src}
                  style={fit(current)}
                  className="relative animate-in overflow-hidden rounded-3xl bg-white shadow-2xl duration-200 fade-in motion-reduce:animate-none"
                >
                  <BlurImage
                    src={current.image}
                    alt={current.alt}
                    fill
                    sizes={LIGHTBOX_SIZES}
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {items.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={labels.previous}
                  onClick={() => step(-1)}
                  className="order-2 justify-self-start bg-white/15 text-white hover:bg-white/25 sm:order-none sm:col-start-1 sm:row-start-1"
                >
                  <ChevronLeftIcon aria-hidden="true" className="size-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={labels.next}
                  onClick={() => step(1)}
                  className="order-3 justify-self-end bg-white/15 text-white hover:bg-white/25 sm:order-none sm:col-start-3 sm:row-start-1"
                >
                  <ChevronRightIcon aria-hidden="true" className="size-6" />
                </Button>
              </>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
