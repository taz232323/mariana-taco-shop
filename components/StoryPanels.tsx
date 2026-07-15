"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { IMAGES } from "@/lib/images";
import { SectionTag } from "@/components/SectionTag";
import { useAnimationsEnabled } from "@/hooks/useAnimationsEnabled";

// Two editorial spreads, real photography, cover-cropped and revealed with a
// directional "served" wipe. No cream frames, no product-card look.
const PANELS = [
  {
    no: "01",
    kicker: "Griddle to plate",
    title: "California-style, cooked to order.",
    body: "Flat-top seared, wrapped fast, and handed over while it's still steaming. No shortcuts, no sitting under a lamp.",
    img: IMAGES.crispy,
    alt: "Crispy beef tacos with lettuce, tomato and cheese, plated with rice and beans",
    pos: "50% 48%",
  },
  {
    no: "02",
    kicker: "Saucy and shareable",
    title: "Bring the whole crew.",
    body: "Enchiladas under red sauce and melted cheese, plates piled with rice and beans, salsa with a little heat. Dine in or take it to go.",
    img: IMAGES.enchiladas,
    alt: "Enchilada plate with red sauce, melted cheese and crema, with Mexican rice and beans",
    pos: "50% 50%",
  },
];

export function StoryPanels() {
  const scope = useRef<HTMLDivElement>(null);
  const animate = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animate) return;

      // "Served" wipe: each photo is uncovered as it scrolls in. Scrubbed over
      // a short range so the clip is a deterministic function of scroll (it can
      // never get stuck hidden) yet still reads as a quick directional wipe.
      gsap.utils.toArray<HTMLElement>(".panel-frame").forEach((el, i) => {
        const fromRight = i % 2 === 1;
        gsap.fromTo(
          el,
          { clipPath: fromRight ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0 0 0)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });

      // Slow parallax push on the photo inside its frame.
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.16, yPercent: -4 },
          {
            scale: 1.02,
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".panel-caption").forEach((el) => {
        gsap.from(el.children, {
          y: 26,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });

      ScrollTrigger.refresh();
    },
    { scope, dependencies: [animate] }
  );

  return (
    <section
      id="story"
      ref={scope}
      className="mx-auto w-full max-w-[1400px] px-5 py-24 md:px-10 md:py-32"
    >
      <SectionTag
        index="03"
        label="How it is made"
        className="text-salsa"
      />

      <div className="mt-12 flex flex-col gap-24 md:mt-16 md:gap-36">
        {PANELS.map((p, i) => {
          const imageRight = i % 2 === 1;
          return (
            <div
              key={p.title}
              className="grid items-center gap-8 md:grid-cols-12 md:gap-6"
            >
              {/* Image */}
              <div
                className={`relative ${
                  imageRight
                    ? "md:col-span-7 md:col-start-6"
                    : "md:col-span-7"
                }`}
              >
                <div className="panel-frame relative aspect-[4/3] w-full overflow-hidden rounded-[4px]">
                  <div className="parallax-img absolute inset-0 will-change-transform">
                    <Image
                      src={p.img}
                      alt={p.alt}
                      fill
                      sizes="(max-width:768px) 100vw, 58vw"
                      className="object-cover"
                      style={{ objectPosition: p.pos }}
                    />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div
                className={`panel-caption relative ${
                  imageRight
                    ? "md:col-span-4 md:col-start-1 md:row-start-1"
                    : "md:col-span-4 md:col-start-9"
                }`}
              >
                <span className="ticket-num block text-6xl font-medium text-char/10 md:text-7xl">
                  {p.no}
                </span>
                <p className="ticket mt-2 text-cilantro">{p.kicker}</p>
                <h3 className="display mt-3 text-4xl leading-[1.03] text-char md:text-5xl">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-md text-lg text-char/65">{p.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
