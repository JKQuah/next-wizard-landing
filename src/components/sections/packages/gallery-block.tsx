"use client";

import { useMemo, useState, type ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { galleryImages } from "@/content/gallery";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

import {
  FULL_BLEED,
  layouts,
  type GalleryLayoutName,
  type ScrollerLabels,
} from "./gallery-layouts";
import { GalleryLightbox, type LightboxLabels } from "./gallery-lightbox";
import {
  ResultCards,
  type ResultCardItem,
  type ResultCardLabels,
} from "./result-cards";

type GalleryContent = Dictionary["pricingMediaPage"]["gallery"];
type GallerySectionContent = GalleryContent["sections"][number];

/** Report cards shown above a section's posters (the results section). */
export type Improvements = GalleryContent["improvements"];

/**
 * One section of the gallery: a heading, its posters laid out in the given
 * style, and a lightbox that pages through them. With `improvements`, report
 * cards (paper plus school, level and score) come first, then a divider, then
 * the posters; the lightbox pages through all of them in that order.
 */
export function GalleryBlock({
  section,
  layout,
  lightbox,
  scroller,
  tone,
  decor,
  improvements,
  headingLevel = "h3",
}: {
  section: GallerySectionContent;
  layout: GalleryLayoutName;
  lightbox: LightboxLabels;
  scroller: ScrollerLabels;
  tone: "light" | "tinted";
  /** Decorative background shapes (dotted doodles), drawn behind the content. */
  decor?: ReactNode;
  improvements?: Improvements;
  /** h2 when the block is a section of its own page, h3 under another heading. */
  headingLevel?: "h2" | "h3";
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const items = useMemo(
    () =>
      section.items.map((item) => ({
        ...item,
        image: galleryImages[item.id],
      })),
    [section.items],
  );

  const cards = useMemo<ResultCardItem[]>(
    () =>
      (improvements?.items ?? []).map((item) => ({
        ...item,
        image: galleryImages[item.id],
      })),
    [improvements],
  );
  const cardLabels: ResultCardLabels | undefined = improvements;
  const viewable = useMemo(() => [...cards, ...items], [cards, items]);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const Layout = layouts[layout];
  const fullBleed = FULL_BLEED.includes(layout);

  const body = (
    <div className="mt-10 md:mt-12">
      {cardLabels && cards.length > 0 && (
        <>
          <ResultCards items={cards} labels={cardLabels} onOpen={openAt} />
          <h4 className="my-10 flex items-center gap-4 text-center text-lg font-extrabold text-primary before:h-px before:flex-1 before:bg-primary-300/60 after:h-px after:flex-1 after:bg-primary-300/60 md:my-12 md:text-xl">
            {improvements?.moreLabel}
          </h4>
        </>
      )}
      <Layout
        items={items}
        scroller={scroller}
        onOpen={(i) => openAt(cards.length + i)}
      />
    </div>
  );
  const headingId = `gallery-${section.id}-title`;

  return (
    <section
      id={`gallery-${section.id}`}
      aria-labelledby={headingId}
      className={cn(
        "relative isolate scroll-mt-24 overflow-hidden py-12 md:py-16",
        tone === "tinted" ? "bg-muted" : "bg-white",
      )}
    >
      {decor}

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal
            as={headingLevel}
            className={cn(
              "leading-tight font-extrabold text-primary",
              headingLevel === "h2"
                ? "text-3xl md:text-4xl"
                : "text-2xl md:text-3xl",
            )}
          >
            <span id={headingId}>{section.label}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.05}
            className="mt-2 text-lg leading-relaxed text-muted-foreground"
          >
            {section.tagline}
          </Reveal>
        </div>

        {!fullBleed && body}
      </div>

      {fullBleed && body}

      <GalleryLightbox
        open={open}
        onOpenChange={setOpen}
        items={viewable}
        index={index}
        onIndexChange={setIndex}
        title={section.label}
        labels={lightbox}
      />
    </section>
  );
}
