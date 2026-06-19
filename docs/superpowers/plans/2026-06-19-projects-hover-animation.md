# Projects Hover Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** On project-row hover, draw the title underline left-to-right and give the row a subtle ~3px upward popout, with reduced-motion support.

**Architecture:** Pure CSS changes in `src/css/main.css` only. The title underline becomes an absolutely-positioned `::after` line that animates `scaleX: 0→1`; the row lift is softened. No changes to `Projects.tsx` (markup hooks `.project-item` / `.project-title-link` already exist). No new dependencies.

**Tech Stack:** Plain CSS, Vite build, Prettier. No unit-test framework in this repo — verification is `npm run build`, `npm run format:check`, and a manual visual check in `npm run dev`.

**Spec:** `docs/superpowers/specs/2026-06-19-projects-hover-animation-design.md`

---

### Task 1: Title draw-line + softened popout

**Files:**
- Modify: `src/css/main.css:531-533` (`.project-item:hover` lift)
- Modify: `src/css/main.css:594-602` (`.project-title-link` + `:hover`)

- [ ] **Step 1: Soften the row lift**

Replace the `.project-item:hover` block at `src/css/main.css:531-533`:

```css
.project-item:hover {
  transform: translateY(-3px);
}
```

(Only the `-5px` → `-3px` value changes. No background-color is added.)

- [ ] **Step 2: Convert the title underline to an animated draw-line**

Replace the two blocks at `src/css/main.css:594-602` (`.project-title-link` and `.project-title-link:hover`) with:

```css
.project-title-link {
  color: #ffffff;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
}
.project-title-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.6);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.project-item:hover .project-title-link::after {
  transform: scaleX(1);
}
.project-title-link:hover {
  color: #cccccc;
}
```

Notes: the draw is triggered by **row** hover (`.project-item:hover .project-title-link::after`), matching the row-level lift. The old static `text-decoration: underline` is gone — the `::after` is now the underline.

- [ ] **Step 3: Build to verify CSS compiles**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 4: Format check**

Run: `npm run format:check`
Expected: PASS. If it fails, run `npm run format` and re-run `npm run format:check`.

- [ ] **Step 5: Visual check**

Run: `npm run dev`, open the projects section, hover a project row.
Expected: the title's underline draws left-to-right (~0.35s) and the row lifts ~3px. Moving the cursor off reverses both smoothly. No background wash appears.

- [ ] **Step 6: Commit**

```bash
git add src/css/main.css
git commit -m "feat: animate projects title underline draw and soften hover lift"
```

---

### Task 2: Resolve mobile-breakpoint overrides

**Files:**
- Modify: `src/css/main.css:821-824` (mobile `.project-title-link:hover`)
- Modify: `src/css/main.css:952-955` (mobile `.project-title-link:hover`)

The base draw-line is undone inside two media queries that re-declare `text-decoration: underline` on hover. Remove that static rule so it doesn't fight the base draw-line. (Hover doesn't fire on touch devices, so there is no visible behavior change — this only removes a conflicting rule.)

- [ ] **Step 1: Remove the static underline from the first mobile block**

In the block at `src/css/main.css:821` (`.project-title-link:hover` inside the first media query), delete the `text-decoration: underline;` line so the block reads:

```css
  .project-title-link:hover {
    color: #cccccc;
  }
```

- [ ] **Step 2: Remove the static underline from the second mobile block**

In the block at `src/css/main.css:952` (`.project-title-link:hover` inside the second media query), delete the `text-decoration: underline;` line so the block reads:

```css
  .project-title-link:hover {
    color: #cccccc;
  }
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Format check**

Run: `npm run format:check`
Expected: PASS (run `npm run format` first if needed).

- [ ] **Step 5: Commit**

```bash
git add src/css/main.css
git commit -m "fix: drop conflicting static underline in projects mobile breakpoints"
```

---

### Task 3: Reduced-motion support

**Files:**
- Modify: `src/css/main.css` (append a new `@media` block at end of file, after line 1049)

`main` has no `prefers-reduced-motion` handling. Add a minimal block scoped to this feature: disable the draw transition (line snaps to full width on hover) and disable the lift.

- [ ] **Step 1: Append the reduced-motion block**

At the end of `src/css/main.css`, append:

```css
@media (prefers-reduced-motion: reduce) {
  .project-title-link::after {
    transition: none;
  }
  .project-item:hover {
    transform: none;
  }
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Format check**

Run: `npm run format:check`
Expected: PASS (run `npm run format` first if needed).

- [ ] **Step 4: Visual check with reduced motion**

Enable the OS "Reduce motion" setting (macOS: System Settings → Accessibility → Display → Reduce motion), reload `npm run dev`, hover a project.
Expected: no row lift; the underline appears at full width without animating.

- [ ] **Step 5: Commit**

```bash
git add src/css/main.css
git commit -m "feat: respect reduced-motion for projects hover animation"
```

---

## Final Verification

- [ ] `npm run build` passes.
- [ ] `npm run format:check` passes.
- [ ] `npm run dev`: hovering each of the first three project rows draws the title line and lifts ~3px; after clicking "Show More Projects", newly revealed rows behave identically.
- [ ] Reduced-motion: no lift, underline non-animated.
