import { MailIcon } from "lucide-react";
import Link from "next/link";

import { FacebookIcon } from "@/components/icons/facebook";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { Logo } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { contact, packagesPath, whatsappUrl } from "@/lib/site";

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
};

const linkClass =
  "inline-flex min-h-11 items-center gap-2 rounded-lg font-bold text-white/90 underline-offset-4 hover:text-white hover:underline focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none";

const headingClass =
  "mb-2 text-xs! font-extrabold tracking-wider text-secondary-400 uppercase";

const externalProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const { footer, nav } = dict;
  const externalNote = <span className="sr-only">{dict.a11y.external}</span>;

  const pages = [
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/curriculum`, label: nav.curriculum },
    { href: packagesPath(locale), label: nav.pricingMedia },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  return (
    <Reveal as="footer" className="bg-primary-500 text-white">
      <div
        id="contact"
        className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_auto_auto] md:gap-x-20 lg:gap-x-32"
      >
        <div className="max-w-sm space-y-4">
          <Logo locale={locale} className="h-16 sm:h-20 lg:h-20" />
          <p className="text-base leading-relaxed text-white/80">
            {footer.tagline}
          </p>
        </div>

        <nav aria-label={footer.links.title}>
          <h2 className={headingClass}>{footer.links.title}</h2>
          <ul>
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className={linkClass}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>{footer.contact.title}</h2>
          <ul>
            <li>
              <a
                href={contact.facebook}
                {...externalProps}
                className={linkClass}
              >
                <FacebookIcon className="size-5" />
                {footer.contact.facebook}
                {externalNote}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(dict.cta.whatsappMessage)}
                {...externalProps}
                className={linkClass}
              >
                <WhatsAppIcon className="size-5" />
                {footer.contact.whatsapp}
                {externalNote}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={linkClass}>
                <MailIcon aria-hidden="true" className="size-5" />
                {footer.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto w-full max-w-6xl px-4 py-5 text-sm text-white/75 sm:px-6 text-center">
          {footer.copyright}
        </p>
      </div>
    </Reveal>
  );
}
