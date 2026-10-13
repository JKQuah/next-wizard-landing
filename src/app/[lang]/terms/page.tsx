import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { LegalDocument } from "@/components/sections/legal/legal-document";
import { terms } from "@/content/legal";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return pageMetadata({
    locale,
    path: "/terms",
    title: `${terms.title} — ${SITE_NAME}`,
    description: terms.description,
  });
}

export default async function TermsPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const breadcrumb = breadcrumbJsonLd(locale, dict, [
    { name: terms.title, path: "/terms" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <LegalDocument locale={locale} content={terms} />
    </>
  );
}
