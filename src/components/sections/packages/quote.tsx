import { QuoteIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/i18n/get-dictionary";

export function QuoteSection({ dict }: { dict: Dictionary }) {
  const { quote } = dict.pricingMediaPage;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
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
        <figure className="relative mx-auto max-w-3xl space-y-6">
          <QuoteIcon aria-hidden="true" className="mx-auto size-10 text-secondary-400" />
          <blockquote className="text-2xl leading-snug font-black text-balance md:text-4xl">
            {quote.text}
          </blockquote>
          <figcaption className="text-lg font-bold text-white/85">— {quote.author}</figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
