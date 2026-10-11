"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  ZoomInIcon,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState, type KeyboardEvent } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { interpolate } from "@/i18n/format";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type GalleryContent = Dictionary["pricingMediaPage"]["gallery"];

const ALL = "all";

/** Files live in public/media/gallery; thumbs are 600px, full size 1200px. */
const fullSrc = (id: string) => `/media/gallery/${id}.jpg`;
const thumbSrc = (id: string) => `/media/gallery/thumb/${id}.jpg`;

/**
 * Bento layout: every run of five images is small / BIG / small. On md+ that is
 * a 4-column, 2-row block (two small tiles, one 2x2 tile, two small tiles); on
 * phones the big tile spans the full width between two rows of small ones.
 * A trailing run of fewer than five is a plain centred row of small tiles.
 */
const BENTO_SIZE = 5;
const BIG_INDEX = 2;
const bentoCells = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-1 md:row-start-2",
  "col-span-2 row-span-2 md:col-start-2 md:row-start-1",
  "md:col-start-4 md:row-start-1",
  "md:col-start-4 md:row-start-2",
];

export function GallerySection({ content }: { content: GalleryContent }) {
  const [filter, setFilter] = useState<string>(ALL);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const items = useMemo(
    () =>
      content.categories.flatMap((category) =>
        category.items.map((item) => ({
          ...item,
          categoryId: category.id,
          categoryLabel: category.label,
        })),
      ),
    [content.categories],
  );

  const visible = useMemo(
    () =>
      filter === ALL
        ? items
        : items.filter((item) => item.categoryId === filter),
    [items, filter],
  );

  const tagline =
    filter === ALL
      ? content.allTagline
      : (content.categories.find((category) => category.id === filter)
          ?.tagline ?? content.allTagline);

  const filters = [
    { id: ALL, label: content.all, count: items.length },
    ...content.categories.map((category) => ({
      id: category.id,
      label: category.label,
      count: category.items.length,
    })),
  ];

  const step = useCallback(
    (direction: 1 | -1) =>
      setIndex(
        (current) => (current + direction + visible.length) % visible.length,
      ),
    [visible.length],
  );

  const onPopupKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
    else return;
    event.preventDefault();
  };

  const current = visible[index] ?? visible[0];

  const groups = Array.from(
    { length: Math.ceil(visible.length / BENTO_SIZE) },
    (_, g) => visible.slice(g * BENTO_SIZE, (g + 1) * BENTO_SIZE),
  );

  return (
    <section id="gallery" className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal
            as="h2"
            className="text-3xl leading-tight font-extrabold text-primary md:text-4xl"
          >
            {content.title}
          </Reveal>
          <Reveal
            as="p"
            delay={0.05}
            className="mt-3 text-lg leading-relaxed text-muted-foreground"
          >
            {content.subtitle}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-8">
          <div
            role="group"
            aria-label={content.filterLabel}
            className="flex flex-wrap justify-center gap-2.5"
          >
            {filters.map(({ id, label, count }) => {
              const active = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(id)}
                  className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-base font-bold ring-2 transition-[background-color,color,box-shadow,transform] duration-200 ease-out focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.97]",
                    active
                      ? "bg-primary text-primary-foreground ring-primary"
                      : "bg-white text-primary ring-primary-300/60 hover:bg-accent",
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-extrabold tabular-nums",
                      active
                        ? "bg-secondary-500 text-primary"
                        : "bg-primary-300/40 text-primary",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          {/* <p
            aria-live="polite"
            className="mt-4 text-center text-base font-semibold text-primary/80"
          >
            {tagline}
          </p> */}
        </Reveal>

        <div className="mt-16 space-y-3 sm:space-y-5">
          {groups.map((group, g) => {
            const bento = group.length === BENTO_SIZE;

            return (
              <ul
                key={g}
                className={cn(
                  "gap-3 sm:gap-5",
                  bento
                    ? "grid grid-cols-2 md:grid-cols-4"
                    : "flex flex-wrap justify-center",
                )}
              >
                {group.map((item, j) => {
                  const i = g * BENTO_SIZE + j;
                  const big = bento && j === BIG_INDEX;

                  return (
                    <li
                      key={item.id}
                      className={
                        bento
                          ? bentoCells[j]
                          : "w-[calc((100%-0.75rem)/2)] md:w-[calc((100%-3.75rem)/4)]"
                      }
                    >
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => {
                          setIndex(i);
                          setOpen(true);
                        }}
                        className="group relative block w-full cursor-zoom-in rounded-3xl text-left shadow-clay transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-clay-hover focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
                      >
                        <span className="relative block aspect-square w-full overflow-hidden rounded-3xl bg-muted ring-1 ring-primary-300/50">
                          <Image
                            src={big ? fullSrc(item.id) : thumbSrc(item.id)}
                            alt={item.alt}
                            fill
                            sizes={
                              big
                                ? "(min-width: 768px) 560px, 92vw"
                                : "(min-width: 768px) 270px, 46vw"
                            }
                            className="object-cover"
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute grid place-items-center rounded-full bg-white/90 text-primary opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
                            big
                              ? "right-4 bottom-4 size-11"
                              : "right-3 bottom-3 size-9",
                          )}
                        >
                          <ZoomInIcon className={big ? "size-6" : "size-5"} />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-primary-500/85 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup
            onKeyDown={onPopupKeyDown}
            className="fixed top-1/2 left-1/2 z-50 flex w-[min(92vw,calc(100dvh-8.5rem))] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 outline-none transition duration-200 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
          >
            <div className="flex items-center justify-between gap-3 text-white">
              <Dialog.Title className="flex min-w-0 items-center gap-2.5 text-base font-extrabold">
                <span className="truncate">
                  {current?.categoryLabel ?? content.lightbox.title}
                </span>
                <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 text-sm font-bold tabular-nums">
                  {interpolate(content.lightbox.counter, {
                    current: index + 1,
                    total: visible.length,
                  })}
                </span>
              </Dialog.Title>
              <Dialog.Close
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={content.lightbox.close}
                    className="shrink-0 bg-white/15 text-white hover:bg-white/25 aria-expanded:bg-white/25"
                  />
                }
              >
                <XIcon aria-hidden="true" className="size-6" />
              </Dialog.Close>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-2xl">
              {current && (
                <Image
                  key={current.id}
                  src={fullSrc(current.id)}
                  alt={current.alt}
                  width={1200}
                  height={1200}
                  sizes="min(92vw, calc(100dvh - 8.5rem))"
                  priority
                  className="animate-in size-full object-cover duration-200 fade-in motion-reduce:animate-none"
                />
              )}

              {visible.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    aria-label={content.lightbox.previous}
                    onClick={() => step(-1)}
                    className="absolute top-[calc(50%-1.375rem)] left-3 bg-white/90 shadow-md hover:bg-white"
                  >
                    <ChevronLeftIcon aria-hidden="true" className="size-6" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    aria-label={content.lightbox.next}
                    onClick={() => step(1)}
                    className="absolute top-[calc(50%-1.375rem)] right-3 bg-white/90 shadow-md hover:bg-white"
                  >
                    <ChevronRightIcon aria-hidden="true" className="size-6" />
                  </Button>
                </>
              )}
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
