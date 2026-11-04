"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { FloatIn } from "./float-in";
import { GalleryTile } from "./gallery-tile";

export type PosterStripItem = {
  id: string;
  alt: string;
  image: StaticImageData;
};

/** What `next/image` should size each poster for (matches the card widths below). */
export const POSTER_SIZES =
  "(min-width: 1024px) 384px, (min-width: 640px) 320px, 78vw";

/**
 * A single sideways-scrolling row of posters with snap points, spanning the
 * full width of the screen. The padding at both ends lines the first and last
 * poster up with the page content (max-w-6xl + gutters) while the rest of the
 * row bleeds out to the screen edges. The scrollbar is hidden; arrows sit
 * centred underneath, and only appear when there is more than fits.
 *
 * Put it outside any max-width container so it can reach the screen edges.
 * `tone` picks arrow colours for a dark or a light background; `flat` removes
 * the shadow from the poster cards.
 */
export function PosterStrip({
  items,
  label,
  previous,
  next,
  onOpen,
  tone = "light",
  flat = false,
}: {
  items: PosterStripItem[];
  label: string;
  previous: string;
  next: string;
  onOpen: (index: number) => void;
  tone?: "light" | "dark";
  flat?: boolean;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 1,
      end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 1,
    });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scroller.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(card.parentElement!).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const overflows = !(edge.start && edge.end);
  const arrow = cn(
    "shadow-md",
    tone === "dark"
      ? "bg-white/90 hover:bg-white"
      : "bg-accent hover:bg-primary-300/50",
  );

  return (
    <div>
      <div
        ref={scroller}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={measure}
        className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-ps-(--edge) ps-(--edge) pe-(--edge) pt-1 pb-6 [--edge:max(1rem,calc((100%_-_72rem)/2_+_1rem))] [scrollbar-width:none] focus-visible:ring-4 focus-visible:ring-secondary-300 focus-visible:outline-none sm:[--edge:max(1.5rem,calc((100%_-_72rem)/2_+_1.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-4 sm:gap-5">
          {items.map((item, i) => (
            <li
              key={item.id}
              className="w-[78vw] max-w-88 shrink-0 snap-start sm:w-80 lg:w-96 lg:max-w-none"
            >
              <FloatIn index={i} peek>
                <GalleryTile
                  image={item.image}
                  alt={item.alt}
                  sizes={POSTER_SIZES}
                  flat={flat}
                  onOpen={() => onOpen(i)}
                />
              </FloatIn>
            </li>
          ))}
        </ul>
      </div>

      {overflows && (
        <div className="mt-2 flex justify-center gap-3">
          <Button
            variant="secondary"
            size="icon"
            aria-label={previous}
            disabled={edge.start}
            onClick={() => scrollByCard(-1)}
            className={arrow}
          >
            <ChevronLeftIcon aria-hidden="true" className="size-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label={next}
            disabled={edge.end}
            onClick={() => scrollByCard(1)}
            className={arrow}
          >
            <ChevronRightIcon aria-hidden="true" className="size-6" />
          </Button>
        </div>
      )}
    </div>
  );
}
