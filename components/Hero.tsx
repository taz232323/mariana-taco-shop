"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { Phone, MapPin, ArrowUpRight, ChevronDown } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { BUSINESS } from "@/lib/business";
import { IMAGES } from "@/lib/images";
import { useAnimationsEnabled } from "@/hooks/useAnimationsEnabled";

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const animate = useAnimationsEnabled();

  useGSAP(
    () => {
      // Entrance is handled by CSS (.animate-fade-up) so it natively respects
      // prefers-reduced-motion without any GSAP revert edge cases.
      if (!animate) return;

      // Cinematic Ken-Burns + scroll parallax on the photo.
      gsap.fromTo(
        ".hero-media",
        { scale: 1.08, yPercent: 0 },
        {
          scale: 1.18,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      // Text drifts up a touch faster than the image (depth).
      gsap.to(".hero-copy", {
        yPercent: -18,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope, dependencies: [animate] }
  );

  return (
    <section
      ref={scope}
      id="top"
      className="relative h-[76svh] min-h-[500px] w-full overflow-hidden bg-char md:h-[100svh] md:min-h-[600px]"
    >
      {/* Full-bleed photo */}
      <div className="hero-media absolute inset-0 will-change-transform">
        <Image
          src={IMAGES.heroTacos}
          alt="Three grilled street tacos with Mexican rice, refried beans, lime and a grilled jalapeño"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 55%" }}
        />
      </div>

      {/* Cinematic scrims for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-char via-char/40 to-char/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-char/70 via-transparent to-transparent" />
      <div className="noise-overlay absolute inset-0 opacity-30" />

      {/* Copy */}
      <div className="hero-copy absolute inset-0 z-10 mx-auto flex max-w-[1400px] flex-col justify-end px-5 pb-12 md:px-10 md:pb-24">
        <p
          className="animate-fade-up ticket text-lime"
          style={{ animationDelay: "0.1s" }}
        >
          Frisco, TX / California-style Mexican
        </p>
        <h1
          className="animate-fade-up display mt-3 max-w-[14ch] text-[2.5rem] leading-[0.95] text-crema sm:text-[4.5rem] sm:leading-[0.92] md:mt-4 lg:text-[6.5rem]"
          style={{ animationDelay: "0.2s" }}
        >
          Tacos worth the taco run.
        </h1>
        <p
          className="animate-fade-up mt-3 max-w-lg text-base text-crema/75 md:mt-5 md:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          Fresh {BUSINESS.cuisine.toLowerCase()}: tacos, burritos, enchiladas
          and more, cooked to order and handed over hot.
        </p>

        <div
          className="animate-fade-up mt-6 flex flex-wrap gap-2.5 md:mt-8 md:gap-3"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href={BUSINESS.links.order}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base"
          >
            Order Online <ArrowUpRight size={17} className="btn-arrow" />
          </a>
          <a
            href={`tel:${BUSINESS.phone.tel}`}
            className="btn border border-crema/40 text-crema backdrop-blur-sm hover:bg-crema hover:text-char"
          >
            <Phone size={15} /> Call
          </a>
          <a
            href={BUSINESS.links.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="btn border border-crema/40 text-crema backdrop-blur-sm hover:bg-crema hover:text-char"
          >
            <MapPin size={15} /> Directions
          </a>
        </div>
      </div>

      {/* Scroll hint (desktop only; phones get straight to the content) */}
      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-crema/60 md:flex">
        <ChevronDown size={16} className={animate ? "animate-bounce" : ""} />
        <span className="text-[11px] tracking-[0.24em]">SCROLL</span>
      </div>
    </section>
  );
}
