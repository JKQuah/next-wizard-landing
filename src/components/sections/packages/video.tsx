import { Reveal } from "@/components/motion/reveal";
import { RichText } from "@/components/rich-text";
import type { Dictionary } from "@/i18n/get-dictionary";

const FACEBOOK_VIDEO =
  "https://www.facebook.com/plugins/video.php?" +
  new URLSearchParams({
    href: "https://www.facebook.com/SGMATHWIZARD/videos/820679499491679/",
    show_text: "false",
    width: "560",
    t: "0",
  }).toString();

export function VideoSection({ dict }: { dict: Dictionary }) {
  const { video } = dict.pricingMediaPage;

  return (
    <section id="video" className="bg-aurora py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <Reveal y={32} className="overflow-hidden rounded-3xl border-4 border-primary-500 bg-white shadow-clay">
          <div className="aspect-video w-full">
            <iframe
              src={FACEBOOK_VIDEO}
              title={video.iframeTitle}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              className="size-full border-0"
            />
          </div>
        </Reveal>

        <div className="space-y-5">
          <Reveal as="h2" className="text-3xl leading-tight font-extrabold text-primary md:text-4xl">
            {video.title}
            <span className="mt-1 block text-xl font-bold text-primary/80 md:text-2xl">{video.subtitle}</span>
          </Reveal>
          {video.paragraphs.map((text, i) => (
            <Reveal key={text} as="p" delay={0.06 * (i + 1)} className="text-lg leading-relaxed text-muted-foreground">
              <RichText text={text} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
