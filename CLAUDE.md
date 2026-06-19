# CLAUDE.md

Project-specific guidance for Claude Code. The user's global `~/.claude/CLAUDE.md` also applies; this file adds what's specific to this repo.

## What this is

Nathan Aronson's personal portfolio website — a single-page React app. Live at <https://www.seas.upenn.edu/~narons/>. Static build, no backend.

## Stack

- **React 18** + **TypeScript 5**, built with **Vite 5**
- Plain **CSS3** — all styles live in one file, `src/css/main.css` (no CSS modules, no Tailwind, no CSS-in-JS)
- **Font Awesome** (icons) and **Google Fonts**, loaded via `index.html`
- **Prettier** for formatting, **ESLint** (flat config, `eslint.config.js`) for linting. No test framework.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — ESLint across the repo
- `npm run format` — Prettier write across `src/**`
- `npm run format:check` — Prettier check (CI-enforced)

## Verification gate (run before committing)

There is no test suite. CI (`.github/workflows/`) gates every push/PR on these four — run all four locally before committing:

```bash
npm run build              # must succeed
npm run format:check       # must pass (run `npm run format` to fix)
npx tsc --noEmit           # type check — must pass
npm run lint -- --max-warnings 0   # ESLint — must pass with zero warnings
```

`npx tsc --noEmit` is easy to forget because `vite build` can succeed while types are wrong. Don't skip it.

## Structure

- `src/main.tsx` — entry; mounts `<App>`
- `src/App.tsx` — composes the page top-to-bottom: `Navigation → Hero → About → Experiences → Projects → Footer`. Also owns the hide-nav-on-scroll-down logic.
- `src/components/` — one file per section. Each section's **content data lives inline** in the component (e.g. `projectsData` / `experiencesData` arrays). To edit copy, edit the array in the relevant component.
- `src/css/main.css` — every style for the whole site, organized by section with `/* SECTION */` comment banners and `@media` breakpoints near the bottom.
- `src/assets/` — images (logos, headshot). `public/` and `index.html` hold static/meta assets.

## Conventions

- **Match the existing style.** Explicit TypeScript types are used throughout (e.g. `function App(): JSX.Element`, typed `useState<boolean>`). Keep that.
- **Styling is class-based in `main.css`.** Add a class and style it there; don't introduce inline styles or a new styling system. When adding responsive rules, mirror the existing breakpoints already in the file.
- **Design language:** dark minimalist — `#181818` background, white/gray text. Section headings are lowercase with a trailing period (`projects.`, `experiences.`). Keep new UI consistent with this.
- **Animations:** prefer pure CSS for hover/transition effects (e.g. the project title underline draws via a `::after` `scaleX` transition). Add a `prefers-reduced-motion: reduce` rule for any new motion. Note: scroll-reveal animations on `main` use hand-rolled `IntersectionObserver`; a separate `animation-redesign` branch explores migrating these to the `motion` library but is **not merged** — don't assume `motion` is available on `main`.

## Deployment

`npm run build`, then deploy the `dist/` folder to a static host. No CI deploy step — it's manual.
