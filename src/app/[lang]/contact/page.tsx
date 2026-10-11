import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { ContactSection } from "@/components/sections/contact/contact";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { contactPage } = await getDictionary(locale);

  return pageMetadata({
    locale,
    path: "/contact",
    title: contactPage.meta.title,
    description: contactPage.meta.description,
  });
}

export default async function ContactPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const breadcrumb = breadcrumbJsonLd(locale, dict, [
    { name: dict.nav.contact, path: "/contact" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <ContactSection dict={dict} />
    </>
  );
}
