import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
} from "lucide-react";
import type { ComponentType } from "react";

import { FacebookIcon } from "@/components/icons/facebook";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { Doodle } from "@/components/illustrations/doodle";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact/contact-form";
import type { Dictionary } from "@/i18n/get-dictionary";
import { contact, mapEmbedUrl, mapsUrl, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

type InfoItem = {
  Icon: ComponentType<{ className?: string }>;
  tone: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export function ContactSection({ dict }: { dict: Dictionary }) {
  const { contactPage } = dict;
  const { info, form } = contactPage;
  const whatsapp = whatsappUrl(dict.cta.whatsappMessage);

  const items: InfoItem[] = [
    { Icon: ClockIcon, tone: "bg-secondary-300", label: info.hours.label, value: info.hours.value },
    {
      Icon: MapPinIcon,
      tone: "bg-primary-300",
      label: info.address.label,
      value: info.address.value,
      href: mapsUrl,
      external: true,
    },
    {
      Icon: WhatsAppIcon,
      tone: "bg-secondary-300",
      label: info.phone.label,
      value: contact.phone,
      href: whatsapp,
      external: true,
    },
    {
      Icon: MailIcon,
      tone: "bg-secondary-400",
      label: info.email.label,
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      Icon: FacebookIcon,
      tone: "bg-primary-300",
      label: info.facebook.label,
      value: info.facebook.value,
      href: contact.facebook,
      external: true,
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-aurora py-16 md:py-24">
      <Doodle variant="loop" className="top-4 -left-24 -z-10 w-[32rem] max-w-none" />
      <Doodle variant="arc" className="right-[-6rem] bottom-0 -z-10 hidden w-[28rem] max-w-none md:block" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal eager
            as="h1"
            className="text-4xl leading-tight font-black tracking-tight text-primary sm:text-5xl"
          >
            {contactPage.title}
          </Reveal>
          <Reveal eager as="p" delay={0.08} className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {contactPage.subtitle}
          </Reveal>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <ul className="space-y-4">
            {items.map(({ Icon, tone, label, value, href, external }, i) => {
              const body = (
                <>
                  <span
                    aria-hidden="true"
                    className={cn("grid size-14 shrink-0 place-items-center rounded-2xl text-primary", tone)}
                  >
                    <Icon className="size-7" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-extrabold text-muted-foreground">{label}</span>
                    <span className="block text-lg font-extrabold break-words text-primary">
                      {value}
                      {external && <span className="sr-only">{dict.a11y.external}</span>}
                    </span>
                  </span>
                </>
              );
              const cardClass = "clay-card flex items-center gap-4 p-4";

              return (
                <Reveal as="li" key={label} delay={0.06 * i}>
                  {href ? (
                    <a
                      href={href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      className={cn(
                        cardClass,
                        "focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none",
                      )}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={cardClass}>{body}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.1} y={32} className="rounded-[2rem] bg-white p-6 shadow-clay ring-1 ring-primary-300/50 sm:p-8">
            <h2 className="text-2xl font-extrabold text-primary">{form.title}</h2>
            <p className="mt-2 mb-6 text-base leading-relaxed text-muted-foreground">{form.intro}</p>
            <ContactForm
              content={form}
              fallback={[
                { href: whatsapp, label: info.phone.label },
                { href: `mailto:${contact.email}`, label: form.emailUs },
              ]}
            />
          </Reveal>
        </div>

        <Reveal
          y={32}
          className="mt-12 aspect-[4/3] overflow-hidden rounded-[2rem] border-4 border-primary-500 bg-white shadow-clay sm:aspect-[16/9] lg:aspect-[21/9]"
        >
          <iframe
            src={mapEmbedUrl}
            title={contactPage.map.title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="size-full border-0"
          />
        </Reveal>
      </div>
    </section>
  );
}
