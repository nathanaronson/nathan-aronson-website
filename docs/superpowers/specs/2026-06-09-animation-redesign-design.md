# Animation Redesign — Design Spec

**Date:** 2026-06-09
**Status:** Approved

## Problem

The site's animations feel clunky: long fixed delays (hero image waits 2.25s), default `ease` curves everywhere, mechanical 200ms staggers driven by hand-rolled IntersectionObserver code with inline styles, and no reduced-motion support. The minimalist dark aesthetic is good and stays.

## Goal

Same layout, same content, same dark minimalist palette (`#181818` background, white/gray text). All-new motion system with a **subtle & refined** feel: fast, understated, consistent easing.

## Decisions (validated with visual mockups)

| Question | Decision |
|---|---|
| Motion feel | Subtle & refined |
| Stack | Keep React 18 + Vite, add `motion` library (Framer Motion successor) |
| Scope | Same layout, new polish — no layout/color/content changes |
| Hero entrance | Refined typewriter: starts instantly, ~55ms/char, photo + icons fade in parallel |
| Scroll reveals | Blur fade-up: rise ~14px while sharpening from 6px blur |
| Hovers | Editorial wash: background brighten + 6px content nudge + underline draw |

## Architecture

**Hybrid animation system:** the `motion` library handles entrances and scroll reveals (orchestration, viewport detection, reduced-motion); hover states stay pure CSS (instant, no JS overhead).

- `src/motion.ts` — shared tokens: one easing curve `cubic-bezier(0.22, 1, 0.36, 1)` used everywhere, `blurFadeUp` / `staggerContainer` / `lineDraw` variants, shared viewport config (`once: true`).
- `src/components/Reveal.tsx` — wrapper component (`whileInView` + `blurFadeUp`) replacing all four hand-rolled IntersectionObserver implementations.
- `<MotionConfig reducedMotion="user">` wraps the app; the Hero typewriter checks `useReducedMotion`; a `prefers-reduced-motion` CSS media query covers remaining CSS animations.

## Per-section behavior

**Hero:** Typing starts immediately on load (no 2.25s dead air), ~55ms/char, keeps the blinking cursor and grayscale gradient on "Nathan". Photo, social icons, and scroll indicator blur-fade in parallel with delays of 0.1s / 0.25s / 0.4s. Scroll indicator gets a gentler, slower bounce (−6px, 2.4s, ease-in-out).

**Scroll reveals (About / Experiences / Projects):** opacity 0→1, y 14→0, blur 6px→0, 0.5s, shared easing, triggered once slightly before entering the viewport. Experiences uses one variant tree: container staggers children 80ms apart while the timeline line (now a real `div`, not a `::before`) draws in with `scaleY`. Projects items reveal per-item; the first three get an 80ms cascade. Newly shown projects (after "Show More") reveal the same way as they scroll into view.

**Hovers:** Project and experience rows: background washes to `rgba(255,255,255,0.05)`, content nudges right 6px, underline draws left-to-right across project titles. No more card lifting. Circular social icons: background/border brighten only. Show More button: wash treatment, keeps chevron nudge, loses lift + shadow.

**Navigation:** Keep hide-on-scroll-down behavior; transition becomes `transform 0.45s` with the shared easing curve.

**Cleanup:** Delete `slideInLeft`, `slideInRight`, `fadeIn` keyframes, all per-component IntersectionObserver code, inline-style animation hacks, and the `animate-*` CSS classes.

## Out of scope

Layout changes, color changes, content changes, new sections, framework switch, test framework introduction.

## Verification

`npm run build` passes; `npm run format:check` passes; visual walkthrough of every section via `npm run dev`; reduced-motion check via system setting; mobile hamburger menu still works.
