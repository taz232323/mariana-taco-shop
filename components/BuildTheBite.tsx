"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BUSINESS } from "@/lib/business";
import { IMAGES } from "@/lib/images";
import { SectionTag } from "@/components/SectionTag";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAnimationsEnabled } from "@/hooks/useAnimationsEnabled";

// Five stages. Only four real photos exist, so we reuse the strongest plates
// with distinct crops + per-stage motion so every stage reads as a clear,
// appetizing change with no fake toy ingredients.
type Stage = {
  label: string;
  note: string;
  img: string;
  alt: string;
  pos: string;
  // The "enter" transform each layer animates FROM, and the resting transform
  // it settles at while active. This is what makes each stage feel different.
  enter: string;
  active: string;
  salsa?: boolean;
};

const STAGES: Stage[] = [
  {
    label: "Tortilla",
    note: "Corn tortillas pressed and warmed on the griddle, the base of every plate.",
    img: IMAGES.carnitas,
    alt: "Warm corn tortillas",
    pos: "24% 70%",
    enter: "scale(1.14)",
    active: "scale(1.06)",
  },
  {
    label: "Meat",
    note: "Protein grilled to order and piled on generous. Nothing sits under a lamp.",
    img: IMAGES.heroTacos,
    alt: "Grilled meat piled into street tacos",
    pos: "40% 70%",
    enter: "translateY(10%) scale(1.06)",
    active: "translateY(0%) scale(1.05)",
  },
  {
    label: "Veggies",
    note: "Crisp lettuce, tomato, onion and fresh cilantro, chopped for every order.",
    img: IMAGES.crispy,
    alt: "Fresh lettuce, tomato and cheese on tacos",
    pos: "58% 42%",
    enter: "scale(0.9)",
    active: "scale(1.05)",
  },
  {
    label: "Salsa",
    note: "Finished with house salsa and a bright squeeze of lime.",
    img: IMAGES.enchiladas,
    alt: "House red salsa over a warm plate",
    pos: "50% 50%",
    enter: "translateX(-8%) scale(1.06)",
    active: "translateX(0%) scale(1.05)",
    salsa: true,
  },
  {
    label: "The finished bite",
    note: "Plated with rice and beans and in your hands while it's still hot.",
    img: IMAGES.heroTacos,
    alt: "A finished plate of grilled street tacos with rice and beans",
    pos: "50% 52%",
    enter: "scale(1.22)",
    active: "scale(1.02)",
  },
];

const LAST = STAGES.length - 1;

export function BuildTheBite() {
  const scope = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [mActive, setMActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const animate = useAnimationsEnabled();

  const cardStride = () => {
    const el = carouselRef.current;
    const card = el?.querySelector("article") as HTMLElement | null;
    return card ? card.offsetWidth + 16 : 1; // 16 = gap-4
  };
  const onCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setMActive(
      Math.max(0, Math.min(LAST, Math.round(el.scrollLeft / cardStride())))
    );
  };
  const goToCard = (i: number) => {
    carouselRef.current?.scrollTo({ left: i * cardStride(), behavior: "smooth" });
  };

  useGSAP(
    () => {
      if (!animate) return;

      const mm = gsap.matchMedia();

      // Desktop: tight pinned sequence with snap between the 5 stages.
      mm.add("(min-width: 768px)", () => {
        const st = ScrollTrigger.create({
          trigger: ".build-pin",
          start: "top top",
          // Slightly more scroll room keeps stage changes from feeling twitchy.
          end: "+=240%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Snap to each of the 5 evenly spaced stages (0, .25, .5, .75, 1).
          snap: {
            snapTo: 1 / LAST,
            duration: { min: 0.2, max: 0.5 },
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const s = Math.max(
              0,
              Math.min(LAST, Math.round(self.progress * LAST))
            );
            setStep((prev) => (prev === s ? prev : s));
          },
        });
        // Recalculate once photos are decoded.
        ScrollTrigger.refresh();
        return () => st.kill();
      });

      // Mobile: a light fade-in for the swipe carousel (no pinning).
      mm.add("(max-width: 767px)", () => {
        const tween = gsap.from(".build-mobile-card", {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".build-mobile", start: "top 85%" },
        });
        return () => tween.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope, dependencies: [animate] }
  );

  // Crossfade the desktop caption text on stage change.
  useGSAP(
    () => {
      if (!animate) return;
      gsap.fromTo(
        ".build-caption",
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" }
      );
    },
    { dependencies: [step, animate], scope }
  );

  return (
    <section id="build" ref={scope} className="on-dark bg-char text-crema">
      {/* ---------- Desktop: tight pinned sequence (hidden on mobile) ---------- */}
      {!reduced && (
        <div className="hidden md:block">
          <div className="build-pin relative h-screen w-full overflow-hidden">
            {/* Stacked stage layers, each with its own enter/rest motion */}
            {STAGES.map((s, i) => {
              const isActive = i === step;
              return (
                <div
                  key={s.label}
                  className="absolute inset-0"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 550ms ease",
                  }}
                  aria-hidden={!isActive}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: isActive ? s.active : s.enter,
                      transition: "transform 900ms cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <Image
                      src={s.img}
                      alt={s.alt}
                      fill
                      priority={i <= 1}
                      sizes="100vw"
                      className="object-cover"
                      style={{ objectPosition: s.pos }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-char via-char/25 to-char/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-char/75 to-transparent" />

            {/* Salsa wipe: a red spread sweeps across when the salsa stage
                is reached, like salsa dragged over the plate. */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-salsa/70 via-salsa/30 to-salsa/10 mix-blend-multiply"
              style={{
                clipPath: STAGES[step].salsa
                  ? "inset(0 0 0 0)"
                  : "inset(0 100% 0 0)",
                opacity: STAGES[step].salsa ? 0.85 : 0,
                transition:
                  "clip-path 700ms cubic-bezier(0.16,1,0.3,1), opacity 500ms ease",
              }}
            />

            {/* Header */}
            <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[1400px] px-5 pt-24 md:px-10 md:pt-28">
              <SectionTag index="02" label="Made fresh" className="text-lime" />
              <h2 className="display headline-lg mt-4 text-crema">
                Layer by layer.
              </h2>
            </div>

            {/* Caption + progress + final CTA */}
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-14 md:px-10">
              <div key={step} className="build-caption max-w-xl">
                <div className="text-sm font-medium text-lime">
                  {String(step + 1).padStart(2, "0")} /{" "}
                  {String(STAGES.length).padStart(2, "0")}
                </div>
                <div className="display mt-1 text-4xl text-crema md:text-6xl">
                  {STAGES[step].label}
                </div>
                <div className="mt-2 text-lg text-crema/75">
                  {STAGES[step].note}
                </div>

                {/* Final-stage CTA */}
                <a
                  href={BUSINESS.links.order}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-5"
                  style={{
                    opacity: step === LAST ? 1 : 0,
                    transform: step === LAST ? "translateY(0)" : "translateY(10px)",
                    pointerEvents: step === LAST ? "auto" : "none",
                    transition: "opacity 450ms ease, transform 450ms ease",
                  }}
                >
                  Order Online <ArrowUpRight size={16} className="btn-arrow" />
                </a>
              </div>

              {/* Progress rail */}
              <div className="mt-6 flex gap-2">
                {STAGES.map((s, i) => (
                  <span
                    key={s.label}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                      i <= step ? "bg-lime" : "bg-crema/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Mobile + reduced-motion: swipeable stage carousel ---------- */}
      <div className={reduced ? "block" : "block md:hidden"}>
        <div className="build-mobile mx-auto w-full max-w-[1400px] px-5 py-14">
          <SectionTag index="02" label="Made fresh" className="text-lime" />
          <h2 className="display mt-4 text-4xl">Layer by layer.</h2>
          <p className="mt-2 text-sm text-crema/60">
            Swipe through how every plate comes together.
          </p>

          <div
            ref={carouselRef}
            onScroll={onCarouselScroll}
            data-lenis-prevent
            aria-label="Build the bite stages"
            className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3"
          >
            {STAGES.map((s, i) => (
              <article
                key={s.label}
                className="build-mobile-card relative aspect-[4/3] w-[82vw] max-w-[340px] flex-none snap-center overflow-hidden rounded-3xl bg-char shadow-[0_22px_48px_-28px_rgba(0,0,0,0.9)]"
              >
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="82vw"
                  className="object-cover"
                  style={{ objectPosition: s.pos }}
                />
                {s.salsa && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-salsa/50 to-transparent mix-blend-multiply" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-char/95 via-char/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-xs font-semibold text-lime">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(STAGES.length).padStart(2, "0")}
                  </div>
                  <h3 className="display mt-0.5 text-3xl text-crema">
                    {s.label}
                  </h3>
                  <p className="mt-2 text-sm leading-snug text-crema/72">
                    {s.note}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-1 flex justify-center gap-1.5">
            {STAGES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                aria-label={`Go to ${s.label}`}
                onClick={() => goToCard(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === mActive ? "w-7 bg-lime" : "w-3 bg-crema/25"
                }`}
              />
            ))}
          </div>

          <a
            href={BUSINESS.links.order}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4"
          >
            Order Online <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
