import { RocketIcon, TelescopeIcon } from "lucide-react";

import { Doodle } from "@/components/illustrations/doodle";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

export function AboutIntro({ dict }: { dict: Dictionary }) {
  const { background, vision, mission } = dict.aboutPage;

  const pillars = [
    { ...vision, Icon: TelescopeIcon, tone: "bg-primary-300/45" },
    { ...mission, Icon: RocketIcon, tone: "bg-secondary-300/45" },
  ];

  return (
    <section id="background" className="relative isolate overflow-hidden bg-aurora py-16 md:py-24">
      <Doodle variant="loop" className="top-4 -left-24 -z-10 w-[32rem] max-w-none" />
      <Doodle variant="arc" className="right-[-6rem] bottom-0 -z-10 hidden w-[28rem] max-w-none md:block" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div>
          <Reveal eager
            as="h1"
            className="text-4xl leading-tight font-black tracking-tight text-primary sm:text-5xl"
          >
            {background.title}
          </Reveal>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {background.paragraphs.map((text, i) => (
              <Reveal eager as="p" key={i} delay={0.08 * (i + 1)}>
                {text}
              </Reveal>
            ))}
          </div>
        </div>

        <ul className="grid content-start gap-5">
          {pillars.map(({ title, text, Icon, tone }, i) => (
            <Reveal as="li" key={title} delay={0.1 + i * 0.1} className="flex">
              <Card className="clay-card w-full gap-4 rounded-3xl ring-0 [--card-spacing:--spacing(6)]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={cn("grid size-14 shrink-0 place-items-center rounded-2xl text-primary", tone)}
                    >
                      <Icon className="size-7" />
                    </span>
                    <h2 className="text-2xl font-black text-primary">{title}</h2>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
