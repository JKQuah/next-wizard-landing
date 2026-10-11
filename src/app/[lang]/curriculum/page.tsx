import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { CurriculumFeatures } from "@/components/sections/curriculum/features";
import { CurriculumHero } from "@/components/sections/curriculum/hero";
import { CurriculumJoin } from "@/components/sections/curriculum/join";
import { CurriculumOverview } from "@/components/sections/curriculum/overview";
import { CurriculumSyllabus } from "@/components/sections/curriculum/syllabus";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { curriculumPage } = await getDictionary(locale);

  return pageMetadata({
    locale,
    path: "/curriculum",
    title: curriculumPage.meta.title,
    description: curriculumPage.meta.description,
  });
}

export default async function CurriculumPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const breadcrumb = breadcrumbJsonLd(locale, dict, [
    { name: dict.nav.curriculum, path: "/curriculum" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <CurriculumHero dict={dict} />
      <CurriculumOverview dict={dict} />
      <CurriculumFeatures dict={dict} />
      <CurriculumSyllabus dict={dict} />
      <CurriculumJoin dict={dict} />
    </>
  );
}
