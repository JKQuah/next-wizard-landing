import type { ReactNode } from "react";

import { Doodle } from "@/components/illustrations/doodle";
import type { Dictionary } from "@/i18n/get-dictionary";

import { GalleryBlock } from "./gallery-block";
import type { GalleryLayoutName } from "./gallery-layouts";
import { StarStudentSection } from "./star-students";

type GalleryContent = Dictionary["pricingMediaPage"]["gallery"];

/** Each section gets its own look so the wall doesn't read as one repeated grid. */
const LAYOUTS: Record<string, GalleryLayoutName> = {
  benefits: "scroll",
  method: "showcase",
  reviews: "polaroid",
  results: "collage",
};

/**
 * Dotted background lines for each section. Every section gets its own mix of
 * shapes, sizes, angles and corners so the wall doesn't repeat itself. The
 * larger ones are hidden on phones, where they would crowd the content.
 */
const DECOR: Record<string, ReactNode> = {
  benefits: (
    <>
      <Doodle variant="wave" className="top-10 -right-24 -z-10 w-[36rem] max-w-none -rotate-6" />
      <Doodle variant="arc" className="bottom-2 -left-16 -z-10 hidden w-[26rem] max-w-none -scale-x-100 md:block" />
    </>
  ),
  method: (
    <>
      <Doodle variant="loop" className="top-2 -left-28 -z-10 w-[34rem] max-w-none rotate-3" />
      <Doodle variant="wave" className="right-[-6rem] bottom-4 -z-10 hidden w-[32rem] max-w-none -rotate-3 md:block" />
    </>
  ),
  reviews: (
    <>
      <Doodle variant="arc" className="top-6 right-[6%] -z-10 w-[24rem] max-w-none -scale-x-100 rotate-6" />
      <Doodle variant="loop" className="bottom-0 -left-32 -z-10 hidden w-[30rem] max-w-none -rotate-[8deg] md:block" />
    </>
  ),
  results: (
    <>
      <Doodle variant="wave" className="top-0 -left-24 -z-10 w-[34rem] max-w-none rotate-6" />
      <Doodle variant="loop" className="right-[-8rem] bottom-2 -z-10 hidden w-[30rem] max-w-none -scale-x-100 rotate-3 md:block" />
    </>
  ),
};

/**
 * The gallery wall: one block each for benefits, method, reviews and results,
 * then the star student posters, which have their own month tabs. Image files
 * live under src/assets (see src/content/gallery.ts).
 */
export function GallerySection({ content }: { content: GalleryContent }) {
  return (
    // The wrapper is the #gallery anchor that the old /media URL redirects to.
    <div id="gallery" className="scroll-mt-24">
      {content.sections.map((section, i) => (
        <GalleryBlock
          key={section.id}
          section={section}
          layout={LAYOUTS[section.id] ?? "bento"}
          lightbox={content.lightbox}
          scroller={content.scroller}
          tone={i % 2 === 0 ? "light" : "tinted"}
          decor={DECOR[section.id]}
        />
      ))}

      <StarStudentSection
        content={content.starStudent}
        lightbox={content.lightbox}
      />
    </div>
  );
}
