"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { BUSINESS } from "@/lib/business";
import { DISHES } from "@/lib/images";
import { SectionTag } from "@/components/SectionTag";
import { useAnimationsEnabled } from "@/hooks/useAnimationsEnabled";

// Coverflow transform for a card given its distance from the active card.
function cardStyle(offset: number, animate: boolean): React.CSSProperties {
  const abs = Math.abs(offset);
  const sign = Math.sign(offset);
  const x = offset * (abs === 0 ? 0 : 56); // percent, spread siblings out
  const rotate = -sign * Math.min(abs, 2) * 26;
  const z = -abs * 240;
  const scale = abs === 0 ? 1 : Math.max(0.62, 1 - abs * 0.16);
  const opacity = abs === 0 ? 1 : Math.max(0.35, 1 - abs * 0.35);
  return {
    transform: `translateX(${x}%) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`,
    opacity,
    zIndex: 100 - abs,
    transition: animate
      ? "transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease"
      : "none",
    pointerEvents: abs > 2 ? "none" : "auto",
  };
}

export function CravingSelector() {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const animate = useAnimationsEnabled();
  const dish = DISHES[active];

  useGSAP(
    () => {
      if (!animate) return;
      gsap.from(".craving-head > *", {
        y: 26,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
      gsap.from(".craving-stage", {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 70%" },
      });
    },
    { scope, dependencies: [animate] }
  );

  // Re-fade the detail copy whenever the active dish changes.
  useGSAP(
    () => {
      if (!animate) return;
      gsap.fromTo(
        ".craving-detail",
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" }
      );
    },
    { dependencies: [active, animate], scope }
  );

  const move = (dir: number) =>
    setActive((a) => (a + dir + DISHES.length) % DISHES.length);

  return (
    <section
      id="craving"
      ref={scope}
      className="relative overflow-hidden bg-crema py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="craving-head max-w-2xl text-char">
          <SectionTag index="01" label="What you're craving" className="text-salsa" />
          <h2 className="display headline-lg mt-5 text-char">
            Pick your plate.
          </h2>
          <p className="mt-4 max-w-md text-char/60">
            Every plate is made to order. Drag through the favorites, then send
            your pick straight to the kitchen.
          </p>
        </div>

        {/* 2.5D coverflow stage */}
        <div
          className="craving-stage relative mt-12 h-[380px] md:h-[520px]"
          style={{ perspective: "1400px" }}
        >
          <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
            {DISHES.map((d, i) => {
              const offset = i - active;
              const isActive = offset === 0;
              return (
                <button
                  key={d.id}
                  aria-label={`Show ${d.name}`}
                  onClick={() => setActive(i)}
                  style={cardStyle(offset, animate)}
                  className="absolute h-[320px] w-[240px] overflow-hidden rounded-[26px] bg-char shadow-[0_40px_80px_-24px_rgba(20,18,16,0.55)] md:h-[460px] md:w-[340px]"
                >
                  <Image
                    src={d.img}
                    alt={d.alt}
                    fill
                    sizes="(max-width:768px) 240px, 340px"
                    className="object-cover"
                    style={{ objectPosition: d.pos }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-char/85 via-char/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <span className="kicker text-lime">{d.kicker}</span>
                    <div className="display mt-1 text-xl leading-tight text-crema md:text-2xl">
                      {d.name}
                    </div>
                  </div>
                  {!isActive && (
                    <div className="absolute inset-0 bg-char/25 transition-opacity" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Nav arrows */}
          <button
            aria-label="Previous"
            onClick={() => move(-1)}
            className="absolute left-1 top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-crema/90 text-char shadow-lg backdrop-blur transition hover:bg-char hover:text-crema md:left-6"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            aria-label="Next"
            onClick={() => move(1)}
            className="absolute right-1 top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-crema/90 text-char shadow-lg backdrop-blur transition hover:bg-char hover:text-crema md:right-6"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Active detail */}
        <div className="mt-10 flex flex-col items-center text-center">
          <div key={active} className="craving-detail max-w-xl">
            <h3 className="display text-3xl text-char md:text-4xl">
              {dish.name}
            </h3>
            <p className="mt-3 text-char/65">{dish.copy}</p>
            <a
              href={BUSINESS.links.order}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              Order {dish.name}{" "}
              <ArrowUpRight size={16} className="btn-arrow" />
            </a>
          </div>

          {/* Dots */}
          <div className="mt-8 flex gap-2">
            {DISHES.map((d, i) => (
              <button
                key={d.id}
                aria-label={`Go to ${d.name}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-8 bg-salsa" : "w-2 bg-char/20 hover:bg-char/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
