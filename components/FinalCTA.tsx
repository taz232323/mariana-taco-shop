"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { BUSINESS } from "@/lib/business";
import { IMAGES } from "@/lib/images";
import { SectionTag } from "@/components/SectionTag";
import { useAnimationsEnabled } from "@/hooks/useAnimationsEnabled";

export function FinalCTA() {
  const scope = useRef<HTMLElement>(null);
  const animate = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animate) return;

      gsap.from(".final-rise", {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 70%" },
      });

      gsap.fromTo(
        ".final-media",
        { scale: 1.15, yPercent: -4 },
        {
          scale: 1.02,
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope, dependencies: [animate] }
  );

  return (
    <section
      id="final"
      ref={scope}
      className="on-dark relative flex min-h-[80vh] items-center overflow-hidden bg-char md:min-h-[85vh]"
    >
      <div className="final-media absolute inset-0 will-change-transform">
        <Image
          src={IMAGES.heroTacos}
          alt="Grilled street tacos plated with rice, beans, lime and a charred jalapeño"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 55%" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-char via-char/70 to-char/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-char/80 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-24 md:px-10">
        <SectionTag
          index="07"
          mobileIndex="05"
          label="Last stop"
          className="final-rise text-lime"
        />
        <h2 className="final-rise display mt-4 max-w-[15ch] text-5xl leading-[0.95] text-crema md:text-8xl">
          Your taco run <span className="text-salsa">starts here.</span>
        </h2>
        <p className="final-rise mt-5 max-w-lg text-lg text-crema/75">
          Order online for pickup, call ahead, or point your maps at{" "}
          {BUSINESS.address.city}. We&rsquo;ll have it hot.
        </p>
        <div className="final-rise mt-8 flex flex-wrap gap-3">
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
            className="btn bg-crema text-char hover:bg-lime"
          >
            <Phone size={15} /> {BUSINESS.phone.display}
          </a>
          <a
            href={BUSINESS.links.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="btn border border-crema/40 text-crema hover:bg-crema hover:text-char"
          >
            <MapPin size={15} /> Directions
          </a>
        </div>
      </div>
    </section>
  );
}
