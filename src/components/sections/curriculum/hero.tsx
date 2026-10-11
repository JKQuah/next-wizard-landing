import { ArrowDownIcon, CheckIcon } from "lucide-react";

import { Doodle } from "@/components/illustrations/doodle";
import { BarModel } from "@/components/illustrations/bar-model";
import { Reveal } from "@/components/motion/reveal";
import { RichText } from "@/components/rich-text";
import { AuroraText } from "@/components/ui/aurora-text";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/get-dictionary";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Same brand-derived stops as the home hero (each >= 3.5:1 on the wash). */
const auroraColors = ["#2e2461", "#6a45d8", "#c2570a"];

const chipPositions = [
  "top-[-5%] right-0 sm:right-[-4%]",
  "bottom-[-7%] left-0 sm:left-[-4%]",
];

/** Decorative operators floating around the bar model. */
const symbols = [
  { char: "+", className: "top-[8%] left-[-3%] bg-secondary-300 -rotate-12" },
  { char: "×", className: "right-[-2%] bottom-[22%] bg-primary-300 rotate-12" },
  {
    char: "÷",
    className: "top-[-9%] left-[38%] bg-secondary-400 rotate-6 max-sm:hidden",
  },
];

export function CurriculumHero({ dict }: { dict: Dictionary }) {
  const { title, hero } = dict.curriculumPage;

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

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 py-14 sm:px-6 md:min-h-[34rem] md:grid-cols-[1.05fr_1fr] md:gap-10 md:py-20 lg:min-h-[38rem]">
        <div>
          <Reveal
            eager
            as="h1"
            className="text-5xl leading-[1.15] font-black tracking-tight text-primary sm:text-6xl lg:text-7xl"
          >
            {title}
          </Reveal>

          <Reveal
            eager
            as="p"
            delay={0.1}
            className="mt-6 max-w-xl text-xl leading-relaxed text-primary/85 md:text-xl md:leading-relaxed"
          >
            <RichText text={hero.text} />
          </Reveal>

          <Reveal
            eager
            delay={0.2}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#syllabus"
              className={cn(
                buttonVariants({ variant: "cta", size: "lg" }),
                "group",
              )}
            >
              {hero.cta}
              <ArrowDownIcon
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={whatsappUrl(dict.cta.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "bg-white/80",
              )}
            >
              {dict.cta.signUp}
              <span className="sr-only">{dict.a11y.external}</span>
            </a>
          </Reveal>
        </div>

        <Reveal
          eager
          delay={0.15}
          y={32}
          className="relative mx-auto w-full max-w-md md:max-w-none"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-[2.5rem] bg-primary-500 sm:translate-x-4 sm:translate-y-4"
          />
          <div className="relative rounded-[2.5rem] bg-white p-6 shadow-clay ring-1 ring-primary-300/50 sm:p-8">
            <BarModel alt={hero.imageAlt} className="block h-auto w-full" />
          </div>

          {symbols.map(({ char, className }) => (
            <span
              key={char}
              aria-hidden="true"
              className={cn(
                "absolute grid size-12 place-items-center rounded-2xl text-2xl font-black text-primary shadow-clay",
                className,
              )}
            >
              {char}
            </span>
          ))}

          {hero.chips.map((chip, i) => (
            <Reveal
              key={chip.word}
              delay={0.45 + i * 0.12}
              y={12}
              scale={0.92}
              className={cn("absolute", chipPositions[i])}
            >
              <div className="flex items-center gap-2.5 rounded-2xl bg-white py-2 pr-2.5 pl-3.5 shadow-clay">
                <p className="leading-tight">
                  <span className="block text-base font-extrabold text-primary">
                    {chip.word}
                  </span>
                  <span className="block text-xs font-semibold text-muted-foreground">
                    {chip.label}
                  </span>
                </p>
                <span
                  aria-hidden="true"
                  className="grid size-6 place-items-center rounded-full bg-primary-500 text-white"
                >
                  <CheckIcon className="size-3.5" strokeWidth={3} />
                </span>
              </div>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
