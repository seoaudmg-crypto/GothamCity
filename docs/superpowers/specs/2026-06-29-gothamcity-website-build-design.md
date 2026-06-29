# Gotham City Holding — Website Build (Design Spec)

**Date:** 2026-06-29
**Status:** Approved (design phase)
**Source of truth for designs:** `gothamcity-website.pen` (V1 approved variant)

## Goal

Convert the approved Pencil (`.pen`) designs into a production-ready static
website, hosted on Vercel. Design tokens and shared content must be centralized
so a change in one place reflects everywhere ("change ek jagah → sab pe reflect").
Finance & Accounting category is dropped; the other 9 categories ship.

## Decisions (locked)

| Area | Decision |
|------|----------|
| Framework | **Astro** (static output, minimal JS) |
| Hosting | **Vercel** (auto-detected Astro preset) |
| Version control | **git** (initialize repo; required for Vercel + history) |
| Build method | **Hand-rebuild** clean, semantic, responsive HTML/CSS matching the designs |
| Responsive | **Fully responsive** — mobile / tablet / desktop |
| Contact form | **mailto:** link (upgrade path: Formspree/Web3Forms later) |
| Missing client facts | **Clear placeholders**, centralized in one data file |
| Finance & Accounting | **Dropped** (9 categories remain) |

## Pages (13 total)

| Page | Route | Source frame (id) |
|------|-------|-------------------|
| Home | `/` | Landing Page v1.1 — Services CTA (`PNpkZ`) |
| Services | `/services` | Services Page (`V7L9wF`) |
| About | `/about` | About Page (`qhgin`) |
| Contact | `/contact` | Contact Page (`eppaD`) |
| Virtual Assistant | `/services/virtual-assistant` | `q7vnO` (template) |
| Resource Allocation | `/services/resource-allocation` | `Q1tilK` |
| Offshore HR | `/services/offshore-hr` | `uLbqw` |
| IT Services | `/services/it-services` | `fS8xk` |
| IT Resource Allocation | `/services/it-resource-allocation` | `BSWox` |
| Digital Marketing | `/services/digital-marketing` | `SJAcO` |
| Customer Support | `/services/customer-support` | `J3IEe2` |
| Back Office | `/services/back-office` | `oDLWc` |
| RPO | `/services/rpo` | `W997E` |

**Dropped:** Finance & Accounting (`G5sNpn`) — not built into the site.

The Services Mega-Menu (`i3C77b`) hover-state mock becomes the nav dropdown
behavior (desktop), collapsing into the mobile menu.

## Centralization (core requirement)

Three layers, each a single edit point:

1. **`src/styles/tokens.css`** — all design tokens as CSS custom properties,
   exact from the `.pen` V1 variables:
   - Colors: `primary #1B2A4A`, `primary-dark #111C33`, `primary-light #2A4070`,
     `accent #C9A84C`, `accent-dark #A8892E`, `accent-light #E8CC7A`,
     `bg #F8F7F4`, `bg-alt #EDECEA`, `border #DDD9D0`, `surface #FFFFFF`,
     `text-primary #1A1A2E`, `text-secondary #5A6A7A`, `text-muted #8A9AAA`,
     `text-light #FFFFFF`
   - Fonts: heading **Playfair Display**, body **Inter** (Google Fonts)
   - Spacing/radius scale extracted from recurring design values
2. **`src/data/site.ts`** — company info in one object: company name, ABN, ACN,
   established year, head office, email, phone, address, hours, social, and the
   four About stats. **All missing facts live here as clear placeholders.**
   Filling client facts later = edit this one file.
3. **`src/data/services.ts`** — the 9 categories with their sub-services, hero
   copy, "What's Included" items, and counts (derived from `services-list.md`,
   minus Finance & Accounting). Adding/editing a service = edit here.

## Reusable components

`BaseLayout.astro` (html head, meta, fonts, global CSS), `Nav.astro`
(+ mega-menu dropdown + mobile hamburger), `Footer.astro`, `CTAStrip.astro`,
plus small presentational pieces (e.g. `ServiceCard`, `ValueCard`, `StatItem`)
as the rebuild reveals repetition.

## Category pages = one data-driven template

A single dynamic route `src/pages/services/[category].astro` reads
`services.ts` and statically generates all 9 category pages. The shared template
matches the category frame structure: Hero → What's Included → Why Us →
CTAStrip → Footer. Editing the template updates all 9 pages.

## Responsive

Breakpoints: mobile (`< 640px`), tablet (`640–1024px`), desktop (`> 1024px`).
- Nav collapses to a hamburger menu on mobile; mega-menu items move inside it.
- Multi-column grids (services, values, stats, footer) stack.
- Type and spacing scale down at smaller widths.
- Designs are 1440px desktop; desktop is the visual reference, mobile/tablet
  are adapted to match intent.

## Contact form

Static `mailto:` approach. The form (Name, Email, Company, Service, Message)
composes a `mailto:` to the company email (from `site.ts`) with a pre-filled
subject/body. No backend. Documented upgrade path: swap the form action for
Formspree/Web3Forms when the client provides an inbox.

## Proposed file structure

```
src/
├── layouts/BaseLayout.astro
├── components/   Nav · Footer · CTAStrip · ServiceCard · ValueCard · StatItem ...
├── data/         site.ts · services.ts
├── pages/
│   ├── index.astro
│   ├── services.astro
│   ├── about.astro
│   ├── contact.astro
│   └── services/[category].astro      # generates 9 category pages
└── styles/       tokens.css · global.css
public/           images, favicon
astro.config.mjs · package.json
```

## Data needed from client (tracked, placeholders until then)

Critical: ABN, ACN, year established, head office (city + full address).
Contact: real email, phone, full address.
Stats: professionals deployed, clients served, countries, years of operation.
Optional: logo file, founder/leadership names, domain confirmation
(`gothamcityholding.com.au`).

Until provided, all of the above render as clear placeholders sourced from
`site.ts` (e.g. `[ABN — to be provided]`).

## Out of scope (this build)

- Functional backend form / CRM integration (mailto only for now)
- CMS / admin editing
- Blog or additional pages beyond the 13 listed
- Finance & Accounting category
- Real client facts (placeholders until client delivers)

## Cleanup as part of this work

- Old `index.html`, `pages/services.html`, `assets/css/*`, `assets/js/*` reference
  deprecated services — these are superseded by the Astro build and removed/archived.
- The Astro project becomes the canonical site source.
