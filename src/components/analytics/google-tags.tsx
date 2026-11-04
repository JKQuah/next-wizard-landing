import Script from "next/script";

import { analyticsEnabled, GA_MEASUREMENT_ID, GTM_ID } from "@/lib/analytics";

import { ClickEvents } from "./click-events";

/**
 * Google Tag Manager and Google Analytics 4. Render it once, at the top of
 * <body> in the root layout; it outputs nothing unless an ID is configured
 * (see src/lib/analytics.ts) and the site is a production build.
 *
 * Both scripts load after the page is interactive, so they don't delay it.
 * Pageviews on in-site navigation are picked up by GA4's built-in "page
 * changes based on browser history" measurement, or in Tag Manager by a
 * History Change trigger.
 *
 * If your Tag Manager container already fires a GA4 tag for the same stream,
 * leave NEXT_PUBLIC_GA_MEASUREMENT_ID unset, otherwise every visit counts twice.
 */
export function GoogleTags() {
  if (!analyticsEnabled || (!GTM_ID && !GA_MEASUREMENT_ID)) return null;

  return (
    <>
      <ClickEvents />

      {/* Consent Mode defaults, set before any Google tag can read them. The
          site shows no ads, so advertising storage stays off; analytics is on.
          Switch analytics_storage to "denied" and call
          gtag("consent", "update", ...) from a cookie banner if you add one. */}
      <Script id="google-consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"granted"});`}
      </Script>

      {GTM_ID && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer",${JSON.stringify(GTM_ID)});`}
        </Script>
      )}

      {GA_MEASUREMENT_ID && (
        <>
          <Script
            id="google-analytics-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`gtag("js",new Date());gtag("config",${JSON.stringify(GA_MEASUREMENT_ID)});`}
          </Script>
        </>
      )}

      {/* Tag Manager's fallback for visitors with JavaScript turned off. */}
      {GTM_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      )}
    </>
  );
}
