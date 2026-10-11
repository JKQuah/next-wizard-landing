import { Doodle } from "@/components/illustrations/doodle";
import { Reveal } from "@/components/motion/reveal";
import { PricingPlans } from "@/components/sections/packages/pricing-plans";
import type { Dictionary } from "@/i18n/get-dictionary";
import { whatsappUrl } from "@/lib/site";

export function PricingSection({ dict }: { dict: Dictionary }) {
  const { pricing } = dict.pricingMediaPage;

  return (
    <section id="pricing" className="relative isolate overflow-hidden bg-aurora py-16 md:py-24">
      <Doodle variant="loop" className="top-4 -left-24 -z-10 w-[32rem] max-w-none" />
      <Doodle variant="arc" className="right-[-6rem] bottom-0 -z-10 hidden w-[28rem] max-w-none md:block" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal
            eager
            as="h1"
            className="text-4xl leading-tight font-black tracking-tight text-primary sm:text-5xl"
          >
            {pricing.title}
          </Reveal>
          <Reveal eager as="p" delay={0.05} className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {pricing.subtitle}
          </Reveal>
        </div>

        <PricingPlans
          pricing={pricing}
          signUpHref={whatsappUrl(dict.cta.whatsappMessage)}
          externalNote={dict.a11y.external}
        />
      </div>
    </section>
  );
}
