"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { BUSINESS, TESTIMONIALS } from "@/lib/business";
import { SectionTag } from "@/components/SectionTag";
import { useAnimationsEnabled } from "@/hooks/useAnimationsEnabled";

export function Testimonials() {
  const scope = useRef<HTMLDivElement>(null);
  const animate = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animate) return;
      gsap.from(".t-card", {
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
        y: 40,
        opacity: 0.55,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "opacity,transform",
      });
    },
    { scope, dependencies: [animate] }
  );

  return (
    <section
      id="reviews"
      ref={scope}
      className="on-dark bg-char py-20 text-crema md:py-28"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionTag index="05" label="Word around Frisco" className="text-lime" />
            <h2 className="display headline-lg mt-4 text-crema">
              What people say.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={BUSINESS.links.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-crema/25 text-crema hover:bg-crema hover:text-char"
            >
              Google reviews{" "}
              <ArrowUpRight size={16} className="btn-arrow" />
            </a>
            <a
              href={BUSINESS.links.leaveReview}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Leave a review{" "}
              <ArrowUpRight size={16} className="btn-arrow" />
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="t-card flex flex-col rounded-3xl border border-crema/10 bg-crema/[0.04] p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <Quote className="text-salsa" size={26} />
                <div
                  className="flex gap-1 text-lime"
                  aria-label={`${t.rating} star review`}
                >
                  {Array.from({ length: t.rating }).map((_, star) => (
                    <Star
                      key={star}
                      size={18}
                      fill="currentColor"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-snug text-crema/85">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-crema/10 pt-4">
                <div className="font-semibold text-crema">{t.name}</div>
                <div className="text-xs text-crema/40">{t.detail}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
