"use client"

/**
 * Pixel Image (Magic UI) — https://magicui.design/docs/components/pixel-image
 *
 * Adapted from the registry version for use inside a responsive gallery:
 *  - sizes to its parent via `className` instead of a fixed 18/24rem box
 *  - starts when scrolled into view (and the image has loaded), not on mount
 *  - pieces are CSS-background cells (faded with motion), so one tile is not N <img> elements, and
 *    the grid collapses to a single layer once the reveal finishes
 *  - deterministic delays, so server and client markup match
 *  - exposes a single `alt` instead of N "Pixel image piece" images
 *  - honours prefers-reduced-motion
 */

import { motion, useInView, useReducedMotion } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type Grid = {
  rows: number
  cols: number
}

const DEFAULT_GRIDS = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
} as const satisfies Record<string, Grid>

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

interface PixelImageProps {
  src: string
  /** Describes the whole image; the individual pixels are hidden from assistive tech. */
  alt: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number // in ms
  maxAnimationDelay?: number // in ms
  colorRevealDelay?: number // in ms
  /** Size and shape (e.g. `aspect-square rounded-3xl`). */
  className?: string
}

const MIN_GRID = 1
const MAX_GRID = 16

const isValidGrid = (grid?: Grid): grid is Grid =>
  !!grid &&
  Number.isInteger(grid.rows) &&
  Number.isInteger(grid.cols) &&
  grid.rows >= MIN_GRID &&
  grid.cols >= MIN_GRID &&
  grid.rows <= MAX_GRID &&
  grid.cols <= MAX_GRID

/** Stable pseudo-random 0..1 for a piece, so SSR and hydration agree. */
const jitter = (index: number) => ((Math.imul(index + 1, 2654435761) >>> 0) % 1000) / 1000

export const PixelImage = ({
  src,
  alt,
  grid = "6x4",
  customGrid,
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  className,
}: PixelImageProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" })
  const reduceMotion = useReducedMotion()

  const [started, setStarted] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [finished, setFinished] = useState(false)

  const { rows, cols } = isValidGrid(customGrid) ? customGrid : DEFAULT_GRIDS[grid]

  // Wait for the picture so the pixels do not "reveal" a blank tile.
  useEffect(() => {
    if (!inView || reduceMotion) return

    const timers: number[] = []
    let begun = false
    const begin = () => {
      if (begun) return
      begun = true
      setStarted(true)
      timers.push(window.setTimeout(() => setShowColor(true), colorRevealDelay))
      timers.push(
        window.setTimeout(
          () => setFinished(true),
          Math.max(maxAnimationDelay, colorRevealDelay) + pixelFadeInDuration + 80
        )
      )
    }

    const probe = new window.Image()
    probe.onload = begin
    probe.onerror = begin
    probe.src = src

    return () => {
      begun = true
      probe.onload = null
      probe.onerror = null
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [inView, reduceMotion, src, colorRevealDelay, maxAnimationDelay, pixelFadeInDuration])

  const pieces = useMemo(
    () =>
      Array.from({ length: rows * cols }, (_, index) => ({
        row: Math.floor(index / cols),
        col: index % cols,
        delay: jitter(index) * maxAnimationDelay,
      })),
    [rows, cols, maxAnimationDelay]
  )

  const background = `url("${src}")`
  const settled = finished || (!!reduceMotion && inView)
  const colored = showColor || settled

  return (
    <div
      ref={ref}
      role="img"
      aria-label={alt}
      data-slot="pixel-image"
      className={cn("relative isolate overflow-hidden bg-muted select-none", className)}
    >
      <noscript>
        <span
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: background }}
        />
      </noscript>

      {inView && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            grayscaleAnimation && (colored ? "grayscale-0" : "grayscale")
          )}
          style={{
            transition: grayscaleAnimation
              ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
              : "none",
          }}
        >
          {settled ? (
            <span
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: background }}
            />
          ) : (
            pieces.map(({ row, col, delay }) => (
              <motion.span
                key={`${row}-${col}`}
                className="absolute"
                initial={{ opacity: 0 }}
                animate={{ opacity: started ? 1 : 0 }}
                transition={{
                  duration: pixelFadeInDuration / 1000,
                  delay: delay / 1000,
                  ease: "easeOut",
                }}
                style={{
                  left: `${(col * 100) / cols}%`,
                  top: `${(row * 100) / rows}%`,
                  width: `${100 / cols}%`,
                  height: `${100 / rows}%`,
                  backgroundImage: background,
                  backgroundSize: `${cols * 100}% ${rows * 100}%`,
                  backgroundPosition: `${cols > 1 ? (col * 100) / (cols - 1) : 0}% ${
                    rows > 1 ? (row * 100) / (rows - 1) : 0
                  }%`,
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
