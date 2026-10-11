# Singapore Math Wizard — landing page

Next.js 16 (App Router, Cache Components) · Tailwind CSS 4 · shadcn/ui (Base UI) · motion

Home-page content mirrors https://www.sgmathwizard.com/ in English and Simplified Chinese.

## Run

```bash
pnpm install
pnpm dev      # http://localhost:3000 -> redirects to /en or /zh
pnpm build && pnpm start
```

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
