export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { name: string; short: string }> = {
  en: { name: "English", short: "EN" },
  zh: { name: "简体中文", short: "中文" },
};

/** BCP 47 tags used for `<html lang>`, number formatting and Open Graph. */
export const localeTags: Record<Locale, string> = {
  en: "en-US",
  zh: "zh-CN",
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
