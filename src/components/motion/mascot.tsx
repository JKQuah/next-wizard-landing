import Image from "next/image";

import { Sparkles } from "@/components/ui/sparkles";
import { TypingAnimation } from "@/components/ui/typing-animation";

type MascotProps = {
  src: string;
  /** Text typed into the button; also its accessible name. */
  text: string;
  href: string;
  /** Screen-reader note that the link opens in a new tab. */
  externalNote: string;
};

/**
 * Mascot fixed near the bottom-right corner with a typed call-to-action in a
 * one-line bubble on its left. The mascot is decorative (ignores the pointer, hidden from assistive
 * tech); only the button is interactive. With "reduce motion" on, the text is
 * shown in full instead of being typed.
 */
export function Mascot({ src, text, href, externalNote }: MascotProps) {
  return (
    <div className="pointer-events-none fixed right-3 bottom-3 z-30 flex items-end gap-2 sm:right-14 sm:bottom-5 md:right-20">
      {/* One line, on the mascot's left. It is as wide as the text typed so far,
          so the bubble grows with the typing. */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${text} ${externalNote}`}
        className="pointer-events-auto relative mb-1 rounded-2xl bg-secondary-500 px-3 py-2 text-xs leading-snug font-extrabold whitespace-nowrap text-secondary-foreground shadow-[0_10px_24px_-10px_rgb(246_139_41/0.9),inset_0_-3px_0_rgb(46_36_97/0.12)] transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-secondary-400 focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none active:scale-[0.97] sm:mb-2 sm:px-4 sm:py-2.5 sm:text-base md:mb-4"
      >
        <span aria-hidden="true" className="relative z-10 block">
          {/* Typed copy; with "reduce motion" it is swapped for the full text in
              CSS, so the server and the client render the same markup. */}
          <TypingAnimation
            key={text}
            as="span"
            className="leading-snug tracking-normal motion-reduce:hidden"
            duration={55}
            delay={900}
            startOnView={false}
            cursorStyle="line"
          >
            {text}
          </TypingAnimation>
          <span className="hidden motion-reduce:inline">{text}</span>
        </span>
        {/* tail pointing at the mascot */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 -right-1 size-3 -translate-y-1/2 rotate-45 rounded-[2px] bg-secondary-500"
        />
      </a>

      <div aria-hidden="true" className="w-16 shrink-0 select-none sm:w-28 md:w-36">
        {/* gentle hover-in-place, with stars twinkling around it */}
        <Sparkles className="mascot-bob">
          <Image
            src={src}
            alt=""
            width={530}
            height={560}
            sizes="(min-width: 768px) 144px, (min-width: 640px) 112px, 64px"
            draggable={false}
            className="h-auto w-full drop-shadow-[0_10px_14px_rgba(46,36,97,0.28)]"
          />
        </Sparkles>
      </div>
    </div>
  );
}
