"use client";

import { motion, MotionConfig, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const tags = {
  div: motion.div,
  section: motion.section,
  header: motion.header,
  footer: motion.footer,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof tags;
  className?: string;
  /** Seconds to wait once the element is in view; use it to stagger siblings. */
  delay?: number;
  /** Seconds the fade/rise takes. Longer reads as calmer. */
  duration?: number;
  /** Starting offset in px. Positive values rise up into place. */
  y?: number;
  x?: number;
  scale?: number;
  /** Portion of the element (0–1) that must be visible to trigger. */
  amount?: number;
  /**
   * For first-screen content: render visible straight from the server HTML
   * instead of starting hidden. Hidden-until-hydration content delays LCP.
   */
  eager?: boolean;
};

/**
 * Fades its children in (with a short rise) the first time they scroll into
 * view. Honours `prefers-reduced-motion` through <MotionProvider>.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  duration = 0.45,
  y = 24,
  x = 0,
  scale = 1,
  amount = 0.15,
  eager = false,
}: RevealProps) {
  const Component = tags[as];

  const variants: Variants = {
    hidden: { opacity: 0, y, x, scale },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration, ease: EASE_OUT, delay },
    },
  };

  return (
    <Component
      data-reveal
      className={className}
      variants={variants}
      initial={eager ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </Component>
  );
}

/** Wrap the app once so every <Reveal> respects the OS reduced-motion setting. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
