import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type LogoAsset = { src: string; width: number; height: number; alt: string };

/** Chinese gets the bilingual mark; every other locale uses the English one. */
const logos: Record<Locale, LogoAsset> = {
  en: {
    src: "/brand/logo-en.png",
    width: 1200,
    height: 368,
    alt: "Singapore Math Wizard",
  },
  zh: {
    src: "/brand/logo-zh.png",
    width: 887,
    height: 311,
    alt: "Singapore Math Wizard 新加坡数学",
  },
};

type LogoProps = {
  locale: Locale;
  /** Height utilities for the image; the width follows the aspect ratio. */
  className?: string;
  priority?: boolean;
};

export function Logo({ locale, className, priority }: LogoProps) {
  const logo = logos[locale] ?? logos.en;

  return (
    <Link
      href={`/${locale}`}
      className="inline-flex shrink-0 items-center rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority={priority}
        sizes="(min-width: 1024px) 210px, (min-width: 640px) 184px, 160px"
        className={cn("h-12 w-auto sm:h-14 lg:h-16", className)}
      />
    </Link>
  );
}
