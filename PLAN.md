# Master Plan: The "Perfect" Portfolio Upgrade

This document serves as both the **Implementation Plan** and the **Design Presentation** for elevating your Next.js portfolio to the absolute highest tier of web experiences—matching and exceeding the polish of `akashsingh.in`.

## 1. The Presentation: Design System & UX Strategy

To achieve the "perfect" feel, we will focus on three core pillars of interaction design:

### A. The "Alive" Viewport (Micro-Interactions)
The user should feel that the website is reacting to their every move.
* **Custom Magnetic Cursor:** We will hide the default cursor and implement a custom framer-motion cursor. When hovering over buttons, it snaps (magnetizes) to them. When hovering over projects, it expands and says "VIEW".
* **Interactive Mascot/Element:** Similar to the tracking eyes on the reference site, we can implement an interactive 3D element (using `Three.js` which is in your stack) or a 2D SVG that tracks the mouse position.

### B. Cinematic Typography
Currently, your `<Reveal>` components fade elements in. We will upgrade this to true cinematic typography.
* **Split-Text Reveals:** We will build a custom `<TextReveal>` component that splits headers into individual characters or words, staggering their entrance smoothly from the bottom up, with a slight tilt (like movie credits).

### C. The "Zero-Jank" Flow
* **Scroll-Linked Parallax:** We will add subtle `y` axis parallax to background elements and project images so they move at a slightly different speed than the scroll bar.
* **Page/Section Transitions:** We will wrap your main content in an `<AnimatePresence>` router wrapper, so if we add multiple routes later, the current page slides out while the new one slides in—no hard cuts.

---

## 2. Implementation Plan

We will execute this in phases. 

#### Phase 1: The Custom Cursor & Typography (The Polish)
* **[NEW]** `components/CustomCursor.tsx`
  * A globally accessible cursor that listens to mouse coordinates and changes variants based on hovered elements.
* **[NEW]** `components/TextReveal.tsx`
  * A framer-motion component that splits strings into spans and uses `staggerChildren` to reveal them character-by-character.
* **[MODIFY]** `app/page.tsx`
  * Integrate the custom cursor.
  * Replace static `<h2>` tags in `SectionHeading` with `<TextReveal>`.

#### Phase 2: Advanced Section Animations (The Flow)
* **[MODIFY]** `app/page.tsx` & `components/MotionPrimitives.tsx`
  * Upgrade the `ProjectCard` to include a floating "View Website" overlay that follows the mouse *inside* the card bounds.
  * Add subtle parallax (`useTransform(scrollYProgress, [0,1], [0, 200])`) to the ambient background grids.

#### Phase 3: The Interactive Contact Experience (The Finish)
* **[NEW]** `components/ContactForm.tsx`
  * Extract the contact logic into a dedicated component.
  * Implement "Floating Labels" (labels that shrink and move up when the input is focused).
  * Add an animated "Submit" button that transitions through states (`Idle` -> `Sending` (with spinner) -> `Sent` (with checkmark)).

---

## 3. Design Decisions (Confirmed)
1. **Cursor:** A custom dot/circle cursor that completely replaces the default native mouse.
2. **Architecture:** One long continuous scrolling page (`page.tsx`).
3. **Interactive Element:** Keep it ultra-sleek and focused on high-end UI micro-interactions rather than a heavy mascot. Subtle software-engineering themed touches (like a fluid glow or code-like interactive trails).
