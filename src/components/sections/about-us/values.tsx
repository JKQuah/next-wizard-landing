import {
  AwardIcon,
  FlameIcon,
  HandshakeIcon,
  LightbulbIcon,
  PartyPopperIcon,
  SlidersHorizontalIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

const icons = [
  { Icon: AwardIcon, tone: "bg-secondary-300/45" },
  { Icon: LightbulbIcon, tone: "bg-primary-300/45" },
  { Icon: SlidersHorizontalIcon, tone: "bg-secondary-400/45" },
  { Icon: FlameIcon, tone: "bg-primary-300/45" },
  { Icon: TrendingUpIcon, tone: "bg-secondary-300/45" },
  { Icon: HandshakeIcon, tone: "bg-primary-300/45" },
  { Icon: ZapIcon, tone: "bg-secondary-400/45" },
  { Icon: PartyPopperIcon, tone: "bg-primary-300/45" },
];

export function AboutValues({ dict }: { dict: Dictionary }) {
  const { values } = dict.aboutPage;

  return (
    <section id="values" className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal as="h2" className="text-3xl leading-tight font-extrabold text-primary md:text-4xl">
          {values.title}
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.items.map((item, i) => {
            const { Icon, tone } = icons[i];
            return (
              <Reveal as="li" key={item.title} delay={(i % 4) * 0.08} className="flex">
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
                    <h3 className="text-lg leading-snug font-extrabold text-primary">
                      {item.title}
                    </h3>
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
