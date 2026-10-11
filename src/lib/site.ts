/** Public site and contact endpoints, taken from sgmathwizard.com. */
export const SITE_URL = "https://www.sgmathwizard.com";
export const SITE_NAME = "Singapore Math Wizard";

/**
 * Origin used for canonical URLs, sitemap entries and social images. Set
 * NEXT_PUBLIC_SITE_URL on staging so previews never claim the live domain.
 */
export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL).replace(/\/$/, "");

export const contact = {
  whatsappNumber: "60125957435",
  email: "support@sgmathwizard.com",
  facebook: "https://www.facebook.com/SGMATHWIZARD/",
  phone: "012-595 7435",
  address: "1, Jalan Kaki Bukit, 11700 Gelugor, Penang, Malaysia",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

/** Google Maps embed for the office, as used on the main site's contact page. */
export const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.2630405512214!2d100.3037258!3d5.376805399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac19d9d53ec4f%3A0x4afa29ee25a103a8!2sJalan%20Kaki%20Bukit%2C%2011700%20Gelugor%2C%20Pulau%20Pinang!5e0!3m2!1sen!2smy!4v1686130331480!5m2!1sen!2smy";

/** Where the contact form posts. The main site has no handler there yet (405). */
export const contactFormAction = `${SITE_URL}/contact`;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

/** Pages that still live on other sites. */
export const sitePages = {
  practicle: "https://practicle.sg",
} as const;

/** Pricing and media share one page; anchors jump to either half. */
export const packagesPath = (locale: string) => `/${locale}/packages`;
