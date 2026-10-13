import { CheckIcon } from "lucide-react";

import { Doodle } from "@/components/illustrations/doodle";
import { HeroKids } from "@/components/illustrations/hero-kids";
import { Reveal } from "@/components/motion/reveal";
import { AuroraText } from "@/components/ui/aurora-text";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/get-dictionary";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Brand-derived stops, each >= 3.5:1 on the light hero wash (headline is large text):
 * primary-500, a violet between primary-500 and primary-300, and secondary-500 darkened.
 */
const auroraColors = ["#2e2461", "#6a45d8", "#c2570a"];

const chipPositions = [
  "top-[10%] right-0 sm:right-[2%]",
  "bottom-[16%] left-0 sm:left-[-2%]",
  "bottom-[6%] right-0 sm:right-[-2%]",
];

/** Alternate the tilt so the three chips don't all lean the same way. */
const chipHoverTilt = [
  "motion-safe:hover:-rotate-3",
  "motion-safe:hover:rotate-3",
  "motion-safe:hover:-rotate-2",
];

export function HeroSection({ dict }: { dict: Dictionary }) {
  const { hero, cta } = dict;

  return (
    <section id="top" className="relative isolate overflow-hidden bg-aurora">
      <Doodle
        variant="loop"
        className="top-8 -left-24 -z-10 w-[32rem] max-w-none"
      />
      <Doodle
        variant="arc"
        className="top-0 right-[-6rem] -z-10 hidden w-[28rem] max-w-none md:block"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-4 px-4 pt-12 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-8 md:pt-0">
        <div className="pb-4 md:py-20">
          <Reveal
            eager
            as="h1"
            className="text-4xl leading-[1.25] font-black tracking-tight text-black sm:text-5xl"
          >
            {hero.titleStart}{" "}
            <AuroraText colors={auroraColors} className="whitespace-nowrap">
              {hero.highlight}
            </AuroraText>
            {hero.titleEnd}
          </Reveal>

          <Reveal
            eager
            as="p"
            delay={0.1}
            className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            {hero.subtitle}
          </Reveal>

          <Reveal eager delay={0.2} className="mt-8">
            <a
              href={whatsappUrl(cta.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "cta", size: "lg" }),
                "w-full sm:w-auto",
              )}
            >
              {cta.signUp}
            </a>
          </Reveal>
        </div>

        <Reveal
          eager
          delay={0.15}
          y={32}
          className="relative mx-auto w-full max-w-[34rem] self-end"
        >
          <HeroKids alt={hero.imageAlt} className="block h-auto w-full" />
          {hero.chips.map((chip, i) => (
            <Reveal
              key={chip.word}
              // One at a time, a touch slower than the first pass (was 0.12s apart).
              delay={0.45 + i * 0.22}
              y={12}
              scale={0.92}
              className={cn("absolute", chipPositions[i])}
            >
              {/* Hover lives on this inner card: the Reveal wrapper owns its transform. */}
              <div
                className={cn(
                  "group flex cursor-default items-center gap-2.5 rounded-2xl bg-white py-2 pr-5.5 pl-2.5 shadow-clay ring-2 ring-transparent transition-[transform,box-shadow] duration-300 ease-out-soft hover:shadow-clay-hover hover:ring-secondary-400",
                  "motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-110",
                  chipHoverTilt[i],
                )}
              >
                <span
                  aria-hidden="true"
                  className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-500 text-white transition-[transform,background-color,color] duration-300 ease-out-soft group-hover:bg-secondary-500 group-hover:text-primary motion-safe:group-hover:scale-125 motion-safe:group-hover:rotate-12"
                >
                  <CheckIcon className="size-3.5" strokeWidth={3} />
                </span>
                <p className="leading-tight">
                  <span className="block text-base font-extrabold text-primary">
                    {chip.word}
                  </span>
                  <span className="block text-xs font-semibold text-muted-foreground">
                    {chip.translation}
                  </span>
                </p>
              </div>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
