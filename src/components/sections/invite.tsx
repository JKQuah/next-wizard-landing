import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/get-dictionary";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export function InviteSection({ dict }: { dict: Dictionary }) {
  const { invite, cta } = dict;

  return (
    <section className="bg-white px-4 pb-16 sm:px-6 md:pb-24">
      <Reveal
        y={32}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-primary-500 px-6 py-12 text-center text-white sm:px-12 md:py-16"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -left-16 size-56 rounded-full bg-primary-300/25"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -bottom-20 size-64 rounded-full bg-secondary-500"
        />

        <div className="relative mx-auto max-w-2xl space-y-4">
          <h2 className="text-3xl leading-tight font-black md:text-4xl">{invite.title}</h2>
          <p className="text-lg leading-relaxed text-white/85">{invite.text}</p>
          <div className="pt-4">
            <a
              href={whatsappUrl(cta.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "cta", size: "lg" }), "w-full sm:w-auto")}
            >
              {cta.signUp}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
