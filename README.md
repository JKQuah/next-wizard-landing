# Singapore Math Wizard — landing page

Next.js 16 (App Router, Cache Components) · Tailwind CSS 4 · shadcn/ui (Base UI) · motion

Home-page content mirrors https://www.sgmathwizard.com/ in English and Simplified Chinese.

## Run

```bash
pnpm install
pnpm dev      # http://localhost:3000 -> redirects to /en or /zh
pnpm build && pnpm start
```

## Google tags (Analytics, Tag Manager, Search Console)

All three are switched on with environment variables; see `.env.example` for
the names and where to find each value. They are read at **build** time, so set
them in the hosting provider's build environment and redeploy. Tags only run in
production builds, never under `pnpm dev`.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_GTM_ID` | Loads the Tag Manager container (plus its `<noscript>` fallback). |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Loads Google Analytics 4 directly. Leave empty if your Tag Manager container already fires the GA4 tag, or visits count twice. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Adds the Search Console `google-site-verification` meta tag to every page. |

Marketing events (sent to Tag Manager's data layer, or to GA4 through gtag when
there is no container; every event also carries `language`):

| Event | When | Extra data |
| --- | --- | --- |
| `whatsapp_click` | Any link to WhatsApp (header, footer, hero, FAQ, mascot...) | `link_location` |
| `email_click` / `phone_click` / `facebook_click` | Any `mailto:`, `tel:` or Facebook link | `link_location` |
| `generate_lead` | The contact form is submitted | `method`, `lead_country` (country code only) |

`link_location` is `header`, `footer`, the section's id, or `page`. In Tag
Manager add a Custom Event trigger with the event name; in GA4 mark
`generate_lead` as a key event. Events never include names, emails, phone
numbers, messages or URLs. `trackEvent()` in `src/lib/analytics.ts` sends your
own events; the link listener is `src/components/analytics/click-events.tsx`.

After deploying: verify the property in Search Console, then submit
`https://www.sgmathwizard.com/sitemap.xml`. The code is in
`src/lib/analytics.ts` and `src/components/analytics/google-tags.tsx`.

## Structure

| Path | Purpose |
| --- | --- |
| `src/app/[lang]/` | Root layout + page; every route lives under the locale segment |
| `src/app/[lang]/about/` | About page (`/en/about`, `/zh/about`): background, vision, values, team, hiring |
| `src/app/[lang]/curriculum/` | Curriculum page: overview, features, Primary 1–6 syllabus tabs (`curriculumPage` in the dictionaries) |
| `src/proxy.ts` | Redirects `/` to the best locale using `Accept-Language` |
| `src/i18n/dictionaries/*.json` | All copy. `en.json` defines the shape; other locales must match it (type-checked) |
| `src/i18n/config.ts` | Supported locales, labels, BCP 47 tags |
| `src/lib/site.ts` | Site URL, WhatsApp / email / Facebook endpoints, off-page links |
| `src/components/motion/reveal.tsx` | `<Reveal>` scroll fade-in; respects `prefers-reduced-motion` |
| `src/components/sections/about-us/` | About-page sections; add team portraits via `photo` in `team.tsx` |
| `src/components/sections/` | Hero, About, Practicle, Stats, Levels, Teachers, Methods, Invite, Reviews, FAQ |
| `src/components/illustrations/` | Inline SVG kids, teacher and bar-model art |
| `src/app/globals.css` | Brand tokens (`primary-500/400/300`, `secondary-500/400/300`) |

## Add a language

1. Add the code to `locales`, `localeLabels` and `localeTags` in `src/i18n/config.ts`.
2. Copy `en.json` to `src/i18n/dictionaries/<code>.json` and translate.
3. Register it in `src/i18n/get-dictionary.ts`.

## Theme

Single light theme by design — there is no dark mode or theme switch.
