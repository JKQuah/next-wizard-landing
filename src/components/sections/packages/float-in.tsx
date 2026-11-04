"use client";

import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";

/**
 * Makes a gallery image float in (fade, rise and settle) the first time it
 * scrolls into view. `index` staggers neighbours: posters in the same row
 * arrive one after another instead of all at once. Does nothing for visitors
 * who prefer reduced motion (handled by <Reveal>).
 *
 * Wrap the image, not the layout cell, so the cell keeps its own sizing.
 * `peek` is for rows that scroll sideways: it starts the animation as soon as
 * any sliver of the image shows, so a poster peeking in from the screen edge
 * is never blank.
 */
export function FloatIn({
  children,
  index = 0,
  peek = false,
  className,
}: {
  children: ReactNode;
  index?: number;
  peek?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      y={36}
      scale={0.96}
      duration={0.65}
      delay={(index % 4) * 0.09}
      amount={peek ? 0.01 : undefined}
      className={className}
    >
      {children}
    </Reveal>
  );
}
