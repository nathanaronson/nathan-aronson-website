# Projects Hover Animation — Design Spec

**Date:** 2026-06-19
**Status:** Approved
**Branch:** `projects-hover-animation` (off `main`)

## Problem

On `main`, hovering a project row produces two abrupt effects: the whole row jumps up 5px (`translateY(-5px)`), and the title gets a static `text-decoration: underline` plus a color shift that snap on instantly. There's no motion to the underline — it just appears.

The `animation-redesign` branch already proved out a nicer treatment (a title underline that *draws* left-to-right). This spec ports that hover feel back onto `main` as a small, self-contained change, without pulling in the rest of that branch's redesign (no `motion` library, no scroll-reveal changes).

## Goal

When the user hovers a project, the title's underline **draws in left-to-right** and the row gives a **subtle upward popout** (~3px lift). Same layout, same content, same dark palette. Pure CSS — no new dependencies, no component/markup changes.

## Decisions (confirmed with user)

| Question | Decision |
|---|---|
| Underline | Animated left-to-right draw via `::after` pseudo-element (replaces static `text-decoration: underline`) |
| Popout | Subtle vertical lift, `translateY(-3px)` (reduced from main's `-5px`) |
| Background wash | **Not** included — keep it clean |
| Scroll reveals | Unchanged from `main` |
| Stack | Pure CSS only; no `motion` library |

## Implementation

All changes are in `src/css/main.css`. **No changes to `Projects.tsx`** — the markup already has `.project-item` and `.project-title-link` hooks.

### 1. Title draw-line

Replace the current static-underline hover on `.project-title-link`:

- `.project-title-link` gains `position: relative` and keeps `color: #ffffff` with no underline.
- Add `.project-title-link::after`: an absolutely-positioned 1px line at the bottom of the link, full width, `transform: scaleX(0)` with `transform-origin: left`, transitioning `transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)`.
- On `.project-item:hover .project-title-link::after` (row-level hover, matching current behavior where hovering anywhere on the row triggers the effect), set `transform: scaleX(1)`.
- Keep a gentle color lift to `#cccccc` on hover for consistency with the rest of the row; drop the old `text-decoration: underline`.

Line color: `rgba(255, 255, 255, 0.6)` (matches the proven value from `animation-redesign`).

### 2. Row popout

- `.project-item:hover` changes from `transform: translateY(-5px)` to `transform: translateY(-3px)`.
- No background-color change.

### 3. Mobile overrides

Two media-query blocks currently re-declare `.project-title-link:hover { text-decoration: underline }`. Remove the static `text-decoration: underline` from those so they don't fight the base draw-line. Hover doesn't fire on touch devices, so no visible regression; this just prevents conflicting rules.

### 4. Reduced motion

`main` has no `prefers-reduced-motion` block today. Add a minimal one covering this feature only: inside `@media (prefers-reduced-motion: reduce)`, set `.project-title-link::after { transition: none }` and `.project-item:hover { transform: none }`. Hovering still shows the line (it snaps to full width) and no lift occurs.

## Out of scope

- The `motion` library migration and scroll-reveal rework from `animation-redesign`.
- Experiences/hero/about/nav animations.
- Background wash on project rows.
- Any layout, color-palette, or content change.

## Verification

- `npm run build` passes.
- `npm run format:check` passes (or `npm run format` applied).
- `npm run dev` visual check: hovering a project draws the title line left-to-right and lifts the row ~3px; moving off reverses smoothly; works on the first three rows and on rows revealed via "Show More".
- Reduced-motion check via system setting: no lift, underline appears without animating.
