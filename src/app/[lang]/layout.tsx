import type { Metadata, Viewport } from "next";
import { Nunito, Noto_Sans_SC } from "next/font/google";

import { MotionProvider } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE_NAME, siteOrigin } from "@/lib/site";

import "../globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

/* Nunito has no CJK glyphs; Noto Sans SC is served in unicode-range slices,
 * so English pages never download it. */
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2e2461",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(siteOrigin),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: siteOrigin }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "education",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...pageMetadata({
      locale,
      path: "",
      title: dict.meta.title,
      description: dict.meta.description,
    }),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const value = await getLocale();
  const dict = await getDictionary(value);

  return (
    // data-scroll-behavior: globals.css enables smooth scrolling for in-page
    // anchors; this tells Next to scroll instantly (to the top) on route changes.
    <html
      lang={value}
      data-scroll-behavior="smooth"
      className={`${nunito.variable} ${notoSansSC.variable} h-full`}
    >
      <head>
        {/* Without JS the scroll-reveal never fires, so show everything. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <JsonLd data={organizationJsonLd(value, dict)} />
        <JsonLd data={websiteJsonLd(value)} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:font-bold focus:text-primary-foreground"
        >
          {dict.a11y.skipToContent}
        </a>
        <MotionProvider>
          <SiteHeader locale={value} dict={dict} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter locale={value} dict={dict} />
        </MotionProvider>
      </body>
    </html>
  );
}
