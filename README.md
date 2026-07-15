# Mariana's Taco Shop: Cinematic Photo Redesign

A premium, photo-editorial experience for **Mariana's Taco Shop** (8981 5th St,
Frisco, TX). Full-bleed real food photography, a 2.5D coverflow "pick your
plate" selector, a cinematic macro-crop "Build the Bite" scroll scene, and
image-first favorites, all driven by GSAP + Lenis scroll motion.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** (warm palette: tortilla ivory, charred black, salsa red, cilantro, lime, steel)
- **GSAP + ScrollTrigger** + **@gsap/react** (`useGSAP`) for scrubbed timelines, parallax, and masked reveals
- **Lenis** smooth scroll wired into the GSAP ticker
- **next/image** for optimized real photography
- **lucide-react** icons

## Real photography

All food images and the logo are the restaurant's own, downloaded from the live
site into `public/images/marianas-original/`:

```
logo.png                  transparent wordmark
food-tacos-grilled.jpg    grilled street tacos plate  (hero + final CTA)
food-tacos-carnitas.jpg   carnitas street tacos       (Build the Bite macro pan)
food-tacos-crispy.jpg     crispy beef tacos           (story panel)
food-enchiladas.jpg       enchilada plate             (story panel)
```

These four plates are the only genuine photos the business publishes, so the
whole visual system is built around them (no invented food, no fake 3D, no CSS
blobs). `lib/images.ts` is the single manifest. Drop more real photos in the
folder and extend it. Search `TODO` for where richer photography would slot in
(burritos, quesadillas, storefront).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
# production:
npm run build && npm run start
# GitHub Pages:
npm run build:pages
```

Quality gates: `npm run lint`, `npm run typecheck`, `npm run build`.

QA screenshots (server running on BASE port):

```bash
node scripts/shots.mjs      # desktop + mobile at 8 scroll stops
node scripts/reduced.mjs    # prefers-reduced-motion capture + checks
```

## Structure

```
app/                layout (fonts + LocalBusiness JSON-LD), page, globals
components/
  Header.tsx        sticky nav; real logo; light-on-hero / dark-on-scroll
  Hero.tsx          full-bleed photo hero, Ken-Burns + scroll parallax, 3 CTAs
  CravingSelector.tsx  2.5D CSS coverflow "pick your plate" (click/arrows/dots)
  BuildTheBite.tsx  pinned macro-crop pan across a real taco with step captions
  StoryPanels.tsx   image-mask reveals + parallax editorial panels
  MenuJourney.tsx   image-first favorite cards + full menu with online prices
  Testimonials.tsx  dark section with guest reviews from the original site
  Visit.tsx         hours / address / amenities / live map + CTAs
  FinalCTA.tsx      full-bleed photo, "Your taco run starts here."
  Footer.tsx
hooks/
  useLenis.ts             Lenis + GSAP ticker
  useReducedMotion.ts     media-query state
  useAnimationsEnabled.ts mounted && !reduced, gates GSAP so it never reverts
lib/                business.ts (real facts), images.ts (photo manifest), gsap.ts
```

## Accessibility & performance

- **prefers-reduced-motion**: all scroll/parallax motion is disabled and content
  renders statically (the CSS hero entrance and `useAnimationsEnabled` guarantee
  nothing is ever left hidden). Verified with `scripts/reduced.mjs`.
- **Mobile**: no WebGL/3D at all now. First Load JS is ~167 kB. Images are
  responsively sized via `next/image`, CTAs surface in the first viewport.
- Cinematic motion (parallax, masked reveals, the coverflow) is preserved for
  motion-comfortable users.

## What's real vs. placeholder

**Real**: name, address, phone, hours, cuisine, full menu items/prices, Google
Maps embed/directions, logo, and all four food photographs.

**Placeholder** (search `TODO`): categories without their own photo still reuse
the available restaurant photography.

No awards or history are invented.
