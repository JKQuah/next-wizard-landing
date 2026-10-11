import type { Metadata } from "next";

import { localeTags, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { contact, packagesPath, SITE_NAME, siteOrigin } from "@/lib/site";

const ogLocale = (locale: Locale) => localeTags[locale].replace("-", "_");

/** hreflang values: Google wants a script/region subtag for Chinese. */
const hreflang: Record<Locale, string> = { en: "en", zh: "zh-Hans" };

type PageMetadataInput = {
  locale: Locale;
  /** Path after the locale segment: "" for home, "/about", "/contact"... */
  path: string;
  title: string;
  description: string;
};

/**
 * Complete metadata for one page. Next replaces `openGraph` and `twitter`
 * wholesale per route, so every page builds the full object here instead of
 * inheriting pieces from the layout.
 */
export function pageMetadata({ locale, path, title, description }: PageMetadataInput): Metadata {
  const image = `/brand/og-${locale}.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [hreflang[l], `/${l}${path}`])),
        "x-default": `/en${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: `/${locale}${path}`,
      title,
      description,
      locale: ogLocale(locale),
      alternateLocale: locales.filter((l) => l !== locale).map(ogLocale),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/* ----------------------------------------------------------------------------
 * Structured data (schema.org JSON-LD)
 * -------------------------------------------------------------------------- */

const abs = (path: string) => `${siteOrigin}${path}`;

/** "+60 12-595 7435" for schema.org, from the local number on the site. */
const internationalPhone = "+60125957435";

export function organizationJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": abs("/#organization"),
    name: SITE_NAME,
    url: abs(`/${locale}`),
    logo: abs("/brand/logo-en.png"),
    image: abs(`/brand/og-${locale}.png`),
    description: dict.meta.description,
    foundingDate: "2020",
    email: contact.email,
    telephone: internationalPhone,
    sameAs: [contact.facebook],
    areaServed: { "@type": "Country", name: "Malaysia" },
    knowsLanguage: ["en", "zh"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "1, Jalan Kaki Bukit",
      addressLocality: "Gelugor",
      addressRegion: "Penang",
      postalCode: "11700",
      addressCountry: "MY",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contact.email,
      telephone: internationalPhone,
      availableLanguage: ["English", "Chinese"],
    },
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    name: SITE_NAME,
    url: abs(`/${locale}`),
    inLanguage: locales.map((l) => hreflang[l]),
    publisher: { "@id": abs("/#organization") },
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(locale: Locale, dict: Dictionary, trail: Crumb[]) {
  const items: Crumb[] = [{ name: dict.nav.home, path: "" }, ...trail];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(`/${locale}${item.path}`),
    })),
  };
}

/** Plain-text version of a dictionary string: resolves {tokens}, drops markup. */
function plain(text: string, locale: Locale, dict: Dictionary) {
  const tokens: Record<string, string> = {
    email: contact.email,
    call: contact.phone,
    pricing: abs(packagesPath(locale)),
    trial: dict.faq.links.trial,
  };

  return text
    .replace(/\{(\w+)\}/g, (match, key: string) => tokens[key] ?? match)
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*/g, "")
    .trim();
}

export function faqJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: hreflang[locale],
    mainEntity: dict.faq.groups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: plain(item.q, locale, dict),
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a.map((part) => plain(part, locale, dict)).join(" "),
        },
      })),
    ),
  };
}
