"use client";

import { ArrowUpRight } from "lucide-react";
import { FULL_MENU } from "@/lib/fullMenu";

/**
 * Mobile-only strip that puts the menu one tap away right under the hero.
 * Tapping a category selects it in the full menu (via the hash the menu
 * listens to) and scrolls straight to the list.
 */
export function QuickActions() {
  const jumpToCategory = (id: string) => {
    if (typeof window === "undefined") return;
    window.location.hash = `menu-category-${id}`;
    const el = document.getElementById("full-menu");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-crema px-5 pb-8 pt-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="kicker text-salsa">Start here</p>
          <h2 className="display mt-1 text-2xl text-char">Browse the menu</h2>
        </div>
        <button
          type="button"
          onClick={() => jumpToCategory(FULL_MENU[0].id)}
          className="link-draw inline-flex flex-none items-center gap-1 text-sm font-semibold text-salsa"
        >
          See all <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {FULL_MENU.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => jumpToCategory(category.id)}
            className="ticket flex-none rounded-full border border-char/15 bg-white/70 px-4 py-2 !text-[0.68rem] text-char/75 transition-transform duration-200 active:scale-95 active:border-salsa active:text-salsa"
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}
