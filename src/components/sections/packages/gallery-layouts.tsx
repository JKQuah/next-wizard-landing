"use client";

import type { StaticImageData } from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { BlurImage } from "@/components/ui/blur-image";
import { useIdlePrefetch, type PrefetchEntry } from "@/lib/prefetch-images";
import { cn } from "@/lib/utils";

import { FloatIn } from "./float-in";
import { GalleryTile } from "./gallery-tile";
import { POSTER_SIZES, PosterStrip } from "./poster-strip";

export type GalleryLayoutName =
  "bento" | "scroll" | "showcase" | "polaroid" | "collage";

export type GalleryImage = {
  id: string;
  alt: string;
  image: StaticImageData;
};

export type ScrollerLabels = {
  listLabel: string;
  previous: string;
  next: string;
};

export type LayoutProps = {
  items: GalleryImage[];
  onOpen: (index: number) => void;
  /** True while the full-size viewer is open; layouts that animate hold still. */
  paused?: boolean;
  /** Accessible names for layouts that scroll sideways. */
  scroller: ScrollerLabels;
};

/** Layouts that run edge to edge instead of sitting in the page container. */
export const FULL_BLEED: GalleryLayoutName[] = ["scroll"];

/* ------------------------------------------------------------------ bento */

/**
 * Every run of five posters is small / BIG / small. On md+ that is a 4-column,
 * 2-row block (two small tiles, one 2x2 tile, two small tiles); on phones the
 * big tile spans the full width between two rows of small ones. A trailing run
 * of fewer than five is a plain centred row.
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

const BENTO_BIG_SIZES = "(min-width: 768px) 560px, 92vw";
const BENTO_SMALL_SIZES = "(min-width: 768px) 270px, 46vw";

export function BentoLayout({ items, onOpen }: LayoutProps) {
  useIdlePrefetch(
    useMemo(
      () =>
        items.map(({ image }, i) => ({
          image,
          sizes:
            i % BENTO_SIZE === BIG_INDEX ? BENTO_BIG_SIZES : BENTO_SMALL_SIZES,
        })),
      [items],
    ),
  );

  const groups = Array.from(
    { length: Math.ceil(items.length / BENTO_SIZE) },
    (_, g) => items.slice(g * BENTO_SIZE, (g + 1) * BENTO_SIZE),
  );

  return (
    <div className="space-y-3 sm:space-y-5">
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
                  <FloatIn index={j}>
                    <GalleryTile
                      image={item.image}
                      alt={item.alt}
                      big={big}
                      sizes={big ? BENTO_BIG_SIZES : BENTO_SMALL_SIZES}
                      onOpen={() => onOpen(g * BENTO_SIZE + j)}
                    />
                  </FloatIn>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------- scroll */

/** One row that scrolls sideways to the screen edge, like Star Students. */
export function ScrollLayout({ items, onOpen, scroller }: LayoutProps) {
  useIdlePrefetch(
    useMemo(
      () => items.map(({ image }) => ({ image, sizes: POSTER_SIZES })),
      [items],
    ),
  );

  return (
    <PosterStrip
      items={items}
      flat
      onOpen={onOpen}
      label={scroller.listLabel}
      previous={scroller.previous}
      next={scroller.next}
    />
  );
}

/* --------------------------------------------------------------- showcase */

/**
 * One large featured poster beside a rail of thumbnails. Picking a thumbnail
 * swaps the featured poster; clicking the featured poster opens it full size.
 * On phones the rail becomes a swipeable row under the poster.
 *
 * The featured poster also steps through the set by itself every AUTO_MS while
 * the block is on screen. After the visitor picks a thumbnail it stays on that
 * poster for PICK_HOLD_MS, then carries on from there. It holds still while the
 * pointer or keyboard focus is on the featured poster, while the full-size
 * viewer is open, in a hidden tab, and for visitors who prefer reduced motion.
 *
 * `--f` is the featured poster's side. The rail is sized from it so that five
 * thumbnails and four gaps add up to exactly the same height.
 */
const SHOWCASE_SIZES =
  "(min-width: 1024px) 608px, (min-width: 768px) 416px, 92vw";
const SHOWCASE_THUMB_SIZES =
  "(min-width: 1024px) 120px, (min-width: 768px) 80px, 64px";

const AUTO_MS = 2000;
const PICK_HOLD_MS = 1500;

export function ShowcaseLayout({ items, onOpen, paused }: LayoutProps) {
  const [active, setActive] = useState(0);
  // Bumped on every pick so the timer starts over from the picked poster.
  const [picks, setPicks] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const nextDelay = useRef(AUTO_MS);
  const [onScreen, setOnScreen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const current = items[active] ?? items[0];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || engaged || !onScreen || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        if (!document.hidden) setActive((a) => (a + 1) % items.length);
        nextDelay.current = AUTO_MS;
        schedule();
      }, nextDelay.current);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [paused, engaged, onScreen, picks, items.length]);

  // On phones the rail scrolls sideways: keep the active thumbnail in view.
  useEffect(() => {
    const list = rail.current;
    const thumb = list?.children[active] as HTMLElement | undefined;
    if (!list || !thumb || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: thumb.offsetLeft - (list.clientWidth - thumb.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  // Thumbnails first (they are what is on screen), then the large version of
  // every poster so picking one swaps instantly.
  useIdlePrefetch(
    useMemo<PrefetchEntry[]>(
      () => [
        ...items.map(({ image }) => ({ image, sizes: SHOWCASE_THUMB_SIZES })),
        ...items.map(({ image }) => ({ image, sizes: SHOWCASE_SIZES })),
      ],
      [items],
    ),
  );

  return (
    <div
      ref={root}
      className="flex flex-col gap-4 md:mx-auto md:grid md:w-fit md:grid-cols-[var(--f)_calc((var(--f)_-_3rem)_*_0.4_+_0.75rem)] md:items-start md:gap-6 md:[--f:26rem] lg:[--f:38rem]"
    >
      <FloatIn>
        <div
          onPointerEnter={(e) => e.pointerType === "mouse" && setEngaged(true)}
          onPointerLeave={() => setEngaged(false)}
          onFocus={() => setEngaged(true)}
          onBlur={() => setEngaged(false)}
        >
          <GalleryTile
            key={current.id}
            image={current.image}
            alt={current.alt}
            big
            sizes={SHOWCASE_SIZES}
            onOpen={() => onOpen(active)}
            className="animate-in duration-300 fade-in motion-reduce:animate-none"
          />
        </div>
      </FloatIn>

      <ul
        ref={rail}
        className="relative -mx-4 flex snap-x scroll-px-4 gap-2.5 overflow-x-auto px-4 pt-1 pb-2 [scrollbar-width:thin] md:mx-0 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:p-0"
      >
        {items.map((item, i) => {
          const selected = i === active;

          return (
            <li key={item.id} className="shrink-0 snap-start md:shrink">
              <FloatIn index={i} peek>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    nextDelay.current = PICK_HOLD_MS;
                    setPicks((n) => n + 1);
                    setActive(i);
                  }}
                  className={cn(
                    "relative block size-16 cursor-pointer overflow-hidden rounded-xl ring-2 transition-[box-shadow,transform,opacity] duration-200 ease-out focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.96] md:aspect-square md:h-auto md:w-full md:rounded-2xl",
                    selected
                      ? "shadow-clay ring-secondary-500"
                      : "opacity-70 ring-primary-300/50 hover:opacity-100",
                  )}
                >
                  <BlurImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes={SHOWCASE_THUMB_SIZES}
                    className="object-cover"
                  />
                </button>
              </FloatIn>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------- polaroid */

const TILT = ["-rotate-3", "rotate-2", "rotate-3", "-rotate-2"];

/**
 * Posters pinned up like instant photos: white borders, a strip of tape, a
 * slight tilt, and every other one dropped lower. They straighten on hover.
 */
const POLAROID_SIZES =
  "(min-width: 1152px) 270px, (min-width: 768px) 22vw, 46vw";

export function PolaroidLayout({ items, onOpen }: LayoutProps) {
  useIdlePrefetch(
    useMemo(
      () => items.map(({ image }) => ({ image, sizes: POLAROID_SIZES })),
      [items],
    ),
  );

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 px-1 md:grid-cols-4 md:gap-x-6">
      {items.map((item, i) => (
        <li key={item.id} className={i % 2 === 1 ? "mt-6 md:mt-12" : undefined}>
          <FloatIn index={i}>
            <div
              className={cn(
                "relative transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.04] hover:rotate-0 motion-reduce:transition-none",
                TILT[i % TILT.length],
              )}
            >
              <span
                aria-hidden="true"
                className="absolute -top-2.5 left-1/2 z-10 h-5 w-16 -translate-x-1/2 -rotate-3 rounded-xs bg-secondary-300/80 shadow-sm"
              />
              <GalleryTile
                image={item.image}
                alt={item.alt}
                frame="polaroid"
                sizes={POLAROID_SIZES}
                onOpen={() => onOpen(i)}
              />
            </div>
          </FloatIn>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------- collage */

/**
 * A justified collage: every poster has the same height and a width that
 * follows its own proportions, so mixed square and portrait posters sit in
 * tidy rows without any cropping. From sm up, all posters share one row: each
 * grows in proportion to its aspect ratio (`--grow`), which makes the heights
 * come out equal. On phones they wrap at a fixed small height (`--row`).
 */
const COLLAGE_SIZES =
  "(min-width: 1024px) 230px, (min-width: 640px) 19vw, 40vw";

export function CollageLayout({ items, onOpen }: LayoutProps) {
  useIdlePrefetch(
    useMemo(
      () => items.map(({ image }) => ({ image, sizes: COLLAGE_SIZES })),
      [items],
    ),
  );

  return (
    <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 [--row:8.5rem] sm:flex-nowrap sm:gap-4">
      {items.map((item, i) => (
        <li
          key={item.id}
          style={
            {
              aspectRatio: `${item.image.width} / ${item.image.height}`,
              "--grow": item.image.width / item.image.height,
            } as CSSProperties
          }
          className="h-(--row) flex-none sm:h-auto sm:min-w-0 sm:flex-[var(--grow)_1_0%]"
        >
          <FloatIn index={i} className="h-full">
            <GalleryTile
              image={item.image}
              alt={item.alt}
              fill
              sizes={COLLAGE_SIZES}
              onOpen={() => onOpen(i)}
            />
          </FloatIn>
        </li>
      ))}
    </ul>
  );
}

export const layouts = {
  bento: BentoLayout,
  scroll: ScrollLayout,
  showcase: ShowcaseLayout,
  polaroid: PolaroidLayout,
  collage: CollageLayout,
} satisfies Record<GalleryLayoutName, (props: LayoutProps) => React.ReactNode>;
