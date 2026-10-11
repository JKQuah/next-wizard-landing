import {
  CircleIcon,
  DivideIcon,
  MinusIcon,
  PlusIcon,
  SquareIcon,
  TriangleIcon,
} from "lucide-react";

import { Teacher } from "@/components/illustrations/teacher";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/i18n/get-dictionary";

/** The same math symbols the original site uses as bullets. */
const symbols = [
  PlusIcon,
  TriangleIcon,
  SquareIcon,
  DivideIcon,
  MinusIcon,
  CircleIcon,
];

export function TeachersSection({ dict }: { dict: Dictionary }) {
  const { teachers } = dict;

  return (
    <section id="teachers" className="bg-muted py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal
          as="h2"
          className="text-3xl leading-tight font-extrabold text-primary md:text-4xl"
        >
          {teachers.title}
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[20rem_1fr] lg:gap-14">
          <Reveal y={32} className="mx-auto w-64 sm:w-72 lg:w-full">
            <div className="overflow-hidden rounded-t-[999px] rounded-b-4xl bg-secondary-400 pt-10 shadow-clay">
              <Teacher
                alt={teachers.imageAlt}
                className="block h-auto w-full"
              />
            </div>
          </Reveal>

          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {teachers.items.map((item, i) => {
              const Icon = symbols[i];
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={i * 0.07}
                  className="flex gap-4"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-clay pb-1"
                  >
                    <Icon className="size-5" strokeWidth={2.5} />
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-lg leading-snug font-extrabold text-primary">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
