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

type GallerySectionContent =
  Dictionary["pricingMediaPage"]["gallery"]["sections"][number];

/**
 * One section of the gallery: a heading, its posters laid out in the given
 * style, and a lightbox that pages through them.
 */
export function GalleryBlock({
  section,
  layout,
  lightbox,
  scroller,
  tone,
  decor,
}: {
  section: GallerySectionContent;
  layout: GalleryLayoutName;
  lightbox: LightboxLabels;
  scroller: ScrollerLabels;
  tone: "light" | "tinted";
  /** Decorative background shapes (dotted doodles), drawn behind the content. */
  decor?: ReactNode;
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

  const Layout = layouts[layout];
  const fullBleed = FULL_BLEED.includes(layout);

  const body = (
    <div className="mt-10 md:mt-12">
      <Layout
        items={items}
        scroller={scroller}
        onOpen={(i) => {
          setIndex(i);
          setOpen(true);
        }}
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
            as="h3"
            className="text-2xl leading-tight font-extrabold text-primary md:text-3xl"
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
        items={items}
        index={index}
        onIndexChange={setIndex}
        title={section.label}
        labels={lightbox}
      />
    </section>
  );
}
