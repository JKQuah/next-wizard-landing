import {
  ArrowUpRightIcon,
  BookCheckIcon,
  GiftIcon,
  LightbulbIcon,
  SparklesIcon,
  StarIcon,
} from "lucide-react";

import { CheeringKid } from "@/components/illustrations/cheering-kid";
import { Doodle } from "@/components/illustrations/doodle";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/get-dictionary";
import { sitePages } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Icon + desktop position for each badge, in dictionary order. */
const badges = [
  { Icon: SparklesIcon, position: "md:top-[2%] md:left-0" },
  { Icon: BookCheckIcon, position: "md:top-[20%] md:right-0" },
  { Icon: StarIcon, position: "md:top-[46%] md:left-[-2%]" },
  { Icon: LightbulbIcon, position: "md:top-[66%] md:right-[2%]" },
  { Icon: GiftIcon, position: "md:bottom-[2%] md:left-[2%]" },
];

export function PracticleSection({ dict }: { dict: Dictionary }) {
  const { practicle, a11y } = dict;

  return (
    <section id="practicle" className="relative isolate overflow-hidden bg-aurora py-16 md:py-24">
      <Doodle variant="loop" className="top-6 -right-24 -z-10 w-[34rem] max-w-none" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <div className="space-y-5">
          <Reveal as="h2" className="text-3xl leading-tight font-extrabold text-primary md:text-4xl">
            {practicle.title}
          </Reveal>
          {practicle.paragraphs.map((text, i) => (
            <Reveal
              as="p"
              key={i}
              delay={0.06 * (i + 1)}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              {text}
            </Reveal>
          ))}
          <Reveal delay={0.25} className="pt-2">
            <a
              href={sitePages.practicle}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full sm:w-auto")}
            >
              {practicle.visit}
              <ArrowUpRightIcon aria-hidden="true" />
              <span className="sr-only">{a11y.external}</span>
            </a>
          </Reveal>
        </div>

        <div className="relative mx-auto flex w-full max-w-lg flex-col items-center md:block md:h-[27rem]">
          <Reveal
            delay={0.1}
            y={36}
            className="md:absolute md:inset-x-0 md:bottom-0 md:flex md:justify-center"
          >
            <CheeringKid alt={practicle.imageAlt} className="mx-auto block h-72 w-auto md:h-[24rem]" />
          </Reveal>

          <ul className="mt-6 flex flex-wrap justify-center gap-2.5 md:mt-0 md:contents">
            {practicle.badges.map((label, i) => {
              const { Icon, position } = badges[i];
              return (
                <Reveal
                  as="li"
                  key={label}
                  delay={0.2 + i * 0.08}
                  scale={0.9}
                  className={cn("md:absolute", position)}
                >
                  <span className="flex items-center gap-2 rounded-2xl bg-white py-2 pr-4 pl-2.5 text-sm font-extrabold text-primary shadow-clay">
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-xl bg-secondary-300/60"
                    >
                      <Icon className="size-4.5" />
                    </span>
                    {label}
                  </span>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
