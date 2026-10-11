import { DesktopNav } from "@/components/layout/desktop-nav";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { packagesPath, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const links = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/curriculum`, label: dict.nav.curriculum },
    { href: packagesPath(locale), label: dict.nav.pricingMedia },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];
  const signUpHref = whatsappUrl(dict.cta.whatsappMessage);

  return (
    <Reveal
      eager
      as="header"
      y={-16}
      className="sticky top-0 z-40 border-b border-primary-300/30 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/70"
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl lg:h-20 items-center gap-3 px-4 sm:px-6">
        <Logo locale={locale} priority />

        <DesktopNav links={links} label={dict.a11y.mainNavigation} />

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <a
            href={signUpHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "cta", size: "default" }),
              "hidden md:inline-flex",
            )}
          >
            {dict.cta.signUp}
          </a>
          <LanguageSwitcher locale={locale} label={dict.a11y.changeLanguage} />
          <MobileNav
            links={links}
            signUp={{ href: signUpHref, label: dict.cta.signUp }}
            labels={{
              open: dict.a11y.openMenu,
              close: dict.a11y.closeMenu,
              navigation: dict.a11y.mainNavigation,
            }}
          />
        </div>
      </div>
    </Reveal>
  );
}
