import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { LegalDocument } from "@/components/sections/legal/legal-document";
import { privacy } from "@/content/legal";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return pageMetadata({
    locale,
    path: "/privacy",
    title: `${privacy.title} — ${SITE_NAME}`,
    description: privacy.description,
  });
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const breadcrumb = breadcrumbJsonLd(locale, dict, [
    { name: privacy.title, path: "/privacy" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <LegalDocument locale={locale} content={privacy} />
    </>
  );
}
