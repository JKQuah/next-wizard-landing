import { BrainIcon, LayersIcon, PuzzleIcon, RulerIcon } from "lucide-react";

import { BarModel } from "@/components/illustrations/bar-model";
import { Doodle } from "@/components/illustrations/doodle";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

const icons = [
  { Icon: LayersIcon, tone: "bg-secondary-300/45" },
  { Icon: RulerIcon, tone: "bg-primary-300/45" },
  { Icon: BrainIcon, tone: "bg-primary-300/45" },
  { Icon: PuzzleIcon, tone: "bg-secondary-300/45" },
];

export function MethodsSection({ dict }: { dict: Dictionary }) {
  const { methods } = dict;

  return (
    <section
      id="methods"
      className="relative isolate overflow-hidden bg-white py-16 md:py-24"
    >
      <Doodle
        variant="wave"
        className="top-2 -right-24 -z-10 w-[40rem] max-w-none"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal
          as="h2"
          className="text-3xl leading-tight font-extrabold text-primary md:text-4xl"
        >
          {methods.title}
        </Reveal>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.25fr_1fr]">
          <ul className="grid gap-5 sm:grid-cols-2">
            {methods.items.map((item, i) => {
              const { Icon, tone } = icons[i];
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={i * 0.08}
                  className="flex"
                >
                  <Card className="clay-card w-full gap-4 rounded-3xl ring-0 [--card-spacing:--spacing(6)]">
                    <CardHeader>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-14 place-items-center rounded-2xl text-primary",
                          tone,
                        )}
                      >
                        <Icon className="size-7" />
                      </span>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <CardTitle className="text-lg leading-snug font-extrabold text-primary">
                        {item.title}
                      </CardTitle>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </ul>

          <div className="space-y-6 lg:sticky lg:top-28 bg-accent/50 p-6 rounded-3xl h-full">
            <Reveal y={32} delay={0.1}>
              <div className="rounded-3xl bg-white p-6">
                <BarModel
                  alt={methods.diagramAlt}
                  className="block h-auto w-full"
                />
              </div>
            </Reveal>
            <Reveal
              as="p"
              className="text-lg leading-relaxed text-muted-foreground"
            >
              {methods.intro}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
