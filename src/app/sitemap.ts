import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { siteOrigin } from "@/lib/site";

/** Path after the locale segment, with how much each page changes. */
const pages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/curriculum", changeFrequency: "monthly", priority: 0.8 },
  { path: "/packages", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
] as const;

const hreflang = { en: "en", zh: "zh-Hans" } as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pages.map(({ path, changeFrequency, priority }) => ({
      url: `${siteOrigin}/${locale}${path}`,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [hreflang[l], `${siteOrigin}/${l}${path}`]),
          ),
          "x-default": `${siteOrigin}/en${path}`,
        },
      },
    })),
  );
}
