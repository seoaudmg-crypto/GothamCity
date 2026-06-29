# Gotham City Holding Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production Gotham City Holding website as an Astro static site (13 pages) from the approved Pencil designs, with centralized design tokens and site data, deployed to Vercel via GitHub.

**Architecture:** Astro static-output site. Shared design tokens in CSS custom properties; all company facts in one data module; all 9 service categories in one data module driving a single dynamic category template. Reusable Nav/Footer/CTA components. Hand-built responsive HTML/CSS matching the `.pen` V1 designs.

**Tech Stack:** Astro (latest), plain CSS (no framework), Google Fonts (Playfair Display + Inter), Lucide icons (inline SVG), Vercel hosting, GitHub (`seoaudmg-crypto/GothamCity`).

## Global Constraints

- **Designs source of truth:** `gothamcity-website.pen` — V1 approved frames only (ignore V2 `kLlIC`/V3 `MblN2`). Read frames via Pencil MCP `batch_get`; never edit the `.pen`.
- **Commits:** NO `Co-Authored-By` trailer, no AI attribution. Author identity is the repo's local git config (`seoaudmg-crypto` / noreply email) — already set.
- **Finance & Accounting category is DROPPED.** 9 categories only.
- **Design tokens (from `.pen` V1 vars) — exact hex:** `primary #1B2A4A`, `primary-dark #111C33`, `primary-light #2A4070`, `accent #C9A84C`, `accent-dark #A8892E`, `accent-light #E8CC7A`, `bg #F8F7F4`, `bg-alt #EDECEA`, `border #DDD9D0`, `surface #FFFFFF`, `text-primary #1A1A2E`, `text-secondary #5A6A7A`, `text-muted #8A9AAA`, `text-light #FFFFFF`.
- **Fonts:** headings = Playfair Display; body = Inter.
- **Missing client facts** render as clear placeholders sourced from `site.ts` (e.g. `[ABN — to be provided]`). Never invent ABN/ACN/address/phone/stats.
- **Responsive breakpoints:** mobile `< 640px`, tablet `640–1024px`, desktop `> 1024px`. Desktop (1440px) is the visual reference.
- **Verification model (no unit-test TDD):** each page/component task verifies by (a) `npm run build` succeeds, (b) renders on `npm run dev`, (c) visual match to the source `.pen` frame (screenshot/compare), (d) responsive check at the 3 breakpoints.
- **Contact form:** `mailto:` only, composed from `site.ts` email.

---

## File Structure

```
astro.config.mjs              # Astro config (site URL, output static)
package.json                  # deps + scripts
tsconfig.json                 # Astro strict TS
.gitignore                    # add node_modules, dist, .astro
src/
├── data/
│   ├── site.ts               # company info + ALL placeholders (single edit point)
│   └── services.ts           # 9 categories: slug, name, hero, included[], whyUs[], count
├── styles/
│   ├── tokens.css            # :root design tokens (colors, fonts, spacing, radius)
│   └── global.css            # reset, base type, container, button, utilities
├── components/
│   ├── Icon.astro            # inline Lucide SVG by name
│   ├── Nav.astro             # desktop nav + services mega-menu + mobile hamburger
│   ├── Footer.astro          # footer (brand, nav, contact, ABN line)
│   ├── CTAStrip.astro        # navy "ready to work with us" band
│   ├── Breadcrumb.astro      # Home / X crumb
│   ├── ServiceCard.astro     # services-grid card
│   └── StatItem.astro        # About stats number+label
├── layouts/
│   └── BaseLayout.astro      # <html><head> meta/fonts + global css + <slot/>
└── pages/
    ├── index.astro           # Home  (frame PNpkZ)
    ├── services.astro        # Services (frame V7L9wF)
    ├── about.astro           # About (frame qhgin)
    ├── contact.astro         # Contact (frame eppaD)
    └── services/
        └── [category].astro  # one template → 9 category pages (frame q7vnO etc.)
public/
├── favicon.svg
└── (images as needed)
```

Old `index.html`, `pages/services.html`, `assets/css/*`, `assets/js/*` are deprecated (reference dropped services) and removed in the final task.

---

## Task 1: Astro project scaffold

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`
- Modify: `.gitignore`
- Create: `src/pages/index.astro` (temporary smoke page, replaced in Task 9)

**Interfaces:**
- Produces: a buildable Astro project; `npm run dev` and `npm run build` scripts.

- [ ] **Step 1: Scaffold Astro in-place**

Run (non-interactive, empty template, no git since repo exists):
```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict --yes
```
If the directory-not-empty prompt blocks it, scaffold in a temp dir and copy `src/`, `astro.config.mjs`, `package.json`, `tsconfig.json` into the project root.

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, no errors.

- [ ] **Step 3: Set static output + site URL in `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gothamcity.example', // replace with real domain when known
  output: 'static',
});
```

- [ ] **Step 4: Update `.gitignore`** — append:

```
# Astro / Node
node_modules/
dist/
.astro/
.vercel/
```

- [ ] **Step 5: Verify dev + build**

Run: `npm run build`
Expected: build completes, `dist/` produced, exit 0.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project"
```

---

## Task 2: Design tokens + global stylesheet

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`

**Interfaces:**
- Produces: CSS custom properties (`--color-primary`, `--color-accent`, `--font-heading`, `--font-body`, spacing/radius scale) and base styles consumed by every component/page.

- [ ] **Step 1: Write `tokens.css`** (exact hex from Global Constraints)

```css
:root {
  /* Brand */
  --color-primary: #1B2A4A;
  --color-primary-dark: #111C33;
  --color-primary-light: #2A4070;
  --color-accent: #C9A84C;
  --color-accent-dark: #A8892E;
  --color-accent-light: #E8CC7A;
  /* Surfaces */
  --color-bg: #F8F7F4;
  --color-bg-alt: #EDECEA;
  --color-surface: #FFFFFF;
  --color-border: #DDD9D0;
  /* Text */
  --color-text-primary: #1A1A2E;
  --color-text-secondary: #5A6A7A;
  --color-text-muted: #8A9AAA;
  --color-text-light: #FFFFFF;
  /* Type */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  /* Spacing scale */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-20: 80px; --space-24: 96px;
  /* Radius */
  --radius-sm: 4px; --radius-md: 6px; --radius-lg: 12px;
  /* Layout */
  --container-max: 1200px;
  --section-x: 120px; /* desktop horizontal padding; reduced at breakpoints */
}
@media (max-width: 1024px){ :root{ --section-x: 56px; } }
@media (max-width: 640px){ :root{ --section-x: 20px; } }
```

- [ ] **Step 2: Write `global.css`** (reset + base type + helpers)

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  font-family: var(--font-body);
  color: var(--color-text-primary);
  background: var(--color-bg);
  line-height: 1.6;
}
h1,h2,h3,h4 { font-family: var(--font-heading); line-height: 1.2; color: var(--color-primary); }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
ul { list-style: none; }
.container { max-width: var(--container-max); margin-inline: auto; }
.section { padding: var(--space-24) var(--section-x); }
.btn { display: inline-flex; align-items: center; gap: var(--space-2);
  border-radius: var(--radius-sm); font-weight: 600; cursor: pointer;
  padding: 14px 28px; transition: background .2s, color .2s; }
.btn--gold { background: var(--color-accent); color: var(--color-primary); }
.btn--gold:hover { background: var(--color-accent-dark); }
.btn--outline { border: 1px solid var(--color-primary); color: var(--color-primary); background: transparent; }
.eyebrow { color: var(--color-accent-dark); font-size: 12px; font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase; }
.visually-hidden { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); }
```

- [ ] **Step 3: Verify** — temporarily import both in the smoke `index.astro`, run `npm run build`. Expected: build passes.

- [ ] **Step 4: Commit**

```bash
git add src/styles/
git commit -m "feat: add design tokens and global stylesheet"
```

---

## Task 3: Site data module (single edit point for company facts)

**Files:**
- Create: `src/data/site.ts`

**Interfaces:**
- Produces: `export const site` with typed fields consumed by Nav, Footer, About, Contact.
- Placeholder convention: `PLACEHOLDER('ABN')` → returns `"[ABN — to be provided]"`.

- [ ] **Step 1: Write `site.ts`**

```ts
const TBD = (label: string) => `[${label} — to be provided]`;

export const site = {
  name: 'Gotham City Holding Pty Ltd',
  shortName: 'Gotham City Holding',
  tagline:
    'An Australian-registered holding company providing vetted virtual assistants, offshore specialists, and HR support to the firms and businesses that rely on them.',
  country: 'Australia',
  // Legitimacy facts — PLACEHOLDERS until client provides
  abn: TBD('ABN'),
  acn: TBD('ACN'),
  established: TBD('Year'),
  headOffice: TBD('Head office'),
  // Contact — PLACEHOLDERS until client provides
  email: 'info@gothamcityholding.com.au', // TODO confirm/replace with real inbox
  phone: TBD('Phone'),
  address: TBD('Office address'),
  hours: 'Mon–Fri · 9:00am–5:00pm AEST',
  // About stats — PLACEHOLDERS
  stats: [
    { value: '[ X ]+', label: 'Professionals deployed' },
    { value: '[ X ]',  label: 'Clients served' },
    { value: '[ X ]',  label: 'Countries' },
    { value: '[ X ]+', label: 'Years of operation' },
  ],
  copyrightYear: 2026,
} as const;
```

- [ ] **Step 2: Verify** — `npm run build` (file is imported in a later task; just ensure it type-checks via `npx astro check` if available, else build).

- [ ] **Step 3: Commit**

```bash
git add src/data/site.ts
git commit -m "feat: add centralized site data with placeholders"
```

---

## Task 4: Services data module (9 categories)

**Files:**
- Create: `src/data/services.ts`
- Reference: `services-list.md` (minus Finance & Accounting)

**Interfaces:**
- Produces: `export const services: Category[]` and `export type Category`.
- `Category = { slug, name, tagline, included: string[], whyUs: {title,desc}[], count: number }`.
- Consumed by: `services.astro`, `services/[category].astro`, Nav mega-menu.

- [ ] **Step 1: Write `services.ts`** — 9 entries. Fill `included` from `services-list.md` sub-services; `count` = `included.length`; `tagline`/`whyUs` from the matching `.pen` category frame copy.

```ts
export type Category = {
  slug: string;
  name: string;
  tagline: string;
  included: string[];
  whyUs: { title: string; desc: string }[];
};

export const services: Category[] = [
  {
    slug: 'virtual-assistant',
    name: 'Virtual Assistant Services',
    tagline: '…', // from frame q7vnO hero
    included: ['Administrative support','Calendar & email management','Data entry','Customer support','Travel booking'],
    whyUs: [/* from frame Why Us */],
  },
  { slug: 'resource-allocation', name: 'Resource Allocation', tagline: '…',
    included: ['Dedicated remote teams','Project-based staffing','Contract staffing','Temporary and permanent resource deployment'], whyUs: [] },
  { slug: 'offshore-hr', name: 'Offshore HR Services', tagline: '…',
    included: ['Recruitment & talent acquisition','Employee onboarding','Payroll support','Performance management','HR administration','Compliance documentation'], whyUs: [] },
  { slug: 'it-services', name: 'IT Services', tagline: '…',
    included: ['Website design & development','E-commerce development','Mobile app development','Software development','UI/UX design','Website maintenance','Search Engine Optimization (SEO)','Search Engine Marketing (SEM)'], whyUs: [] },
  { slug: 'it-resource-allocation', name: 'IT Resource Allocation', tagline: '…',
    included: ['Dedicated software developers','Front-end & back-end developers','Full-stack developers','DevOps engineers','QA testers','UI/UX designers','Cloud engineers','Data engineers'], whyUs: [] },
  { slug: 'digital-marketing', name: 'Digital Marketing Services', tagline: '…',
    included: ['Social media management','Content marketing','PPC advertising','Email marketing','Brand strategy','Online reputation management'], whyUs: [] },
  { slug: 'customer-support', name: 'Customer Support Services', tagline: '…',
    included: ['24/7 call center support','Live chat support','Email support','Technical support','Help desk services'], whyUs: [] },
  { slug: 'back-office', name: 'Back Office Operations', tagline: '…',
    included: ['Document processing','Data management','CRM management','Order processing','Inventory management','Database administration'], whyUs: [] },
  { slug: 'rpo', name: 'Recruitment Process Outsourcing (RPO)', tagline: '…',
    included: ['Candidate sourcing','Resume screening','Interview coordination','Background verification','Recruitment administration'], whyUs: [] },
];

export const getCategory = (slug: string) => services.find(c => c.slug === slug);
```

> During build, read each category frame (`q7vnO`, `Q1tilK`, `uLbqw`, `fS8xk`, `BSWox`, `SJAcO`, `J3IEe2`, `oDLWc`, `W997E`) via Pencil `batch_get` to pull the real `tagline` and `whyUs` copy. Replace every `'…'` and empty `whyUs: []`. **No placeholder copy may remain.**

- [ ] **Step 2: Verify** — `npm run build`; confirm `services.length === 9` and no Finance & Accounting slug.

- [ ] **Step 3: Commit**

```bash
git add src/data/services.ts
git commit -m "feat: add services data for 9 categories"
```

---

## Task 5: Icon + BaseLayout

**Files:**
- Create: `src/components/Icon.astro`
- Create: `src/layouts/BaseLayout.astro`

**Interfaces:**
- `Icon` props: `{ name: string; size?: number }` → renders inline Lucide SVG. Names used: `shield-check, circle-check, eye, handshake, mail, phone, map-pin, timer, chevron-down, arrow-right, menu, x`.
- `BaseLayout` props: `{ title: string; description?: string }`; renders `<html><head>` (meta, Google Fonts preconnect+link, tokens.css + global.css imports) and `<slot/>`.

- [ ] **Step 1: Write `Icon.astro`** — map each used name to its Lucide SVG path(s); render `<svg width height viewBox stroke=currentColor …>`. Fallback: empty span if unknown name.

- [ ] **Step 2: Write `BaseLayout.astro`**

```astro
---
import '../styles/tokens.css';
import '../styles/global.css';
interface Props { title: string; description?: string }
const { title, description = '' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body><slot /></body>
</html>
```

- [ ] **Step 3: Verify** — render a page using BaseLayout + an Icon; `npm run build` passes; fonts load on `npm run dev`.

- [ ] **Step 4: Commit**

```bash
git add src/components/Icon.astro src/layouts/BaseLayout.astro
git commit -m "feat: add Icon component and BaseLayout"
```

---

## Task 6: Nav component (desktop + mega-menu + mobile)

**Files:**
- Create: `src/components/Nav.astro`
- Reference frames: Nav (`N5fY6P` etc.) + Mega-Menu (`i3C77b`)

**Interfaces:**
- Consumes: `services` (mega-menu links), `site.name`.
- Props: `{ active?: 'home'|'services'|'about'|'contact' }` to highlight current link.
- Produces: `<header>` with logo (gold "G" mark + name/sub), nav links, GET IN TOUCH CTA; desktop Services hover → mega-menu listing 9 categories; mobile `< 768px` → hamburger toggling a panel (vanilla JS in a `<script>`, no dialog/alert).

- [ ] **Step 1: Build markup + styles** matching frame (navy bg `--color-primary`, height 72, padding `0 48px`, gold square mark, links 13px letter-spacing 1, gold CTA). Mega-menu: white panel, two columns of category links from `services`, soft shadow, radius 12.

- [ ] **Step 2: Add mobile behavior** — hamburger button toggles `aria-expanded` + a slide-down panel; closes on link click. No JS dialogs.

- [ ] **Step 3: Verify** — include on a test page; check desktop hover mega-menu, mobile hamburger open/close at 375px; `npm run build` passes; visual match to frame.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: add responsive Nav with services mega-menu"
```

---

## Task 7: Footer component

**Files:**
- Create: `src/components/Footer.astro`
- Reference frame: Footer (`kfStU` / `c3PUGc`)

**Interfaces:**
- Consumes: `site` (name, tagline, email, phone, country, abn, copyrightYear).
- Produces: `<footer>` (navy-dark) with brand+tagline, Navigation links, Contact (email/phone/country), divider, bottom row (copyright + `ABN: {site.abn}`).

- [ ] **Step 1: Build markup + styles** matching frame (bg `--color-primary-dark`, padding `56px 120px 32px`, gold section headings, white-alpha text). Email is a `mailto:` link; phone is a `tel:` link.

- [ ] **Step 2: Verify** — render on test page; confirm placeholders show via `site.ts`; responsive stack < 768px; `npm run build` passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer component"
```

---

## Task 8: Shared section components (CTAStrip, Breadcrumb, ServiceCard, StatItem)

**Files:**
- Create: `src/components/CTAStrip.astro`, `Breadcrumb.astro`, `ServiceCard.astro`, `StatItem.astro`

**Interfaces:**
- `CTAStrip` props: `{ title?: string; sub?: string; ctaLabel?: string }` defaults from About CTA copy; gold button → `/contact`.
- `Breadcrumb` props: `{ current: string }` → "Home / {current}".
- `ServiceCard` props: `{ name: string; slug: string; count: number; blurb?: string }` → card linking to `/services/{slug}`.
- `StatItem` props: `{ value: string; label: string }`.

- [ ] **Step 1: Build the four components** matching their frame styling (CTAStrip navy band centered; cards on `--color-surface` with `--color-border`, radius 12).

- [ ] **Step 2: Verify** — render each on a test page; `npm run build` passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/CTAStrip.astro src/components/Breadcrumb.astro src/components/ServiceCard.astro src/components/StatItem.astro
git commit -m "feat: add shared section components"
```

---

## Task 9: Home page

**Files:**
- Modify: `src/pages/index.astro` (replace smoke page)
- Source frame: `PNpkZ` (Landing Page v1.1 — Services CTA)

**Interfaces:**
- Consumes: BaseLayout, Nav, Footer, CTAStrip, ServiceCard, `services`, `site`.

- [ ] **Step 1: Read frame `PNpkZ`** via Pencil `batch_get` (readDepth 4) to get section copy/structure: Hero, TrustStrip, Intro, HowWeWork, Services (with "Explore All Services" navy-outlined CTA → `/services`), CTAStrip, Footer.

- [ ] **Step 2: Build the page** — `<BaseLayout title="Gotham City Holding — Outsourced talent, one accountable entity">`, `<Nav active="home" />`, each section as semantic HTML using tokens; services section renders 9 `ServiceCard`s from `services`; footer via `<Footer />`.

- [ ] **Step 3: Verify** — `npm run build`; screenshot `/` vs frame `PNpkZ` (desktop), check responsive at 768px/375px (hero readable, grid stacks).

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build home page"
```

---

## Task 10: Services page

**Files:**
- Create: `src/pages/services.astro`
- Source frame: `V7L9wF`

- [ ] **Step 1: Read frame `V7L9wF`** — Page Header, Core Services, Additional Services, CTAStrip, Footer.

- [ ] **Step 2: Build the page** — Nav `active="services"`, Breadcrumb "Services", grids of `ServiceCard` from `services` (split into Core = first 5, Additional = remaining 4, mirroring `services-list.md` grouping), CTAStrip, Footer.

- [ ] **Step 3: Verify** — build; screenshot vs frame; responsive grid stack; every card links to a real `/services/{slug}`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/services.astro
git commit -m "feat: build services page"
```

---

## Task 11: Category template → 9 pages

**Files:**
- Create: `src/pages/services/[category].astro`
- Source frame: `q7vnO` (template) — structure shared by all 9.

**Interfaces:**
- Consumes: `services`, `getCategory`, BaseLayout, Nav, Footer, CTAStrip.
- Uses Astro `getStaticPaths()` to emit one page per `services` slug.

- [ ] **Step 1: Read frame `q7vnO`** — Hero, "What's Included", "Why Us", CTAStrip, Footer.

- [ ] **Step 2: Write the dynamic route**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import CTAStrip from '../../components/CTAStrip.astro';
import { services, type Category } from '../../data/services.ts';

export function getStaticPaths() {
  return services.map((c) => ({ params: { category: c.slug }, props: { category: c } }));
}
const { category } = Astro.props as { category: Category };
---
<BaseLayout title={`${category.name} — ${'Gotham City Holding'}`}>
  <Nav active="services" />
  <!-- Hero: eyebrow, category.name, category.tagline -->
  <!-- What's Included: grid of category.included -->
  <!-- Why Us: grid of category.whyUs -->
  <CTAStrip />
  <Footer />
</BaseLayout>
```

- [ ] **Step 3: Fill section markup/styles** matching the template frame; "What's Included" renders `category.included`; "Why Us" renders `category.whyUs`.

- [ ] **Step 4: Verify** — `npm run build` emits exactly 9 pages under `/services/`; spot-check 2–3 (`/services/virtual-assistant`, `/services/rpo`) vs frame; confirm NO `/services/finance-accounting`; responsive check.

- [ ] **Step 5: Commit**

```bash
git add src/pages/services/[category].astro
git commit -m "feat: build data-driven category template (9 pages)"
```

---

## Task 12: About page

**Files:**
- Create: `src/pages/about.astro`
- Source frame: `qhgin`

- [ ] **Step 1: Read frame `qhgin`** — Hero (intro + Company Details card with Status/ABN/ACN/Established/Head Office), Who We Are, Mission, Values (4 cards: Integrity/Reliability/Transparency/Partnership), Stats (4), CTAStrip, Footer.

- [ ] **Step 2: Build the page** — Company Details card pulls `site.abn/acn/established/headOffice`; Stats render `site.stats` via `StatItem`; Values use `Icon`. Nav `active="about"`, Breadcrumb "About".

- [ ] **Step 3: Verify** — build; confirm all placeholders come from `site.ts` (no hardcoded blanks); screenshot vs frame; responsive.

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: build about page"
```

---

## Task 13: Contact page (mailto form)

**Files:**
- Create: `src/pages/contact.astro`
- Source frame: `eppaD`

**Interfaces:**
- Consumes: `site` (email/phone/address/hours/abn), `services` (service dropdown options), Nav, Footer.

- [ ] **Step 1: Read frame `eppaD`** — Hero, Contact form (Full Name, Email, Company, Service of Interest select, Message, Send button), Reach Us (Email/Phone/Office/Hours + Entity note), Footer.

- [ ] **Step 2: Build the page** — real `<form>` with native inputs styled to frame; Service `<select>` options from `services` names. On submit, vanilla JS composes a `mailto:${site.email}` with subject + body from fields and `window.location.href` (no dialogs). Reach Us pulls from `site.ts`; Entity note shows `ABN {site.abn}`.

- [ ] **Step 3: Verify** — build; submit composes a correct mailto in dev; screenshot vs frame; responsive (form stacks above Reach Us < 900px).

- [ ] **Step 4: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: build contact page with mailto form"
```

---

## Task 14: Favicon, cleanup, README

**Files:**
- Create: `public/favicon.svg`
- Delete: `index.html`, `pages/services.html`, `assets/css/brand.css`, `assets/css/main.css`, `assets/js/main.js` (deprecated)
- Move: `assets/images/*` → `public/` if still used; else leave
- Create: `README.md`

- [ ] **Step 1: Add `favicon.svg`** — gold "G" mark on navy (matches logo).

- [ ] **Step 2: Delete deprecated files** — confirm no Astro file references them, then remove. Keep `services-list.md` and `docs/`.

- [ ] **Step 3: Write `README.md`** — what the site is, `npm run dev` / `build`, where to edit facts (`src/data/site.ts`) and services (`src/data/services.ts`) and tokens (`src/styles/tokens.css`), deploy notes.

- [ ] **Step 4: Verify** — `npm run build` passes with no broken references.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add favicon, README, remove deprecated static files"
```

---

## Task 15: Deploy to Vercel

**Files:** none (platform config)

- [ ] **Step 1: Push** — `git push origin main`.

- [ ] **Step 2: Connect Vercel** — import the GitHub repo in Vercel (Astro auto-detected: build `astro build`, output `dist`). This is a user action via the Vercel dashboard, or `npx vercel` + `npx vercel --prod` if the user prefers CLI.

- [ ] **Step 3: Verify** — production URL loads; click through all 13 pages; mobile check; confirm placeholders render (no broken/empty fields).

- [ ] **Step 4: Note** — record the production URL; future `git push` to `main` auto-deploys.

---

## Self-Review

**Spec coverage:** Astro (T1) ✓ · tokens.css (T2) ✓ · site.ts centralization (T3) ✓ · services.ts 9 categories, F&A dropped (T4) ✓ · components Nav/Footer/CTA/cards (T5–T8) ✓ · Home/Services/About/Contact (T9,10,12,13) ✓ · data-driven category template → 9 (T11) ✓ · responsive (every page task, breakpoints in Global Constraints) ✓ · mailto form (T13) ✓ · placeholders centralized (T3, used in T7/T12/T13) ✓ · cleanup deprecated files (T14) ✓ · Vercel deploy from GitHub (T15) ✓ · no Co-Authored-By (Global Constraints) ✓.

**Placeholder scan:** The `'…'`/`whyUs: []` in Task 4 and section "build markup" directions are intentional build-time reads from the `.pen` (frames cited), explicitly required to be filled before commit — not plan placeholders. No "TBD/TODO" left as deliverables.

**Type consistency:** `Category` shape (slug, name, tagline, included[], whyUs[]) consistent across T4/T10/T11; `getCategory` defined T4, used T11; `site` fields consistent across T3/T7/T12/T13; `StatItem`/`ServiceCard`/`CTAStrip` props consistent T8↔T9/T10/T12.
