# Gotham City Holding — Website

Static marketing website for **Gotham City Holding Pty Ltd**, an Australian holding company providing outsourced virtual assistant, offshore resourcing, and HR services to professional-services firms.

Built with [Astro](https://astro.build) — outputs a fully static site with no client-side framework dependency.

## Getting Started

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Where to Edit Content

| What | File |
|------|------|
| Company facts (ABN, ACN, email, phone, address, stats) | `src/data/site.ts` |
| Services (the 9 service categories and detail copy) | `src/data/services.ts` |
| Design tokens (colors, fonts, spacing, radii) | `src/styles/tokens.css` |

> Placeholders in `site.ts` are marked `[label — to be provided]`. Replace them with real values from the client before launch.

## Pages

The site builds 13 pages:

- `/` — Home
- `/about` — About
- `/services` — Services overview
- `/contact` — Contact
- `/services/[slug]` — One page per service category (9 pages)

## Deploy

Repository: `seoaudmg-crypto/GothamCity` on GitHub.

Pushes to `main` trigger an automatic Vercel deployment. No manual deploy step required.
