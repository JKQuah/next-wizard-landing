import { Doodle } from "@/components/illustrations/doodle";
import { Reveal } from "@/components/motion/reveal";
import { RichText, type RichTextLink } from "@/components/rich-text";
import type { LegalContent } from "@/content/legal";
import type { Locale } from "@/i18n/config";
import { contact, packagesPath } from "@/lib/site";

const BILLPLZ_URL = "https://www.billplz.com";

type LegalDocumentProps = {
  locale: Locale;
  content: LegalContent;
};

/**
 * One legal page (Terms or Privacy). The copy is English only, so the section
 * carries lang="en" to keep screen readers and hyphenation right on /zh too.
 */
export function LegalDocument({ locale, content }: LegalDocumentProps) {
  const links: Record<string, RichTextLink> = {
    email: { href: `mailto:${contact.email}`, label: contact.email },
    terms: { href: `/${locale}/terms`, label: "Terms & Conditions" },
    privacy: { href: `/${locale}/privacy`, label: "Privacy Policy" },
    packages: { href: packagesPath(locale), label: "Packages" },
    billplz: { href: BILLPLZ_URL, label: "Billplz" },
  };

  /** Plain-text details come from lib/site.ts so they stay in one place. */
  const fill = (text: string) =>
    text.replace("{phone}", contact.phone).replace("{address}", contact.address);

  return (
    <section
      lang="en"
      className="relative isolate overflow-hidden bg-aurora py-16 md:py-24"
    >
      <Doodle variant="loop" className="top-4 -left-24 -z-10 w-[32rem] max-w-none" />
      <Doodle variant="arc" className="right-[-6rem] bottom-0 -z-10 hidden w-[28rem] max-w-none md:block" />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal
            eager
            as="h1"
            className="text-4xl leading-tight font-black tracking-tight text-primary sm:text-5xl"
          >
            {content.title}
          </Reveal>
          <Reveal eager as="p" delay={0.08} className="mt-4 text-base font-bold text-muted-foreground">
            Last updated: {content.updated}
          </Reveal>
        </div>

        <Reveal
          eager
          delay={0.12}
          className="mt-10 rounded-[2rem] bg-white p-6 shadow-clay ring-1 ring-primary-300/50 sm:p-10"
        >
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {content.intro.map((text) => (
              <p key={text}>
                <RichText text={text} links={links} />
              </p>
            ))}
          </div>

          <nav
            aria-labelledby="legal-contents"
            className="mt-8 rounded-2xl bg-muted p-5 sm:p-6"
          >
            <h2 id="legal-contents" className="text-sm font-extrabold tracking-wider text-primary uppercase">
              Contents
            </h2>
            <ol className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {content.sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex min-h-8 items-center gap-2 rounded-lg font-bold text-primary underline-offset-4 hover:underline focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none"
                  >
                    <span className="w-6 shrink-0 text-muted-foreground tabular-nums">{i + 1}.</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 space-y-10">
            {content.sections.map((section, i) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28">
                <h2 id={`${section.id}-heading`} className="text-2xl font-extrabold text-primary">
                  {i + 1}. {section.heading}
                </h2>
                <div className="mt-3 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {section.blocks.map((block, j) =>
                    typeof block === "string" ? (
                      <p key={j}>
                        <RichText text={fill(block)} links={links} />
                      </p>
                    ) : (
                      <ul key={j} className="list-disc space-y-2 pl-6 marker:text-secondary-500">
                        {block.map((item) => (
                          <li key={item}>
                            <RichText text={fill(item)} links={links} />
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
