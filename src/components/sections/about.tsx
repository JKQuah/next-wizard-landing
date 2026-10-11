import { CalendarClockIcon, Gamepad2Icon, TrophyIcon, UsersIcon } from "lucide-react";

import { Doodle } from "@/components/illustrations/doodle";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

const icons = [
  { Icon: CalendarClockIcon, tone: "bg-primary-300/45" },
  { Icon: Gamepad2Icon, tone: "bg-secondary-300/45" },
  { Icon: UsersIcon, tone: "bg-secondary-400/45" },
  { Icon: TrophyIcon, tone: "bg-primary-300/45" },
];

export function AboutSection({ dict }: { dict: Dictionary }) {
  const { about } = dict;

  return (
    <section id="about" className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Doodle variant="wave" className="bottom-4 -left-16 -z-10 w-[40rem] max-w-none" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal
          as="h2"
          className="max-w-2xl text-3xl leading-tight font-extrabold text-primary md:text-4xl"
        >
          {about.title}
        </Reveal>

        <ul id="benefits" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.items.map((item, i) => {
            const { Icon, tone } = icons[i];
            return (
              <Reveal as="li" key={item.title} delay={i * 0.08} className="flex">
                <Card className="clay-card w-full gap-4 rounded-3xl ring-0 [--card-spacing:--spacing(6)]">
                  <CardHeader>
                    <span
                      aria-hidden="true"
                      className={cn("grid size-14 place-items-center rounded-2xl text-primary", tone)}
                    >
                      <Icon className="size-7" />
                    </span>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <CardTitle className="text-lg leading-snug font-extrabold text-primary">
                      {item.title}
                    </CardTitle>
                    <p className="text-base leading-relaxed text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
