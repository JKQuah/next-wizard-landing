import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { GallerySection } from "@/components/sections/packages/gallery";
import { PricingSection } from "@/components/sections/packages/pricing";
import { QuoteSection } from "@/components/sections/packages/quote";
import { VideoSection } from "@/components/sections/packages/video";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { pricingMediaPage } = await getDictionary(locale);

  return pageMetadata({
    locale,
    path: "/packages",
    title: pricingMediaPage.meta.title,
    description: pricingMediaPage.meta.description,
  });
}

export default async function PricingMediaPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const breadcrumb = breadcrumbJsonLd(locale, dict, [
    { name: dict.nav.pricingMedia, path: "/packages" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PricingSection dict={dict} />
      <GallerySection content={dict.pricingMediaPage.gallery} />
      <VideoSection dict={dict} />
      <QuoteSection dict={dict} />
    </>
  );
}
