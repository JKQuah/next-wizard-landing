import { MailIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";

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

const focusRing =
  "focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none";

/** Text link: 44px tall for touch; wrap the label in `link-underline` for the hover underline. */
const linkClass = `group inline-flex min-h-11 items-center rounded-lg font-bold text-white/90 transition-colors duration-200 hover:text-white ${focusRing}`;

const headingClass =
  "mb-3 text-xs! font-extrabold tracking-wider text-secondary-400 uppercase";

const DESIGNER = {
  name: "Olzytech Solution",
  display: "www.olzytech.com",
  url: "https://www.olzytech.com",
} as const;

const externalProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

type ContactLink = {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  external: boolean;
};

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const { footer, nav } = dict;
  const externalNote = <span className="sr-only">{dict.a11y.external}</span>;

  const pages = [
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/curriculum`, label: nav.curriculum },
    { href: packagesPath(locale), label: nav.pricingMedia },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  const contactLinks: ContactLink[] = [
    {
      href: contact.facebook,
      label: footer.contact.facebook,
      Icon: FacebookIcon,
      external: true,
    },
    {
      href: whatsappUrl(dict.cta.whatsappMessage),
      label: footer.contact.whatsapp,
      Icon: WhatsAppIcon,
      external: true,
    },
    {
      href: `mailto:${contact.email}`,
      label: footer.contact.email,
      Icon: MailIcon,
      external: false,
    },
  ];

  const legal = [
    { href: `/${locale}/terms`, label: "Terms & Conditions" },
    { href: `/${locale}/privacy`, label: "Privacy Policy" },
  ];

  return (
    <Reveal as="footer" className="bg-primary-500 text-white">
      {/* Brand accent line, the footer's only splash of colour at the top edge. */}
      <div
        aria-hidden="true"
        className="h-1 bg-linear-to-r from-secondary-500 via-primary-300 to-secondary-400"
      />

      {/* Phones: brand on top, then Explore and Contact side by side.
          Tablet and up: the brand takes the free space on the left and the two
          link columns hug the right edge, in line with the legal links below. */}
      <div
        id="contact"
        className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto_auto] md:gap-x-12 md:py-16 lg:gap-x-24"
      >
        <div className="col-span-2 max-w-md space-y-4 md:col-span-1">
          <Logo locale={locale} className="h-16 sm:h-20" />
          <p className="max-w-sm text-base leading-relaxed text-white/80">
            {footer.tagline}
          </p>
        </div>

        <nav aria-label={footer.links.title}>
          <h2 className={headingClass}>{footer.links.title}</h2>
          <ul>
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className={linkClass}>
                  <span className="link-underline">{page.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>{footer.contact.title}</h2>
          <ul>
            {contactLinks.map(({ href, label, Icon, external }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external && externalProps)}
                  className={`group inline-flex min-h-11 items-center gap-3 rounded-lg font-bold text-white/90 transition-colors duration-200 hover:text-white ${focusRing}`}
                >
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 transition-colors duration-200 group-hover:bg-secondary-500 group-hover:text-primary-500"
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="link-underline">{label}</span>
                  {external && externalNote}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fine print: copyright and credit on the left, legal links on the right
          from tablet up; stacked on the same left edge as the columns above on phones. */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-white/75 sm:px-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <p>{footer.copyright}</p>
            {/* Credit line is deliberately not translated. */}
            <p lang="en">
              Designed by{" "}
              <a
                href={DESIGNER.url}
                {...externalProps}
                className={`group rounded font-bold text-white/90 transition-colors duration-200 hover:text-white ${focusRing}`}
              >
                <span className="link-underline">{DESIGNER.name}</span>
                {externalNote}
              </a>{" "}
            </p>
          </div>

          {/* The legal pages are English only, so their labels stay English too. */}
          <nav aria-label="Legal" lang="en">
            <ul className="flex flex-wrap gap-x-6 md:-mt-3 md:justify-end">
              {legal.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className={linkClass}>
                    <span className="link-underline">{page.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </Reveal>
  );
}
