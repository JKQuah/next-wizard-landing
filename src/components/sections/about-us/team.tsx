import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type Visual = {
  /** Backdrop colour of the box the figure steps out of. */
  tone: string;
  shirt: string;
  photo?: {
    src: string;
    width: number;
    height: number;
    /** Figure height relative to the panel; wider files are scaled down. */
    fit: string;
  };
};

/**
 * Visual config per member, in dictionary order (Admellis, Kym, Nelson).
 * Portraits are the supplied cut-outs in `public/team/`, shown uncropped; a
 * member without a `photo` falls back to an initials placeholder.
 */
const visuals: Visual[] = [
  {
    tone: "bg-primary-300",
    shirt: "text-primary",
    photo: { src: "/team/admellis.avif", width: 1200, height: 1800, fit: "h-[116%]" },
  },
  {
    tone: "bg-secondary-400",
    shirt: "text-primary",
    photo: { src: "/team/kym.png", width: 723, height: 1117, fit: "h-[116%]" },
  },
  {
    tone: "bg-primary-300",
    shirt: "text-primary",
    photo: { src: "/team/nelson.avif", width: 1200, height: 1456, fit: "h-[114%]" },
  },
];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

/** Fallback for a member without a portrait. */
function InitialsPlaceholder({ name, shirt }: { name: string; shirt: string }) {
  return (
    <div aria-hidden="true" className="grid h-full w-full place-items-center">
      <span
        className={cn(
          "grid size-28 place-items-center rounded-full bg-white text-4xl font-black shadow-clay",
          shirt,
        )}
      >
        {initials(name)}
      </span>
    </div>
  );
}

export function AboutTeam({ dict }: { dict: Dictionary }) {
  const { team } = dict.aboutPage;

  return (
    <section id="teams" className="bg-muted py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal as="h2" className="text-3xl leading-tight font-extrabold text-primary md:text-4xl">
          {team.title}
        </Reveal>

        <ul className="mt-10 grid gap-6 md:mt-16 md:grid-cols-3">
          {team.members.map((member, i) => {
            const { tone, shirt, photo } = visuals[i];
            return (
              <Reveal as="li" key={member.name} delay={i * 0.1} className="flex">
                <article
                  className={cn(
                    "clay-card flex w-full flex-col gap-5 p-4 sm:p-5",
                    // The founder card (middle) is raised on desktop.
                    i === 1 && "md:-translate-y-8",
                  )}
                >
                  {/*
                    The box is the coloured panel; the figure is taller than it
                    and bottom-aligned, so the head and shoulders step out of
                    the top. The clip-path trims only the bottom edge to the
                    panel's rounded corners and leaves the top open.
                  */}
                  <div className="relative mt-10 aspect-[4/3]">
                    <div
                      aria-hidden="true"
                      className={cn("absolute inset-0 rounded-2xl", tone)}
                    />
                    {photo ? (
                      <div className="absolute inset-0 [clip-path:inset(-40%_-10%_0_-10%_round_0_0_1rem_1rem)]">
                        <Image
                          src={photo.src}
                          alt={`${member.name}, ${member.role}`}
                          width={photo.width}
                          height={photo.height}
                          sizes="(min-width: 1152px) 360px, (min-width: 768px) 30vw, 90vw"
                          className={cn(
                            "absolute bottom-0 left-1/2 w-auto max-w-none -translate-x-1/2",
                            photo.fit,
                          )}
                        />
                      </div>
                    ) : (
                      <InitialsPlaceholder name={member.name} shirt={shirt} />
                    )}
                  </div>
                  <div className="space-y-2 px-1 pb-2">
                    <div>
                      <h3 className="text-xl font-black text-primary">{member.name}</h3>
                      <p className="text-sm font-extrabold tracking-wide text-secondary-foreground/80 uppercase">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-base leading-relaxed text-muted-foreground">{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
