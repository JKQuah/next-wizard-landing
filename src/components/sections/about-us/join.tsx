import { JoinTeam } from "@/components/illustrations/join-team";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/get-dictionary";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export function AboutJoin({ dict }: { dict: Dictionary }) {
  const { join } = dict.aboutPage;

  return (
    <section id="join" className="bg-white px-4 py-16 sm:px-6 md:py-24">
      <Reveal
        y={32}
        className="relative mx-auto grid max-w-6xl items-center gap-8 overflow-hidden rounded-[2.5rem] bg-primary-500 px-6 py-12 text-white sm:px-12 md:grid-cols-[1.2fr_1fr] md:py-14"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -left-16 size-56 rounded-full bg-primary-300/25"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -bottom-24 hidden size-72 rounded-full bg-primary-300/20 md:block"
        />

        <div className="relative space-y-4">
          <h2 className="text-3xl leading-tight font-black md:text-4xl">
            {join.title}
          </h2>
          <p className="text-xl font-extrabold text-secondary-400">
            {join.lead}
          </p>
          <p className="max-w-md text-lg leading-relaxed text-white/85">
            {join.text}
          </p>
          <div className="pt-3">
            <a
              href={whatsappUrl(join.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "cta", size: "lg" }),
                "w-full sm:w-auto",
              )}
            >
              {join.cta}
            </a>
          </div>
        </div>

        {/* Desktop and tablet only; the card stays text-first on phones. */}
        {/* No backdrop: the figure stands on the card's bottom edge. */}
        <div className="relative mx-auto hidden w-72 self-end md:-mb-14 md:block lg:w-80">
          <JoinTeam alt={join.imageAlt} className="block h-auto w-full" />
        </div>
      </Reveal>
    </section>
  );
}
