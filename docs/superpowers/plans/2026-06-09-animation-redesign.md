# Animation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's clunky hand-rolled animations with a refined motion system (instant typewriter hero, blur fade-up scroll reveals, editorial hovers) while keeping layout, content, and colors unchanged.

**Architecture:** Hybrid system — the `motion` library (Framer Motion successor) drives entrances and scroll reveals via shared variants in `src/motion.ts`; hover states stay pure CSS. One easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`) everywhere. `MotionConfig reducedMotion="user"` + a CSS media query provide reduced-motion support.

**Tech Stack:** React 18, TypeScript, Vite 5, `motion` (new dependency), plain CSS in `src/css/main.css`.

**Spec:** `docs/superpowers/specs/2026-06-09-animation-redesign-design.md`

**Note on verification:** This repo has no test framework, and the changes are visual. Each task is verified with `npm run build` (must compile) and a visual check in `npm run dev`. Do not introduce a test framework.

---

### Task 1: Install `motion` and create shared animation tokens

**Files:**
- Modify: `package.json` (via npm)
- Create: `src/motion.ts`

- [ ] **Step 1: Install the library**

```bash
npm install motion
```

Expected: `motion` appears in `package.json` dependencies (v12.x).

- [ ] **Step 2: Create `src/motion.ts`**

```ts
import type { Variants } from 'motion/react';

export const EASE_OUT_EXPO: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export const blurFadeUp: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const lineDraw: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

export const VIEWPORT_ONCE = {
  once: true,
  margin: '0px 0px -60px 0px',
} as const;
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: builds with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/motion.ts
git commit -m "chore: add motion library and shared animation tokens"
```

---

### Task 2: Wrap app in MotionConfig and refine nav easing

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/css/main.css` (`.navbar` rule, ~line 101)

- [ ] **Step 1: Wrap the app in `MotionConfig`**

In `src/App.tsx`, add the import and wrap the returned tree:

```tsx
import { MotionConfig } from 'motion/react';
```

Change the return statement to:

```tsx
return (
  <MotionConfig reducedMotion="user">
    <div className="App">
      <Navigation isVisible={isNavVisible} />
      <Hero />
      <About />
      <Experiences />
      <Projects />
      <Footer />
    </div>
  </MotionConfig>
);
```

Leave the scroll listener logic unchanged.

- [ ] **Step 2: Update navbar transition in `src/css/main.css`**

In the `.navbar` rule, replace:

```css
  transition:
    all 0.3s ease,
    transform 0.3s ease;
```

with:

```css
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.3s ease;
```

- [ ] **Step 3: Verify**

Run: `npm run build` → passes.
Run: `npm run dev`, scroll down/up → navbar hides and shows with a smoother glide.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/css/main.css
git commit -m "feat: add MotionConfig and refine navbar easing"
```

---

### Task 3: Create `Reveal` component and migrate About

**Files:**
- Create: `src/components/Reveal.tsx`
- Modify: `src/components/About.tsx` (full rewrite, removes IntersectionObserver)

- [ ] **Step 1: Create `src/components/Reveal.tsx`**

```tsx
import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { blurFadeUp, VIEWPORT_ONCE } from '../motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Reveal = ({ children, className, delay = 0 }: RevealProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT_ONCE}
    variants={blurFadeUp}
    custom={delay}
  >
    {children}
  </motion.div>
);

export default Reveal;
```

- [ ] **Step 2: Rewrite `src/components/About.tsx`**

Replace the entire file (the `useEffect`/`useRef`/IntersectionObserver code is deleted; content is unchanged):

```tsx
import Reveal from './Reveal';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-heading">about.</h2>
        <Reveal className="about-content">
          <p className="subheading">
            I study computer science at the University of Pennsylvania School of
            Engineering and Applied Science.
          </p>
          <p>
            I have a <strong>strong engineering background</strong> and enjoy
            chasing <strong>hard problems</strong>. I've led multiple projects
            and have a strong grasp of the full software development lifecycle.
          </p>
          <p>
            In college, I <span className="underline">push myself</span> across
            diverse areas of computer science, including distributed systems,
            machine learning, and systems programming.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
```

- [ ] **Step 3: Verify**

Run: `npm run build` → passes.
Run: `npm run dev`, scroll to About → content rises ~14px while sharpening from blur, once, no flicker on re-scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/Reveal.tsx src/components/About.tsx
git commit -m "feat: add Reveal component and migrate About to blur fade-up"
```

---

### Task 4: Rewrite the Hero entrance

**Files:**
- Modify: `src/components/Hero.tsx` (full rewrite of animation logic; JSX structure and content unchanged)
- Modify: `src/css/main.css` (hero rules, ~lines 184–341)

- [ ] **Step 1: Rewrite `src/components/Hero.tsx`**

Replace the entire file:

```tsx
import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import headshotImage from '../assets/headshot.png';
import { blurFadeUp } from '../motion';

interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

const LINE1 = 'Hey,';
const LINE2 = "I'm ";
const NAME = 'Nathan';
const TYPING_SPEED_MS = 55;

type TypingPhase = 'line1' | 'line2' | 'name' | 'done';

const Hero = () => {
  const [line1, setLine1] = useState<string>('');
  const [line2, setLine2] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phase, setPhase] = useState<TypingPhase>('line1');
  const prefersReducedMotion = useReducedMotion();

  const socialLinks: SocialLink[] = [
    {
      href: 'https://linkedin.com/in/nathanaronson',
      icon: 'fab fa-linkedin-in',
      label: 'LinkedIn',
    },
    {
      href: 'https://github.com/nathanaronson',
      icon: 'fab fa-github',
      label: 'GitHub',
    },
    {
      href: 'mailto:narons@seas.upenn.edu',
      icon: 'fas fa-envelope',
      label: 'Email',
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion) {
      setLine1(LINE1);
      setLine2(LINE2);
      setName(NAME);
      setPhase('done');
      return;
    }

    let cancelled = false;

    const type = (
      text: string,
      setText: (value: string) => void
    ): Promise<void> =>
      new Promise(resolve => {
        let i = 0;
        const timer = setInterval(() => {
          if (cancelled) {
            clearInterval(timer);
            return;
          }
          i++;
          setText(text.substring(0, i));
          if (i >= text.length) {
            clearInterval(timer);
            resolve();
          }
        }, TYPING_SPEED_MS);
      });

    const run = async (): Promise<void> => {
      await type(LINE1, setLine1);
      if (cancelled) return;
      setPhase('line2');
      await type(LINE2, setLine2);
      if (cancelled) return;
      setPhase('name');
      await type(NAME, setName);
      if (cancelled) return;
      setTimeout(() => {
        if (!cancelled) setPhase('done');
      }, 600);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [prefersReducedMotion]);

  const scrollToAbout = (): void => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <motion.div
              className="profile-image"
              initial="hidden"
              animate="visible"
              variants={blurFadeUp}
              custom={0.1}
            >
              <img src={headshotImage} alt="Nathan Aronson" />
            </motion.div>
          </div>

          <div className="hero-right">
            <div className="greeting">
              <h1>
                {line1}
                {phase === 'line1' && <span className="cursor">|</span>}
              </h1>
              <h2>
                {line2}
                <span className="gradient-text">{name}</span>
                {(phase === 'line2' || phase === 'name') && (
                  <span className="cursor">|</span>
                )}
              </h2>
            </div>

            <motion.div
              className="social-icons"
              initial="hidden"
              animate="visible"
              variants={blurFadeUp}
              custom={0.25}
            >
              {socialLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </motion.div>

            <motion.div
              className="scroll-indicator"
              onClick={scrollToAbout}
              initial="hidden"
              animate="visible"
              variants={blurFadeUp}
              custom={0.4}
            >
              <i className="fas fa-chevron-down"></i>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

Key behavior: typing starts immediately on mount (cursor blinks on the empty `h1` from the first frame); `"Hey,I'm Nathan"` finishes in ~0.8s; the cursor disappears 600ms after typing completes; photo/icons/indicator animate in parallel rather than waiting.

- [ ] **Step 2: Update hero CSS in `src/css/main.css`**

Make these exact edits:

In `.profile-image`, delete these three lines (Motion owns the entrance now):

```css
  opacity: 0;
  transform: translateX(-100px);
  animation: slideInLeft 1.2s ease forwards 2.25s;
```

Delete the whole `@keyframes slideInLeft { ... }` block.

In `.greeting h1`, delete these two lines:

```css
  opacity: 0;
  animation: fadeIn 1s ease forwards 0.3s;
```

(Keep the `@keyframes fadeIn` block for now — `.projects-toggle` still uses it until Task 6.)

Delete this whole rule (the `typing-complete` class no longer exists):

```css
.greeting h1.typing-complete::after,
.greeting h2.typing-complete::after {
  display: none;
}
```

In `.social-icons`, delete these three lines:

```css
  opacity: 0;
  transform: translateX(100px);
  animation: slideInRight 1.2s ease forwards 2.4s;
```

Delete the whole `@keyframes slideInRight { ... }` block.

In `.social-icon`, replace `transition: all 0.3s ease;` with:

```css
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
```

Replace the `.social-icon:hover` rule with (no more lift/scale):

```css
.social-icon:hover {
  background-color: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.35);
}
```

In `.scroll-indicator`, delete these two lines:

```css
  opacity: 0;
  animation: fadeIn 1s ease forwards 2.1s;
```

In `.scroll-indicator i`, change the animation to `animation: bounce 2.4s ease-in-out infinite;` and replace the whole `@keyframes bounce` block with:

```css
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
```

- [ ] **Step 3: Verify**

Run: `npm run build` → passes.
Run: `npm run dev` → on load: cursor appears instantly, typing finishes in under a second, photo/icons/scroll-indicator blur-fade in during the first half-second, gradient on "Nathan" intact, gentle slow bounce on the chevron. Social icon hover only brightens (no lift).

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/css/main.css
git commit -m "feat: refine hero with instant typewriter and parallel fades"
```

---

### Task 5: Choreograph the Experiences timeline

**Files:**
- Modify: `src/components/Experiences.tsx` (delete IntersectionObserver `useEffect` + `useRef`, convert to Motion variant tree, add a real line element)
- Modify: `src/css/main.css` (experiences rules, ~lines 387–460, plus media-query line rules)

- [ ] **Step 1: Update `src/components/Experiences.tsx`**

Change the imports at the top — remove `useEffect`/`useRef`, add Motion:

```tsx
import { motion } from 'motion/react';
import {
  blurFadeUp,
  lineDraw,
  staggerContainer,
  VIEWPORT_ONCE,
} from '../motion';
```

(Keep all the image imports and the `Experience` interface and `experiencesData` array exactly as they are.)

Delete the entire `useEffect(() => { ... }, []);` block (lines 130–192 in the current file) and the `const experiencesRef = useRef<HTMLDivElement>(null);` line.

Replace the returned JSX's container portion. The outer `<section>`, heading, and subheading stay identical. Change:

```tsx
<div className="experiences-container" ref={experiencesRef}>
  {experiencesData.map(item => (
    <div key={item.id} className="experiences-item">
```

to:

```tsx
<motion.div
  className="experiences-container"
  initial="hidden"
  whileInView="visible"
  viewport={VIEWPORT_ONCE}
  variants={staggerContainer}
>
  <motion.div className="experiences-line" variants={lineDraw} />
  {experiencesData.map(item => (
    <motion.div
      key={item.id}
      className="experiences-item"
      variants={blurFadeUp}
    >
```

and close with `</motion.div>` for both the item and the container. Everything inside each item (`experiences-icon`, `experiences-content`, the skills/items markup) is unchanged.

- [ ] **Step 2: Update experiences CSS in `src/css/main.css`**

Replace the `::before` timeline line with a real-element rule. Delete both of these rules:

```css
.experiences-container::before {
  content: '';
  position: absolute;
  left: 0;
  top: 3rem;
  bottom: 12rem;
  width: 2px;
  background-color: rgba(255, 255, 255, 0.1);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 1s ease;
}
.experiences-container.animate-line::before {
  transform: scaleY(1);
}
```

and add in their place:

```css
.experiences-line {
  position: absolute;
  left: 0;
  top: 3rem;
  bottom: 12rem;
  width: 2px;
  background-color: rgba(255, 255, 255, 0.1);
  transform-origin: top;
}
```

Replace the `.experiences-item` rule with (Motion owns the entrance; CSS owns the hover wash):

```css
.experiences-item {
  position: relative;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}
.experiences-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
```

Delete these dead rules:

```css
.experiences-item:nth-child(odd) {
  animation: none;
}
.experiences-item:nth-child(even) {
  animation: none;
}
```

In `.experiences-icon`, delete the hidden-state lines:

```css
  opacity: 0;
  transform: scale(0.8);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
```

Delete the rule:

```css
.experiences-item.animate-icon .experiences-icon {
  opacity: 1;
  transform: scale(1);
}
```

Replace the `.experiences-content` rule's animation properties — delete:

```css
  opacity: 0;
  transform: translateX(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease,
    all 0.3s ease;
```

and add in its place:

```css
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
```

Delete these three rules:

```css
.experiences-item.animate-content .experiences-content {
  opacity: 1;
  transform: translateX(0);
}
.experiences-item:hover .experiences-content {
  transform: translateX(0);
}
.experiences-item:hover .experiences-icon {
  transform: scale(1);
}
```

and add the editorial nudge:

```css
.experiences-item:hover .experiences-content {
  transform: translateX(6px);
}
```

In the `@media (max-width: 768px)` block, change the selector `.experiences-container::before` to `.experiences-line` (keep its properties: `left: calc(45px - 1px); top: 1.5rem; bottom: 12rem; width: 2px;`).

In the `@media (max-width: 480px)` block, change the selector `.experiences-container::before` to `.experiences-line` (keep its properties: `left: calc(40px - 1px); top: 1.5rem; bottom: 12rem;`).

- [ ] **Step 3: Verify**

Run: `npm run build` → passes.
Run: `npm run dev`, scroll to Experiences → the line draws downward while items cascade in with blur fade-up, 80ms apart, as one choreographed unit. Hovering a row washes the background and nudges the content right 6px. Check the line position at mobile width (devtools responsive mode).

- [ ] **Step 4: Commit**

```bash
git add src/components/Experiences.tsx src/css/main.css
git commit -m "feat: choreograph experiences timeline with motion variants"
```

---

### Task 6: Migrate Projects to Motion reveals and editorial hovers

**Files:**
- Modify: `src/components/Projects.tsx` (delete IntersectionObserver-style `useEffect`, `useRef`, `isAnimating`; convert items to Motion)
- Modify: `src/css/main.css` (project rules, ~lines 519–643, plus duplicated `.project-title-link` rules in media queries)

- [ ] **Step 1: Update `src/components/Projects.tsx`**

Change the first import line from:

```tsx
import { useEffect, useRef, useState } from 'react';
```

to:

```tsx
import { useState } from 'react';
import { motion } from 'motion/react';
import { blurFadeUp, VIEWPORT_ONCE } from '../motion';
```

(Keep the `ProjectItem` interface and the entire `projectsData` array unchanged.)

Inside the component, delete these lines:

```tsx
const projectsRef = useRef<HTMLDivElement>(null);
const [isAnimating, setIsAnimating] = useState<boolean>(false);
```

Replace `handleShowMore` with:

```tsx
const handleShowMore = (): void => {
  setHasShownMore(true);
};
```

Delete the entire `useEffect(() => { ... }, [hasShownMore]);` block (the one that sets inline opacity/transform styles).

In the JSX, change `<div className="projects-list" ref={projectsRef}>` to `<div className="projects-list">`, and change each item from:

```tsx
{displayedProjects.map(project => (
  <div key={project.id} className="project-item">
```

to:

```tsx
{displayedProjects.map((project, index) => (
  <motion.div
    key={project.id}
    className="project-item"
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT_ONCE}
    variants={blurFadeUp}
    custom={index < initialProjectsCount ? index * 0.08 : 0}
  >
```

closing with `</motion.div>`. The inner markup (icon, content, title link, lists) is unchanged. The `custom` prop gives the first three items a small cascade; items revealed by "Show More" animate individually as they scroll into view with no extra delay.

On the Show More button, remove the `disabled={isAnimating}` prop:

```tsx
<button className="show-more-btn" onClick={handleShowMore}>
  <span>Show More Projects</span>
  <i className="fas fa-chevron-down"></i>
</button>
```

- [ ] **Step 2: Update projects CSS in `src/css/main.css`**

Replace the `.project-item` rule (currently has duplicate `transition` declarations and hidden-state styles) with:

```css
.project-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}
.project-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
```

Delete the rules:

```css
.project-item:hover {
  transform: translateY(-5px);
}
.project-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}
```

In `.project-content`, add the nudge transition — replace:

```css
.project-content {
  flex: 1;
}
```

with:

```css
.project-content {
  flex: 1;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.project-item:hover .project-content {
  transform: translateX(6px);
}
```

Replace the `.project-title-link` rules with an underline-draw:

```css
.project-title-link {
  color: #ffffff;
  text-decoration: none;
  position: relative;
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
```

Also delete the duplicated `.project-title-link { ... }` and `.project-title-link:hover { ... }` rules inside **both** the `@media (max-width: 768px)` and `@media (max-width: 480px)` blocks (they would reintroduce the old text-decoration underline).

In `.projects-toggle`, delete these two lines:

```css
  opacity: 0;
  animation: fadeIn 0.8s ease forwards 1s;
```

In `.show-more-btn:hover`, delete these two lines (wash only, no lift):

```css
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
```

Delete the now-unused rule:

```css
.show-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
```

Now that nothing uses it, delete the `@keyframes fadeIn { ... }` block.

- [ ] **Step 3: Verify**

Run: `npm run build` → passes.
Run: `npm run dev`, scroll to Projects → first three items cascade in with blur fade-up; hovering washes the row, nudges content, and draws an underline across the title. Click "Show More Projects" → button disappears, additional projects blur-fade in as you scroll down to them. Check at mobile width.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.tsx src/css/main.css
git commit -m "feat: migrate projects to motion reveals and editorial hovers"
```

---

### Task 7: Reduced-motion CSS and final sweep

**Files:**
- Modify: `src/css/main.css` (append media query; verify no orphans)

- [ ] **Step 1: Append a reduced-motion media query at the end of `src/css/main.css`**

```css
/* REDUCED MOTION */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .scroll-indicator i {
    animation: none;
  }
  .cursor {
    animation: none;
  }
}
```

(Motion-driven animations are already handled by `MotionConfig reducedMotion="user"`; this covers the remaining CSS animations.)

- [ ] **Step 2: Sweep for orphans**

Run: `grep -n "slideInLeft\|slideInRight\|fadeIn\|animate-line\|animate-icon\|animate-content\|animate-in\|typing-complete\|isAnimating" src/css/main.css src/components/*.tsx src/App.tsx`
Expected: no matches. If any remain, delete them per Tasks 4–6.

- [ ] **Step 3: Format and verify**

```bash
npm run format
npm run build
```

Expected: both succeed.

- [ ] **Step 4: Commit**

```bash
git add -A src
git commit -m "feat: add reduced-motion support and clean up dead animation code"
```

---

### Task 8: End-to-end visual verification

**Files:** none (verification only)

- [ ] **Step 1: Full walkthrough**

Run: `npm run dev` and check, top to bottom:

1. **Load:** cursor blinks instantly, typing completes in ~1s, photo/icons/chevron blur-fade in parallel within ~0.9s. No element waits 2+ seconds.
2. **Nav:** scroll down → navbar glides up and away; scroll up → glides back.
3. **About:** content blur-fades up once when scrolled to.
4. **Experiences:** line draws while items cascade; row hover = wash + 6px nudge.
5. **Projects:** first three cascade; hover = wash + nudge + underline draw; Show More reveals the rest with blur fade-up as scrolled to.
6. **Footer:** link color transitions still work.
7. **Mobile (devtools, 480px/768px):** hamburger menu opens/closes; timeline line is positioned correctly; hero stacks correctly.
8. **Reduced motion:** enable "Reduce motion" in macOS System Settings → Accessibility → Display, reload → text appears without typing animation, reveals are simple fades, no bounce.

- [ ] **Step 2: Production build check**

```bash
npm run build && npm run preview
```

Expected: build succeeds; preview at the printed URL renders identically to dev.

- [ ] **Step 3: Final commit (if any fixes were needed)**

```bash
git add -A src
git commit -m "fix: polish animation details from visual verification"
```

Skip this commit if Step 1 and 2 surfaced nothing.
