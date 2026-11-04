"use client";

import { getImageProps, type StaticImageData } from "next/image";
import { useEffect } from "react";

export type PrefetchEntry = { image: StaticImageData; sizes: string };

// Remembers what has been requested (and keeps the elements alive so the
// browser doesn't cancel a download that is still in flight).
const requested = new Map<string, HTMLImageElement>();

/**
 * Starts downloading an image into the browser cache without showing it.
 *
 * It asks `next/image` for the same `srcset` and `sizes` the real <Image> will
 * use, then lets the browser pick the candidate for this screen. The picture
 * the page renders later is therefore served straight from cache.
 */
export function prefetchImage({ image, sizes }: PrefetchEntry) {
  if (typeof window === "undefined") return;
  const key = `${image.src}|${sizes}`;
  if (requested.has(key)) return;

  const { props } = getImageProps({ src: image, alt: "", sizes });
  const element = new window.Image();
  element.decoding = "async";
  element.sizes = sizes;
  if (props.srcSet) element.srcset = props.srcSet;
  element.src = String(props.src);
  requested.set(key, element);
}

/** True when the visitor asked to save data or is on a very slow connection. */
function shouldSkipPrefetch() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  return (
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g"
  );
}

/**
 * Prefetches a list of images once the browser is idle, one after another with
 * a short pause so it never competes with scrolling or the page's own loading.
 * Skipped on Data Saver and slow connections.
 */
export function useIdlePrefetch(entries: PrefetchEntry[]) {
  useEffect(() => {
    if (shouldSkipPrefetch()) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const run = (index: number) => {
      if (cancelled || index >= entries.length) return;
      prefetchImage(entries[index]);
      timer = setTimeout(() => run(index + 1), 150);
    };

    const start = () => run(0);
    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(start, { timeout: 4000 })
        : undefined;
    if (idle === undefined) timer = setTimeout(start, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (idle !== undefined) window.cancelIdleCallback(idle);
    };
  }, [entries]);
}
