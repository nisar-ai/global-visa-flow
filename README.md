# GlobalVisa Flow

A Next.js (App Router + TypeScript + Tailwind CSS v4) visa information hub.
Pick a destination, choose tourist / study / work / PR-citizenship, and get
the visa type, an estimated timeline, a cost calculator (local currency +
USD), a persistent document checklist, and official government links.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm run start
```

## What's included

- **Light/dark theme** — toggle in the header, persisted via `next-themes`.
  Light mode uses a softened, low-glare palette; dark mode uses a richer,
  higher-contrast palette. Both are defined as CSS variables in
  `src/app/globals.css`.
- **Multi-language UI** — English, Deutsch, العربية (RTL-aware), Türkçe.
  Switcher in the header, dictionary in `src/data/i18n.ts`. This translates
  the site's interface chrome (nav, buttons, labels); the detailed visa
  document/step content itself is in English only in this version.
- **5 countries** with tourist / study / work / PR-citizenship guidance
  (Saudi Arabia also includes Umrah): Germany, United Kingdom, United
  States, Saudi Arabia, Turkey. Data lives in `src/data/countries.json` —
  add more countries by following the same shape.
- **Visa timeline** — visual estimate of processing time per category.
- **Cost calculator** — visa fee + optional service/insurance/misc costs,
  totaled in local currency and converted to USD.
- **Interactive checklist** — persisted per country + visa category via
  `localStorage`.
- **PR & Citizenship section** — same tool, framed for people planning to
  settle permanently rather than just visit.
- **VisaFlow Guide** (`/guide`, `/guide/[slug]`) — step-by-step walkthrough
  per country with a category switcher.

## Important notes before going live

- **Exchange rates are static/illustrative** (`src/data/exchange-rates.json`).
  Replace with a live FX API (e.g. exchangerate.host, openexchangerates.org)
  before relying on the cost calculator for real decisions.
- **Visa fees, processing times, and document lists are demo data** and
  change often. Verify against the linked official government sites before
  publishing this for real users, and set up a periodic link-check.
- Only 5 countries have full data; everything else shows an honest
  "still adding this destination" state rather than broken content.

## Tech stack

Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4,
next-themes.

---
Built by **Nisar Ahmad** — COMSATS University Islamabad, Sahiwal Campus, Pakistan.
