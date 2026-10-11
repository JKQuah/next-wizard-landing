"use client";

/**
 * Sparkles — adapted from Magic UI's Sparkles Text
 * (https://magicui.design/docs/components/sparkles-text) so it can wrap any
 * element, not only text. Same four-point star, the same scale / rotate / fade
 * pulse and the same "respawn somewhere else" idea.
 */

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Star = {
  id: string;
  x: number; // % of the wrapper, may stray a little outside it
  y: number;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
};

const STAR_PATH =
  "M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z";

const SIZE = 21;

let counter = 0;
const createStar = (colors: string[]): Star => ({
  id: `star-${counter++}`,
  x: -14 + Math.random() * 128,
  y: -10 + Math.random() * 118,
  color: colors[Math.floor(Math.random() * colors.length)],
  delay: Math.random() * 3,
  scale: 0.5 + Math.random() * 0.9,
  lifespan: 4 + Math.random() * 7,
});

function Sparkle({ x, y, color, delay, scale }: Star) {
  return (
    <motion.svg
      aria-hidden="true"
      className="pointer-events-none absolute z-20"
      style={{ left: `${x}%`, top: `${y}%`, marginLeft: -SIZE / 2, marginTop: -SIZE / 2 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, scale, 0], rotate: [75, 120, 150] }}
      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.9, delay }}
      width={SIZE}
      height={SIZE}
      viewBox="0 0 21 21"
    >
      <path d={STAR_PATH} fill={color} />
    </motion.svg>
  );
}

type SparklesProps = {
  children: ReactNode;
  className?: string;
  count?: number;
  colors?: string[];
};

const DEFAULT_COLORS = ["#ffc400", "#a57bff", "#ff9a3c"];

export function Sparkles({
  children,
  className,
  count = 9,
  colors = DEFAULT_COLORS,
}: SparklesProps) {
  const reduce = useReducedMotion();
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    if (reduce) return;

    let first = true;
    const tick = () => {
      setStars((current) =>
        first || current.length === 0
          ? Array.from({ length: count }, () => createStar(colors))
          : current.map((star) =>
              star.lifespan <= 0
                ? createStar(colors)
                : { ...star, lifespan: star.lifespan - 0.1 },
            ),
      );
      first = false;
    };

    // Start from a timer callback: the stars are random, so they must only be
    // created in the browser, never while the page is prerendered.
    const start = setTimeout(tick, 0);
    const interval = setInterval(tick, 100);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [reduce, count, colors]);

  return (
    <div className={cn("relative", className)}>
      {!reduce && stars.map((star) => <Sparkle key={star.id} {...star} />)}
      {children}
    </div>
  );
}
