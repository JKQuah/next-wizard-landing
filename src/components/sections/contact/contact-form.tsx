"use client";

import { MailIcon } from "lucide-react";
import { useState, type FormEvent } from "react";

import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { CountrySelect } from "@/components/sections/contact/country-select";
import { Button } from "@/components/ui/button";
import { Toaster, toastManager } from "@/components/ui/toaster";
import { whatsappUrl } from "@/lib/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/format";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "country" | "phone" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

type ContactFormProps = {
  content: Dictionary["contactPage"]["form"];
  fallback: { href: string; label: string }[];
};

const fieldClass =
  "block w-full rounded-2xl border-2 border-primary-300/60 bg-white px-4 py-3 text-base text-primary shadow-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/85 focus:border-primary focus:ring-4 focus:ring-ring/25";

const labelClass = "mb-1.5 block text-sm font-extrabold text-primary";

/** Border override for a field that failed validation. */
const invalidClass = "border-destructive focus:border-destructive";

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-bold text-destructive">
      {children}
    </p>
  );
}

/** Fixed id: a new result replaces the toast on screen instead of stacking. */
const TOAST_ID = "contact-form";

/** Same look as `fieldClass`, but wraps a dial-code chip plus the input. */
const phoneShellClass =
  "flex w-full items-center gap-2 rounded-2xl border-2 border-primary-300/60 bg-white px-4 shadow-sm transition-[border-color,box-shadow] duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-ring/25";

/** Sample local numbers (reserved or dummy ranges) for the phone placeholder. */
const PHONE_EXAMPLES: Record<string, string> = {
  MY: "012-345 6789",
  SG: "9123 4567",
  HK: "5123 4567",
  CN: "131 2345 6789",
  AU: "0412 345 678",
  AE: "050 123 4567",
  US: "(555) 123-4567",
  GB: "07700 900123",
};

/** International dial code for each selectable country code. */
const DIAL_CODES: Record<string, string> = {
  MY: "+60",
  SG: "+65",
  HK: "+852",
  CN: "+86",
  AU: "+61",
  AE: "+971",
  US: "+1",
  GB: "+44",
};

export function ContactForm({ content, fallback }: ContactFormProps) {
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function setFieldError(field: FieldName, message?: string) {
    setErrors((current) => ({ ...current, [field]: message }));
  }

  /**
   * Native validation still blocks the submit (and works without JS), but we
   * swap the browser's one-at-a-time bubble for a message under each field.
   * `invalid` doesn't bubble, hence the capture handler on the form.
   */
  function onInvalid(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const field = event.target as HTMLInputElement | HTMLTextAreaElement;
    const name = field.name as FieldName;
    const messages: Record<string, { missing: string; invalid?: string }> = {
      name: { missing: content.nameRequired },
      email: { missing: content.emailRequired, invalid: content.emailInvalid },
      phone: { missing: content.phoneRequired },
      message: { missing: content.messageRequired },
    };
    const { missing, invalid } = messages[name];
    setFieldError(name, field.validity.typeMismatch && invalid ? invalid : missing);

    // Invalid events fire for every bad field; act once, on the first.
    if (field !== form.querySelector(":invalid")) return;
    const countryTrigger = form.querySelector<HTMLElement>("#contact-country");
    const countryFirst =
      !country &&
      countryTrigger &&
      countryTrigger.compareDocumentPosition(field) & Node.DOCUMENT_POSITION_FOLLOWING;
    if (!country) setFieldError("country", content.countryRequired);
    (countryFirst ? countryTrigger : field).focus();
  }

  /**
   * There is no mail backend behind this site, so the details are handed to
   * WhatsApp as a ready-to-send chat message with the team's number.
   */
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // The custom select can't show a native "required" bubble, so check here.
    if (!country) {
      setFieldError("country", content.countryRequired);
      form.querySelector<HTMLElement>("#contact-country")?.focus();
      return;
    }

    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    // "+60" + "012-345 6789" -> "+60 12-345 6789": drop the trunk 0, and
    // leave numbers the parent already typed with a "+" alone.
    const local = value("phone");
    const phone =
      dialCode && !local.startsWith("+")
        ? `${dialCode} ${local.replace(/^0/, "")}`
        : local;
    const countryName =
      content.countries.find((item) => item.code === country)?.name ?? country;

    const url = whatsappUrl(
      [
        `${content.name}: ${value("name")}`,
        `${content.email}: ${value("email")}`,
        `${content.country}: ${countryName}`,
        `${content.phone}: ${phone}`,
        "",
        `${content.message}: ${value("message")}`,
      ].join("\n"),
    );

    // Opened straight from the submit gesture so popup blockers allow it.
    const chat = window.open(url, "_blank");
    if (!chat) {
      // Stays until dismissed: it carries the links people need next.
      toastManager.add({
        id: TOAST_ID,
        type: "error",
        priority: "high",
        timeout: 0,
        title: content.errorTitle,
        description: content.error,
        data: {
          links: fallback.map((link) => ({
            ...link,
            icon: link.href.startsWith("mailto:") ? (
              <MailIcon aria-hidden="true" />
            ) : (
              <WhatsAppIcon aria-hidden="true" />
            ),
          })),
        },
      });
      return;
    }
    chat.opener = null;
    toastManager.add({
      id: TOAST_ID,
      type: "success",
      timeout: 10000,
      title: content.successTitle,
      description: content.success,
      // Popup blockers and desktops without WhatsApp: let them open it again.
      data: {
        links: [
          {
            href: url,
            label: content.openWhatsApp,
            icon: <WhatsAppIcon aria-hidden="true" />,
          },
        ],
      },
    });

    // The message now lives in WhatsApp (and the toast link), so start fresh.
    form.reset();
    setCountry("");
    setErrors({});
  }

  const dialCode = DIAL_CODES[country];
  const { placeholders } = content;
  const phoneExample = interpolate(placeholders.phoneHint, {
    number: PHONE_EXAMPLES[country] ?? "+60 12-345 6789",
  });

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="space-y-5"
        onInvalidCapture={onInvalid}
        // Clear a field's message as soon as the parent starts fixing it.
        onInput={(event) => {
          const { name } = event.target as HTMLInputElement;
          if (name in errors) setFieldError(name as FieldName);
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              {content.name}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={placeholders.name}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={cn(fieldClass, errors.name && invalidClass)}
            />
            {errors.name && <FieldError id="contact-name-error">{errors.name}</FieldError>}
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              {content.email}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={placeholders.email}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={cn(fieldClass, errors.email && invalidClass)}
            />
            {errors.email && <FieldError id="contact-email-error">{errors.email}</FieldError>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-country" className={labelClass}>
              {content.country}
            </label>
            <CountrySelect
              id="contact-country"
              name="country"
              value={country}
              onValueChange={(next) => {
                setCountry(next);
                setFieldError("country");
              }}
              required
              invalid={Boolean(errors.country)}
              describedBy={errors.country ? "contact-country-error" : undefined}
              countries={content.countries}
              placeholder={content.countryPlaceholder}
              className={fieldClass}
            />
            {errors.country && (
              <FieldError id="contact-country-error">{errors.country}</FieldError>
            )}
          </div>
          <div>
            <label htmlFor="contact-phone" className={labelClass}>
              {content.phone}
            </label>
            <div
              className={cn(
                phoneShellClass,
                errors.phone && "border-destructive focus-within:border-destructive",
              )}
            >
              {dialCode && (
                <span
                  id="contact-phone-prefix"
                  className="shrink-0 rounded-lg bg-accent px-2 py-1 text-sm font-extrabold text-primary tabular-nums"
                >
                  {dialCode}
                </span>
              )}
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={
                  [dialCode && "contact-phone-prefix", errors.phone && "contact-phone-error"]
                    .filter(Boolean)
                    .join(" ") || undefined
                }
                placeholder={phoneExample}
                className="min-w-0 flex-1 bg-transparent py-3 text-base text-primary outline-none placeholder:text-muted-foreground/85"
              />
            </div>
            {errors.phone && <FieldError id="contact-phone-error">{errors.phone}</FieldError>}
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            {content.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder={placeholders.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={cn(fieldClass, "resize-y", errors.message && invalidClass)}
          />
          {errors.message && (
            <FieldError id="contact-message-error">{errors.message}</FieldError>
          )}
        </div>

        <Button
          type="submit"
          variant="cta"
          size="lg"
          className="w-full! sm:w-auto"
        >
          {content.submit}
        </Button>
      </form>
      <Toaster closeLabel={content.dismiss} />
    </>
  );
}
