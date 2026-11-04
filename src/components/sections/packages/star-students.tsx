"use client";

import { StarIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Doodle } from "@/components/illustrations/doodle";
import { Reveal } from "@/components/motion/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIdlePrefetch } from "@/lib/prefetch-images";
import { starStudentImages } from "@/content/gallery";
import type { Dictionary } from "@/i18n/get-dictionary";

import { GalleryLightbox, type LightboxLabels } from "./gallery-lightbox";
import { POSTER_SIZES, PosterStrip } from "./poster-strip";

type StarStudentContent = Dictionary["pricingMediaPage"]["gallery"]["starStudent"];

/**
 * Star student posters by month. Each month is a tab whose posters sit in one
 * row that scrolls sideways (swipe, trackpad, or the arrow buttons).
 */
export function StarStudentSection({
  content,
  lightbox,
}: {
  content: StarStudentContent;
  lightbox: LightboxLabels;
}) {
  // Months are listed newest first, so the latest posters show on arrival.
  const [monthId, setMonthId] = useState(content.months[0].id);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const month = content.months.find((m) => m.id === monthId) ?? content.months[0];

  const items = useMemo(
    () =>
      month.items.map((item) => ({
        ...item,
        image: starStudentImages[month.id][item.id],
      })),
    [month],
  );

  // Warm every month's posters, the visible month first, so switching tabs
  // shows images straight away.
  useIdlePrefetch(
    useMemo(
      () =>
        [month, ...content.months.filter((m) => m.id !== month.id)].flatMap(
          (m) =>
            m.items.map((item) => ({
              image: starStudentImages[m.id][item.id],
              sizes: POSTER_SIZES,
            })),
        ),
      // Only the order matters, and it must not reshuffle on every tab change.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [content.months],
    ),
  );

  return (
    <section
      id="star-students"
      aria-labelledby="star-students-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-primary-500 py-16 text-white md:py-24"
    >
      <Doodle tone="light" variant="loop" className="top-6 -left-24 -z-10 w-[34rem] max-w-none -rotate-3" />
      <Doodle tone="light" variant="wave" className="right-[-7rem] bottom-8 -z-10 w-[36rem] max-w-none rotate-3" />
      <Doodle tone="light" variant="arc" className="top-1/3 right-[10%] -z-10 hidden w-[22rem] max-w-none -scale-x-100 lg:block" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal
            as="div"
            className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-secondary-500 text-primary shadow-[0_8px_20px_-8px_rgb(246_139_41/0.9)]"
          >
            <StarIcon aria-hidden="true" className="size-6 fill-current" />
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="text-3xl leading-tight font-extrabold md:text-4xl"
          >
            <span id="star-students-title">{content.title}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.1}
            className="mt-3 text-lg leading-relaxed text-white/80"
          >
            {content.subtitle}
          </Reveal>
        </div>
      </div>

      {/* Outside the centred container: the poster rows run to the screen edge. */}
      <Tabs
        value={monthId}
        onValueChange={(value) => setMonthId(String(value))}
        className="mt-10 gap-8"
      >
        <div className="mx-auto flex w-full max-w-6xl justify-center px-4 sm:px-6">
          <TabsList
            aria-label={content.tabsLabel}
            className="group-data-horizontal/tabs:h-auto h-auto w-fit max-w-full flex-wrap justify-center gap-2.5 rounded-none bg-transparent p-0"
          >
            {content.months.map((m) => (
              <TabsTrigger
                key={m.id}
                value={m.id}
                className={[
                  "h-auto min-h-11 flex-none cursor-pointer rounded-full border-0 bg-white/10 px-5 text-base font-bold text-white ring-2 ring-white/25",
                  "transition-[background-color,color,box-shadow,transform] duration-200 ease-out hover:bg-white/20 hover:text-white active:scale-[0.97]",
                  "data-active:bg-secondary-500 data-active:text-primary data-active:ring-secondary-500 data-active:hover:bg-secondary-500 data-active:hover:text-primary",
                  "focus-visible:ring-4 focus-visible:ring-secondary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-500 focus-visible:outline-none after:hidden",
                ].join(" ")}
              >
                {m.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {content.months.map((m) => (
          <TabsContent key={m.id} value={m.id} className="outline-none">
            <PosterStrip
              tone="dark"
              items={m.items.map((item) => ({
                ...item,
                image: starStudentImages[m.id][item.id],
              }))}
              label={content.listLabel}
              previous={content.previous}
              next={content.next}
              onOpen={(i) => {
                setIndex(i);
                setOpen(true);
              }}
            />
          </TabsContent>
        ))}
      </Tabs>

      <GalleryLightbox
        open={open}
        onOpenChange={setOpen}
        items={items}
        index={index}
        onIndexChange={setIndex}
        title={`${content.title} · ${month.label}`}
        labels={lightbox}
      />
    </section>
  );
}
