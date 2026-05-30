# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun install` (or `npm install`) — install deps. The repo has both `bun.lock` and `package-lock.json`; `bun.lock` is the more recently updated, so prefer bun.
- `bun run dev` — start Vite dev server with HMR.
- `bun run build` — type-check (`tsc -b`) then produce a production bundle in `dist/`. The build will fail on any TS error, so run this to validate type changes.
- `bun run lint` — run ESLint over the repo (config in `eslint.config.js`, flat config with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`).
- `bun run preview` — serve the built `dist/` for a final smoke test.

There is no test runner configured — do not invent one. If you need to verify a UI change, run `dev` and exercise it in the browser.

## Architecture

This is a **single-page portfolio site**, not a multi-route app, even though `react-router` is a dependency. `App.tsx` simply mounts `RootLayout` wrapping `<Home />`; routing is *not* wired up. Navigation between "pages" is actually intra-page anchor scrolling.

### Page composition

`src/pages/Home.tsx` is the master page. It hard-codes the Experience data array and then renders each of the other "page" components (`About`, `Education`, `Projects`, `Contact`) as `<section id="...">` blocks inside one long scrollable column. The `Navbar` (`src/components/Navbar.tsx`) implements scrollspy by reading `document.getElementById(...)` and `offsetTop` against the section IDs (`home`, `experience`, `about`, `education`, `projects`, `contact`). **When adding a new "page," add the section ID to the `links` array in `Navbar.tsx` and render a matching `<section id="...">` in `Home.tsx` — otherwise scrollspy and nav clicks will silently miss it.**

### Smooth scrolling

`RootLayout.tsx` instantiates a single `Lenis` instance on mount and stashes it on `window.lenis`. `Navbar.handleScroll` reads `window.lenis` to do programmatic anchor scrolls with `offset: -80` (to clear the fixed navbar). Any new component that needs to scroll-to-anchor should reuse `window.lenis` rather than calling native `scrollTo` — native scrolling fights with Lenis's RAF loop.

### Loading gate

`RootLayout` renders `<LoadingScreen>` first; the real layout (`Navbar`, `<main>`, `Footer`) only mounts once `LoadingScreen` calls `onComplete`. This means `useEffect`s and IDs in page components do not exist until loading finishes — anything that queries the DOM on first paint needs to account for that.

### Animations & layout transitions

Motion uses `framer-motion` heavily. The Experience cards in `Home.tsx` use Framer's `layoutId` system to morph a card into a modal overlay: every `motion.*` element inside a card has a `layoutId={`exp-${index}-...`}` and the modal re-uses the same IDs. **If you rename or restructure these IDs, do so symmetrically in both the card and the modal, or the FLIP animation breaks.**

### Styling

Tailwind v4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — config lives in `src/index.css` under `@theme { ... }`). Brand colors are CSS variables (`--color-brand-primary`, `--color-bg-page`, etc.) and there are custom utility classes defined in `@layer utilities` in `index.css`: `glass-panel`, `saas-card`, `btn-primary`, `badge-blue`. Prefer these over re-deriving the same styles inline.

### Imports

Path aliases are **not** configured — use relative imports (`../components/...`). Images under `src/assets/` are imported as ES modules; images under `public/` are referenced by absolute URL (`/assets/...`). The experience card `logo` fields currently point to `/assets/logo-placeholder.png` which does not exist in `public/` — broken images are expected in that slider until real logos are added.
