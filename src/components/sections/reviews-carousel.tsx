"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ReviewsCarouselProps = {
  /** Rendered to the left of the arrow buttons. */
  heading: ReactNode;
  /** `<li>` slides. */
  children: ReactNode;
  /** Number of slides; with 4+ the desktop view peeks at a half card. */
  count: number;
  labels: { region: string; previous: string; next: string };
};

export function ReviewsCarousel({ heading, children, count, labels }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ scrollable: false, atStart: true, atEnd: true });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      scrollable: el.scrollWidth > el.clientWidth + 1,
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * (first.offsetWidth + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  // Slide widths: 1.15 cards on phones, ~2 on tablets, 3.5 (or exactly 3) on desktop.
  const slideSizing =
    count > 3
      ? "[&>li]:basis-[calc((100%-1.25rem)/1.15)] sm:[&>li]:basis-[calc((100%-2.5rem)/2.15)] lg:[&>li]:basis-[calc((100%-3.75rem)/3.5)]"
      : "[&>li]:basis-[calc((100%-1.25rem)/1.15)] sm:[&>li]:basis-[calc((100%-2.5rem)/2.15)] lg:[&>li]:basis-[calc((100%-2.5rem)/3)]";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={labels.region}>
      <div className="flex items-end justify-between gap-4">
        {heading}
        <div
          className={cn("flex shrink-0 gap-2", !edges.scrollable && "invisible")}
          aria-hidden={!edges.scrollable}
        >
          <Button
            variant="outline"
            size="icon-lg"
            aria-label={labels.previous}
            disabled={edges.atStart}
            tabIndex={edges.scrollable ? 0 : -1}
            onClick={() => scrollByCard(-1)}
            className="bg-white"
          >
            <ChevronLeftIcon aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            aria-label={labels.next}
            disabled={edges.atEnd}
            tabIndex={edges.scrollable ? 0 : -1}
            onClick={() => scrollByCard(1)}
            className="bg-white"
          >
            <ChevronRightIcon aria-hidden="true" />
          </Button>
        </div>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        className={cn(
          "-mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pt-1 pb-8 [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden",
          "scroll-px-4 sm:scroll-px-6 [&>li]:shrink-0 [&>li]:snap-start",
          "focus-visible:rounded-3xl focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none",
          slideSizing,
        )}
      >
        {children}
      </ul>
    </div>
  );
}
