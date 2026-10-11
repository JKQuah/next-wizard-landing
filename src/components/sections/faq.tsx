import {
  CalendarCheckIcon,
  ChevronDownIcon,
  ClipboardListIcon,
  CreditCardIcon,
  Gamepad2Icon,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { RichText, type RichTextLink } from "@/components/rich-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Locale } from "@/i18n/config";
import { interpolate } from "@/i18n/format";
import type { Dictionary } from "@/i18n/get-dictionary";
import { contact, packagesPath, whatsappUrl } from "@/lib/site";

const groupIcons: Record<string, LucideIcon> = {
  pre: ClipboardListIcon,
  post: CalendarCheckIcon,
  practicle: Gamepad2Icon,
  payment: CreditCardIcon,
};

export function FaqSection({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { faq, cta } = dict;

  const links: Record<string, RichTextLink> = {
    email: { href: `mailto:${contact.email}`, label: faq.links.email },
    call: { href: whatsappUrl(cta.whatsappMessage), label: faq.links.call },
    pricing: {
      href: `${packagesPath(locale)}#pricing`,
      label: faq.links.pricing,
    },
    trial: { href: whatsappUrl(cta.whatsappMessage), label: faq.links.trial },
  };

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <Reveal
          as="h2"
          className="text-center text-3xl leading-tight font-extrabold text-primary md:text-4xl"
        >
          {faq.title}
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <Tabs defaultValue={faq.groups[0].id} className="gap-7">
            <TabsList className="group-data-horizontal/tabs:h-auto grid h-auto w-full grid-cols-2 items-stretch gap-3 rounded-none bg-transparent p-0 md:grid-cols-4 md:gap-4">
              {faq.groups.map((group) => {
                const Icon = groupIcons[group.id] ?? ClipboardListIcon;
                return (
                  <TabsTrigger
                    key={group.id}
                    value={group.id}
                    className={[
                      // layout
                      "group/tab relative h-full min-h-32 cursor-pointer flex-col items-start justify-start gap-3 rounded-3xl border-2 p-4 text-left whitespace-normal",
                      // resting
                      "border-primary-300/60 bg-white text-primary shadow-clay",
                      // hover: lift, tint, stronger border
                      "transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out hover:-translate-y-1 hover:border-primary-500/50 hover:bg-accent hover:text-primary hover:shadow-clay-hover",
                      // press
                      "active:translate-y-0 active:scale-[0.98]",
                      // selected
                      "data-active:border-primary-500 data-active:bg-primary-500 data-active:text-white group-data-[variant=default]/tabs-list:data-active:shadow-clay-hover data-active:hover:bg-primary-500 data-active:hover:text-white",
                      // keyboard focus
                      "focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:ring-offset-2",
                      "after:hidden",
                    ].join(" ")}
                  >
                    <span className="flex w-full items-start justify-between gap-2">
                      <span
                        aria-hidden="true"
                        className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-300/45 text-primary transition-[transform,background-color] duration-200 group-hover/tab:scale-110 group-hover/tab:-rotate-6 group-data-active/tab:bg-secondary-500"
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="rounded-full bg-primary-300/40 px-2.5 py-1 text-xs leading-none font-extrabold whitespace-nowrap text-primary transition-colors group-data-active/tab:bg-white/15 group-data-active/tab:text-white">
                        {interpolate(faq.questionCount, {
                          count: group.items.length,
                        })}
                      </span>
                    </span>
                    <span className="space-y-0.5">
                      <span className="block text-base leading-snug font-extrabold">
                        {group.title}
                      </span>
                      <span className="block text-xs leading-snug font-semibold opacity-80">
                        {group.description}
                      </span>
                    </span>

                    {/* pointer toward the panel below the selected tab */}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[0.6rem] left-1/2 hidden size-4 -translate-x-1/2 rotate-45 rounded-[4px] bg-primary-500 opacity-0 transition-opacity duration-200 group-data-active/tab:opacity-100 md:block"
                    />
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {faq.groups.map((group) => (
              <TabsContent
                key={group.id}
                value={group.id}
                className="outline-none"
              >
                <Accordion className="animate-in gap-2 fade-in-0 slide-in-from-bottom-2 rounded-[2rem] bg-white p-3 shadow-clay ring-1 ring-primary-300/50 duration-300 sm:p-4">
                  {group.items.map((item, index) => (
                    <AccordionItem
                      key={item.q}
                      value={item.q}
                      className="rounded-2xl border-b-0 transition-colors duration-200 not-last:border-b-0 hover:bg-accent/60 data-open:bg-accent"
                    >
                      <AccordionTrigger
                        showIcon={false}
                        className="cursor-pointer items-center gap-3 rounded-2xl border-0 px-3 py-3.5 text-left text-base leading-snug font-extrabold text-primary hover:no-underline focus-visible:ring-4 focus-visible:ring-ring/40 sm:gap-4 sm:px-4"
                      >
                        <span
                          aria-hidden="true"
                          className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-300/40 text-sm font-extrabold text-primary tabular-nums transition-colors duration-200 group-aria-expanded/accordion-trigger:bg-secondary-500"
                        >
                          {index + 1}
                        </span>
                        <span className="flex-1">{item.q}</span>
                        <span
                          aria-hidden="true"
                          className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-primary shadow-sm transition-[transform,background-color,color] duration-200 group-hover/accordion-trigger:bg-primary-500 group-hover/accordion-trigger:text-white group-aria-expanded/accordion-trigger:rotate-180 group-aria-expanded/accordion-trigger:bg-primary-500 group-aria-expanded/accordion-trigger:text-white"
                        >
                          <ChevronDownIcon className="size-5" />
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 px-4 pt-1 pb-5 text-base leading-relaxed text-muted-foreground sm:pl-[4.25rem] sm:pr-6">
                          {item.a.map((paragraph) => (
                            <p key={paragraph}>
                              <RichText text={paragraph} links={links} />
                            </p>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
