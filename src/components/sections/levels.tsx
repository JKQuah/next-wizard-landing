import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/i18n/get-dictionary";

export function LevelsSection({ dict }: { dict: Dictionary }) {
  const { levels } = dict;

  return (
    <section aria-labelledby="levels-heading" className="bg-white pb-16 md:pb-24">
      <h2 id="levels-heading" className="sr-only">
        {levels.heading}
      </h2>

      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <ul className="grid grid-cols-2 gap-3 rounded-[2rem] bg-secondary-400/25 p-4 sm:grid-cols-3 lg:grid-cols-6 lg:rounded-full lg:p-3">
          {levels.items.map((label, i) => (
            <Reveal
              as="li"
              key={label}
              delay={0.06 * i}
              scale={0.92}
              className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 text-base font-extrabold text-primary shadow-clay"
            >
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary-500 text-lg font-black text-primary"
              >
                {i + 1}
              </span>
              {label}
            </Reveal>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
