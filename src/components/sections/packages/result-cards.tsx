"use client";

import { ArrowRightIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useMemo } from "react";

import { interpolate } from "@/i18n/format";
import { useIdlePrefetch } from "@/lib/prefetch-images";

import { FloatIn } from "./float-in";
import { GalleryTile } from "./gallery-tile";

export type ResultCardItem = {
  id: string;
  alt: string;
  image: StaticImageData;
  school: string;
  level: string;
  exam: string;
  score: string;
  /** The earlier score, for a before-and-after improvement. Empty if none. */
  from: string;
  /** Letter grade on the paper. Empty if the paper shows none. */
  grade: string;
  summary: string;
};

export type ResultCardLabels = {
  gradeLabel: string;
  fromLabel: string;
  toLabel: string;
};

const CARD_SIZES = "(min-width: 1024px) 340px, (min-width: 768px) 230px, 42vw";

/**
 * Report cards from real students: the marked paper next to who sat it and
 * what they scored. On phones each card is a row (paper left, details right);
 * from md up they are three equal columns with the paper on top. Tapping the
 * paper opens it in the lightbox.
 */
export function ResultCards({
  items,
  labels,
  onOpen,
}: {
  items: ResultCardItem[];
  labels: ResultCardLabels;
  onOpen: (index: number) => void;
}) {
  useIdlePrefetch(
    useMemo(
      () => items.map(({ image }) => ({ image, sizes: CARD_SIZES })),
      [items],
    ),
  );

  return (
    <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
      {items.map((item, i) => (
        <li key={item.id} className="flex">
          <FloatIn index={i} className="flex w-full">
            <article className="flex w-full gap-4 rounded-3xl border border-primary-300/50 bg-white p-3 shadow-clay md:flex-col md:gap-5 md:p-4">
              <div className="aspect-7/10 w-[42%] shrink-0 self-start md:w-full">
                <GalleryTile
                  image={item.image}
                  alt={item.alt}
                  fill
                  flat
                  sizes={CARD_SIZES}
                  imageClassName="object-cover object-top"
                  onOpen={() => onOpen(i)}
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 md:justify-start md:px-1 md:pb-1">
                <p className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
                  {item.level}
                </p>
                <h4 className="text-base leading-snug font-extrabold text-primary md:text-lg">
                  {item.school}
                </h4>
                <p className="text-sm text-muted-foreground">{item.exam}</p>

                <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-2">
                  {item.from && (
                    <>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground">
                          {labels.fromLabel}
                        </p>
                        <p className="text-xl font-bold text-muted-foreground line-through decoration-2 md:text-2xl">
                          {item.from}
                        </p>
                      </div>
                      <ArrowRightIcon
                        aria-hidden="true"
                        className="mb-1.5 size-5 text-primary md:mb-2"
                      />
                    </>
                  )}
                  <div>
                    {item.from && (
                      <p className="text-xs font-semibold text-muted-foreground">
                        {labels.toLabel}
                      </p>
                    )}
                    <p className="bg-linear-to-t from-secondary-300/70 from-35% to-transparent to-35% px-1 text-3xl leading-tight font-extrabold text-primary md:text-4xl">
                      {item.score}
                    </p>
                  </div>
                  {item.grade && (
                    <p className="mb-1 rounded-full bg-secondary-300 px-3 py-1 text-sm font-extrabold text-primary">
                      {interpolate(labels.gradeLabel, { grade: item.grade })}
                    </p>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </div>
            </article>
          </FloatIn>
        </li>
      ))}
    </ul>
  );
}
