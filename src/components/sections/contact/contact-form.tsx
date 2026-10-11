"use client";

import { useState, type FormEvent } from "react";

import { CountrySelect } from "@/components/sections/contact/country-select";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/format";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

type ContactFormProps = {
  content: Dictionary["contactPage"]["form"];
  /** URL the form posts to (urlencoded). */
  action: string;
  fallback: { href: string; label: string }[];
};

const fieldClass =
  "block w-full rounded-2xl border-2 border-primary-300/60 bg-white px-4 py-3 text-base text-primary shadow-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/85 focus:border-primary focus:ring-4 focus:ring-ring/25";

const labelClass = "mb-1.5 block text-sm font-extrabold text-primary";

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

export function ContactForm({ content, action, fallback }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState(false);

  /**
   * Without JS the browser posts the form natively to `action`. With JS we
   * post in place so people stay on the site, and only report success when the
   * server actually accepts the request.
   */
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // The custom select can't show a native "required" bubble, so check here.
    if (!country) {
      setCountryError(true);
      form.querySelector<HTMLElement>("#contact-country")?.focus();
      return;
    }
    setStatus("sending");

    try {
      const data = new FormData(form);
      // "+60" + "012-345 6789" -> "+60 12-345 6789": drop the trunk 0, and
      // leave numbers the parent already typed with a "+" alone.
      const local = String(data.get("phone") ?? "").trim();
      if (dialCode && !local.startsWith("+")) {
        data.set("phone", `${dialCode} ${local.replace(/^0/, "")}`);
      }
      const body = new URLSearchParams(
        Array.from(data, ([key, value]) => [key, String(value)]),
      );
      const response = await fetch(action, { method: "POST", body });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setCountry("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";
  const dialCode = DIAL_CODES[country];
  const { placeholders } = content;
  const phoneExample = interpolate(placeholders.phoneHint, {
    number: PHONE_EXAMPLES[country] ?? "+60 12-345 6789",
  });

  return (
    <form
      action={action}
      method="post"
      onSubmit={onSubmit}
      className="space-y-5"
      aria-busy={sending}
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
            className={fieldClass}
          />
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
            className={fieldClass}
          />
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
              setCountryError(false);
            }}
            required
            invalid={countryError}
            describedBy={countryError ? "contact-country-error" : undefined}
            countries={content.countries}
            placeholder={content.countryPlaceholder}
            className={fieldClass}
          />
          {countryError && (
            <p id="contact-country-error" role="alert" className="mt-1.5 text-sm font-bold text-destructive">
              {content.countryRequired}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            {content.phone}
          </label>
          <div className={phoneShellClass}>
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
              aria-describedby={dialCode ? "contact-phone-prefix" : undefined}
              placeholder={phoneExample}
              className="min-w-0 flex-1 bg-transparent py-3 text-base text-primary outline-none placeholder:text-muted-foreground/85"
            />
          </div>
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
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <Button
        type="submit"
        variant="cta"
        size="lg"
        disabled={sending}
        className="w-full! sm:w-auto"
      >
        {sending ? content.sending : content.submit}
      </Button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="rounded-2xl bg-secondary-300/40 p-4 text-base font-bold text-primary">
            {content.success}
          </p>
        )}
        {status === "error" && (
          <div className="space-y-2 rounded-2xl bg-destructive/10 p-4 text-base text-primary">
            <p className="font-bold">{content.error}</p>
            <p className="flex flex-wrap gap-x-4">
              {fallback.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.href.startsWith("http") && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="font-extrabold underline decoration-secondary-500 decoration-2 underline-offset-4 hover:text-secondary-500"
                >
                  {link.label}
                </a>
              ))}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
