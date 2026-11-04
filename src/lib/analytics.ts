/**
 * Google marketing tags, configured through environment variables so that no
 * account ID is hard-coded and every environment decides for itself.
 *
 *   NEXT_PUBLIC_GTM_ID                    Tag Manager container, e.g. GTM-ABC123
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID         Analytics 4 stream, e.g. G-ABC123DEF4
 *   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION  Search Console "HTML tag" token
 *
 * NEXT_PUBLIC_* values are inlined when the site is built, so set them in the
 * hosting provider's build environment (see .env.example). A value that does
 * not look right is ignored rather than written into the page.
 */

const pick = (value: string | undefined, pattern: RegExp) => {
  const trimmed = value?.trim();
  return trimmed && pattern.test(trimmed) ? trimmed : undefined;
};

export const GTM_ID = pick(process.env.NEXT_PUBLIC_GTM_ID, /^GTM-[A-Z0-9]{4,}$/);

export const GA_MEASUREMENT_ID = pick(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  /^G-[A-Z0-9]{6,}$/,
);

export const GOOGLE_SITE_VERIFICATION = pick(
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  /^[A-Za-z0-9_-]{20,}$/,
);

/**
 * Tags only run in production builds, so local development and test runs never
 * add traffic to the live reports.
 */
export const analyticsEnabled = process.env.NODE_ENV === "production";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Records a marketing event. With Tag Manager it is pushed to the data layer
 * (create a Custom Event trigger named after the event); with GA4 alone it is
 * sent through gtag. The visitor's language is added to every event.
 *
 * Never put personal details in `params`: names, emails, phone numbers,
 * message text, or any URL that carries them.
 */
export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined" || !analyticsEnabled) return;
  const data = { language: document.documentElement.lang, ...params };

  if (GA_MEASUREMENT_ID) window.gtag?.("event", name, data);
  if (GTM_ID) (window.dataLayer ??= []).push({ event: name, ...data });
}
