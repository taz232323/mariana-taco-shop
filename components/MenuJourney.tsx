"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { BUSINESS } from "@/lib/business";
import { FULL_MENU, FULL_MENU_ITEM_COUNT } from "@/lib/fullMenu";
import { DISHES } from "@/lib/images";
import { SectionTag } from "@/components/SectionTag";
import { useAnimationsEnabled } from "@/hooks/useAnimationsEnabled";

type Dish = (typeof DISHES)[number];

function formatMenuPrice(price: number, hasUpgrades: boolean) {
  if (hasUpgrades && price === 0) return "Varies";
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return hasUpgrades ? `From ${amount}` : amount;
}

export function MenuJourney() {
  const scope = useRef<HTMLElement>(null);
  const animate = useAnimationsEnabled();
  const [openDish, setOpenDish] = useState<Dish | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    FULL_MENU[0].id
  );
  const activeCategory =
    FULL_MENU.find((category) => category.id === activeCategoryId) ??
    FULL_MENU[0];

  // Close the detail modal on Escape.
  useEffect(() => {
    if (!openDish) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDish(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openDish]);

  // If someone lands on an old category anchor, open that category in place.
  useEffect(() => {
    const syncCategoryFromHash = () => {
      const id = window.location.hash.replace("#menu-category-", "");
      if (FULL_MENU.some((category) => category.id === id)) {
        setActiveCategoryId(id);
      }
    };
    syncCategoryFromHash();
    window.addEventListener("hashchange", syncCategoryFromHash);
    return () => window.removeEventListener("hashchange", syncCategoryFromHash);
  }, []);

  useGSAP(
    () => {
      if (!animate) return;

      gsap.from(".menu-head > *", {
        y: 26,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 78%" },
      });

      // Masked reveal + gentle rise for each favorite card.
      gsap.utils.toArray<HTMLElement>(".menu-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0% round 24px)", y: 40 },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            delay: (i % 2) * 0.08,
          }
        );
      });

      gsap.from(".full-menu-panel", {
        y: 18,
        opacity: 0.6,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: ".full-menu", start: "top 85%" },
      });
    },
    { scope, dependencies: [animate] }
  );

  useGSAP(
    () => {
      if (!animate) return;
      gsap.fromTo(
        ".full-menu-item",
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.025,
          ease: "power2.out",
          clearProps: "opacity,transform",
        }
      );
    },
    { scope, dependencies: [activeCategoryId, animate] }
  );

  const chooseCategory = (id: string) => {
    setActiveCategoryId(id);
    window.history.replaceState(null, "", `#menu-category-${id}`);

    const fullMenu = document.getElementById("full-menu");
    if (!fullMenu) return;

    window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      fullMenu.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  return (
    <section id="menu" ref={scope} className="bg-ivory py-14 md:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="menu-head">
          <SectionTag
            index="04"
            mobileIndex="01"
            label="The menu"
            className="text-salsa"
          />
          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display headline-lg max-w-2xl text-char">
              Fan favorites.
            </h2>
            <p className="max-w-sm text-char/60 md:text-right">
              Real photos, real plates. Tap any dish for the details, then order
              online whenever you&rsquo;re ready.
            </p>
          </div>
        </div>

        {/* Favorite dish cards open an internal detail panel, no external nav.
            Mobile: a swipe carousel of shorter cards. sm+: a two-up grid. */}
        <div className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0">
          {DISHES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setOpenDish(d)}
              aria-label={`View ${d.name} details`}
              className="menu-card group relative block aspect-[4/3] w-[82%] flex-none snap-start overflow-hidden rounded-3xl bg-char text-left shadow-[0_30px_60px_-30px_rgba(20,18,16,0.5)] sm:aspect-[16/11] sm:w-auto"
            >
              <Image
                src={d.img}
                alt={d.alt}
                fill
                sizes="(max-width:640px) 100vw, 45vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                style={{ objectPosition: d.pos }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-char/85 via-char/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
                <div className="min-w-0">
                  <span className="kicker text-lime">{d.kicker}</span>
                  <h3 className="display mt-1 text-2xl text-crema md:text-3xl">
                    {d.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 max-w-sm text-sm text-crema/70">
                    {d.copy}
                  </p>
                </div>
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-crema text-char transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-salsa group-hover:text-crema">
                  <Plus size={18} />
                </span>
              </div>
            </button>
          ))}
        </div>

        <div id="full-menu" className="full-menu mt-12 scroll-mt-20 md:mt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker text-cilantro">The full menu</p>
              <h3 className="display mt-2 text-3xl text-char md:text-6xl">
                {FULL_MENU_ITEM_COUNT} items from the original menu.
              </h3>
            </div>
            <p className="max-w-md text-sm text-char/55 md:text-right">
              Prices are copied from the online ordering menu. Configurable
              items are shown as starting prices.
            </p>
          </div>

          <nav
            aria-label="Menu categories"
            className="no-scrollbar sticky top-[60px] z-20 -mx-5 mt-6 flex gap-2 overflow-x-auto bg-ivory/95 px-5 py-3 backdrop-blur md:static md:mx-0 md:mt-8 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none"
          >
            {FULL_MENU.map((category) => {
              const isActive = category.id === activeCategoryId;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => chooseCategory(category.id)}
                  aria-pressed={isActive}
                  className={`ticket flex-none rounded-full border px-4 py-2 !text-[0.68rem] transition-[background-color,color,border-color,transform] duration-300 ease-out active:scale-95 ${
                    isActive
                      ? "border-salsa bg-salsa text-crema"
                      : "border-char/15 bg-crema text-char/70 hover:border-salsa/60 hover:text-salsa"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </nav>

          <section
            id={`menu-category-${activeCategory.id}`}
            key={activeCategory.id}
            className="full-menu-panel mt-8 scroll-mt-24 rounded-3xl border border-char/10 bg-crema p-5 md:p-6"
          >
            <div className="flex flex-col gap-3 border-b border-char/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="kicker text-salsa">Now showing</p>
                <h4 className="display mt-1 text-3xl text-char md:text-5xl">
                  {activeCategory.name}
                </h4>
              </div>
              <span className="w-fit rounded-full bg-ivory px-3 py-1 text-xs font-semibold text-char/60">
                {activeCategory.items.length} items
              </span>
            </div>

            <ul className="grid gap-x-6 divide-y divide-char/10 md:grid-cols-2 md:divide-y-0">
              {activeCategory.items.map((item) => (
                <li
                  key={item.id}
                  className="full-menu-item border-char/10 py-3 md:py-4 md:border-b"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h5 className="text-[15px] font-semibold leading-snug text-char md:text-base">
                        {item.name}
                      </h5>
                      {item.description && (
                        <p className="mt-0.5 text-[13px] leading-relaxed text-char/55 md:mt-1 md:text-sm">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="flex-none rounded-full bg-char px-2.5 py-1 text-xs font-semibold text-crema">
                      {formatMenuPrice(item.price, item.priceHasUpgrades)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-char p-6 text-crema sm:flex-row sm:items-center sm:justify-between md:p-8">
            <p className="max-w-2xl text-sm text-crema/70">
              Want modifiers, meat choices, drink sizes, or the newest price?
              The online ordering page has the live checkout version.
            </p>
            <a
              href={BUSINESS.links.order}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-none"
            >
              Order Online <ArrowUpRight size={16} className="btn-arrow" />
            </a>
          </div>
        </div>
      </div>

      {/* Internal detail modal */}
      {openDish && (
        <DishModal dish={openDish} onClose={() => setOpenDish(null)} />
      )}
    </section>
  );
}

function DishModal({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={dish.name}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-char/70 backdrop-blur-sm"
      />
      {/* Panel */}
      <div className="relative z-10 grid w-full max-w-3xl overflow-hidden rounded-3xl bg-crema shadow-2xl sm:grid-cols-2">
        <div className="relative aspect-[4/3] sm:aspect-auto">
          <Image
            src={dish.img}
            alt={dish.alt}
            fill
            sizes="(max-width:640px) 100vw, 40vw"
            className="object-cover"
            style={{ objectPosition: dish.pos }}
          />
        </div>
        <div className="flex flex-col p-7 md:p-8">
          <span className="kicker text-salsa">{dish.kicker}</span>
          <h3 className="display mt-2 text-3xl text-char md:text-4xl">
            {dish.name}
          </h3>
          <p className="mt-3 flex-1 text-char/70">{dish.copy}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={BUSINESS.links.order}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Order Online <ArrowUpRight size={16} className="btn-arrow" />
            </a>
            <button type="button" onClick={onClose} className="btn-outline">
              Close
            </button>
          </div>
        </div>
        {/* Corner close */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-char/60 text-crema backdrop-blur transition hover:bg-char"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}
