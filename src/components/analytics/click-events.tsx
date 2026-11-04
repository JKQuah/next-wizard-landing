"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

/** Which kind of contact link this is, judged by its address alone. */
function classify(href: string) {
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) return "whatsapp_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.startsWith("tel:")) return "phone_click";
  if (/^https?:\/\/([a-z]+\.)?facebook\.com\//i.test(href)) return "facebook_click";
  return undefined;
}

/**
 * Counts clicks on the ways to get in touch (WhatsApp, email, phone,
 * Facebook) from one listener on the whole page, so every button, footer link
 * and in-page link is covered, including ones added later.
 *
 * Only the kind of link and where on the page it sat are sent. The address is
 * never read into the event, because WhatsApp links built by the contact form
 * contain what the visitor typed.
 */
export function ClickEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const name = link && classify(link.getAttribute("href") ?? "");
      if (!link || !name) return;

      const place = link.closest("header")
        ? "header"
        : link.closest("footer")
          ? "footer"
          : (link.closest("section[id]")?.id ?? "page");
      trackEvent(name, { link_location: place });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
