import { GaugeIcon, PawPrintIcon, SwordsIcon } from "lucide-react";

import { Doodle } from "@/components/illustrations/doodle";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

const bulletIcons = [
  { Icon: PawPrintIcon, tone: "bg-secondary-300" },
  { Icon: SwordsIcon, tone: "bg-primary-300" },
  { Icon: GaugeIcon, tone: "bg-secondary-400" },
];

export function CurriculumOverview({ dict }: { dict: Dictionary }) {
  const { overview } = dict.curriculumPage;

  return (
    <section
      id="overview"
      className="relative isolate overflow-hidden bg-muted py-16 md:py-24"
    >
      <Doodle
        variant="wave"
        className="top-6 -right-24 -z-10 hidden w-md max-w-none md:block"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal
            as="h2"
            className="text-3xl leading-tight font-extrabold text-primary md:text-4xl"
          >
            {overview.title}
          </Reveal>
          <Reveal
            as="p"
            delay={0.05}
            className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {overview.lead}
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {overview.bullets.map((text, i) => {
            const { Icon, tone } = bulletIcons[i];
            return (
              <Reveal
                as="li"
                key={text}
                delay={0.08 * i}
                className="flex"
              >
                <div className="clay-card flex w-full flex-col gap-6 p-6">
                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-16 place-items-center rounded-2xl text-primary",
                        tone,
                      )}
                    >
                      <Icon className="size-8" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-5xl leading-none font-black text-primary-300/70 tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-lg leading-snug font-extrabold text-primary">
                    {text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
