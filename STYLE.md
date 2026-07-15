# Mariana's Style Bible

Reference study, then an original translation. We borrow the *craft* of
Lusion / Active Theory / Resn, not their aesthetics. A taqueria has no business
looking like a WebGL studio, but it can be made with the same confidence.

## What the references actually teach

**Lusion**: restraint and easing. Motion is slow-in / slow-out, nothing snaps
harshly, everything feels weighted. Huge type, enormous negative space, one idea
per screen. Hovers are small and physical (magnetism, scale, mask).

**Active Theory**: confidence and pacing. Big editorial type, strong art
direction, sections that hand off to each other instead of stacking. Content
enters with directional reveals (wipes/masks), not fades. Bold color used
sparingly and decisively.

**Resn**: tactile micro-detail. Small satisfying state changes, playful but
controlled. Borrow only the *delight of a single good interaction*, never
chaos.

## The Mariana's translation

**Metaphor: the order ticket + the griddle.** Everything hangs off two real
materials from the shop: the printed paper order ticket (monospace numerals,
index tags, hairline rules, dashed perforations) and the griddle (warm char,
salsa red, lime, cilantro, crema, masa ivory). This gives one cohesive system
that reads local and hand-made, not corporate.

- **Mood**: hungry, warm, tactile, fast, confident. Not cold, not "cinematic
  dark everywhere." Light masa/crema is the base; char is used as punctuation.
- **Type**: Bricolage Grotesque (display), Inter (body), JetBrains Mono for the
  "ticket" layer: indices, prices, step counts, small labels. The mono is the
  thread that ties the restaurant theme through every section.
- **Section system, not section template**: each section is a *page of one
  menu*. A mono index tag (`01 / CRAVING`) + a hairline rule sits above each,
  so the sections feel related but the composition below varies (alignment,
  scale, image role) so it never reads as six identical eyebrow+headline blocks.
- **Negative space**: generous. One hero image or one idea per screen. Let the
  food be the material; stop wrapping every photo in a bordered card.
- **Scroll pacing**: unhurried on desktop (pinned Layer-by-layer stays), quick
  and practical on mobile. Reveals are *directional wipes* (a squeegee / salsa
  spread), not fades.
- **Motion principles** (every motion must mean something):
  - reveal = "served": clip-path wipe from one edge.
  - salsa stage = a salsa-red wipe sweeps in.
  - category switch = active tag slides, items snap in staggered.
  - card hover = image breathes in, label lifts, arrow slides.
  - buttons = physical press (`active:scale`), arrow travel, fill on hover.
  - griddle = a faint heat shimmer at the char edge only. Never a glow blob.
- **Hover / focus**: one consistent focus-visible ring (salsa on light, lime on
  char). Text links draw an underline. Chips press. No hover-lift everywhere.
- **Texture**: a low paper grain unifies the light sections. Readability first.
- **Transitions between sections**: a shared hairline / perforation motif and
  reveal-on-enter carry the eye across the color changes so sections connect.
- **Mobile**: swipe-native. Layer-by-layer is an image carousel with snap and a
  live progress dot. The bottom bar stays. No long dead-scroll.

## Hard nos (house rules)

No stock gradients / glow blobs / particles / glassmorphism. No repeated
three-card rows. No nested cards. No em dashes. Not all-dark. Don't overuse
pills / shadows / hover-lift. No WebGL unless it truly helps. Respect
prefers-reduced-motion and keyboard focus.
