import { AwardIcon, ClockIcon, GraduationCapIcon, UsersIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

const icons = [
  { Icon: ClockIcon, tone: "bg-primary-300/45" },
  { Icon: UsersIcon, tone: "bg-secondary-300/45" },
  { Icon: GraduationCapIcon, tone: "bg-secondary-400/45" },
  { Icon: AwardIcon, tone: "bg-primary-300/45" },
];

export function StatsSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-white py-14 md:py-20">
      <ul className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:gap-5">
        {dict.stats.items.map((item, i) => {
          const { Icon, tone } = icons[i];
          return (
            <Reveal as="li" key={item.label} delay={i * 0.08} className="flex">
              <Card className="clay-card w-full items-center gap-3 rounded-3xl text-center ring-0 [--card-spacing:--spacing(6)]">
                <CardContent className="flex flex-col items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn("grid size-16 place-items-center rounded-2xl text-primary", tone)}
                  >
                    <Icon className="size-8" />
                  </span>
                  <p className="text-3xl font-black text-primary tabular-nums sm:text-4xl">
                    {item.value}
                  </p>
                  <p className="text-base font-bold text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
