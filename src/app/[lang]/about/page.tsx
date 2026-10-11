import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { AboutIntro } from "@/components/sections/about-us/intro";
import { AboutJoin } from "@/components/sections/about-us/join";
import { AboutTeam } from "@/components/sections/about-us/team";
import { AboutValues } from "@/components/sections/about-us/values";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { aboutPage } = await getDictionary(locale);

  return pageMetadata({
    locale,
    path: "/about",
    title: aboutPage.meta.title,
    description: aboutPage.meta.description,
  });
}

export default async function AboutPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const breadcrumb = breadcrumbJsonLd(locale, dict, [
    { name: dict.nav.about, path: "/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <AboutIntro dict={dict} />
      <AboutValues dict={dict} />
      <AboutTeam dict={dict} />
      <AboutJoin dict={dict} />
    </>
  );
}
