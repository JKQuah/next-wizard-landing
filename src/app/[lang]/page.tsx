import { Mascot } from "@/components/motion/mascot";
import { JsonLd } from "@/components/seo/json-ld";
import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { HeroSection } from "@/components/sections/hero";
import { InviteSection } from "@/components/sections/invite";
import { LevelsSection } from "@/components/sections/levels";
import { MethodsSection } from "@/components/sections/methods";
import { PracticleSection } from "@/components/sections/practicle";
import { ReviewsSection } from "@/components/sections/reviews";
import { StatsSection } from "@/components/sections/stats";
import { TeachersSection } from "@/components/sections/teachers";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { faqJsonLd } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";

export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <>
      <JsonLd data={faqJsonLd(locale, dict)} />
      <HeroSection dict={dict} />
      <Mascot
        src="/brand/mascot.png"
        text={dict.mascot.text}
        href={whatsappUrl(dict.mascot.whatsappMessage)}
        externalNote={dict.a11y.external}
      />
      <AboutSection dict={dict} />
      <PracticleSection dict={dict} />
      <StatsSection dict={dict} />
      <LevelsSection dict={dict} />
      <TeachersSection dict={dict} />
      <MethodsSection dict={dict} />
      <InviteSection dict={dict} />
      <ReviewsSection dict={dict} />
      <FaqSection dict={dict} locale={locale} />
    </>
  );
}
