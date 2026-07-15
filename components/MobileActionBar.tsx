"use client";

import { useEffect, useState } from "react";
import { Phone, ArrowUpRight, UtensilsCrossed } from "lucide-react";
import { BUSINESS } from "@/lib/business";

/**
 * Persistent thumb-reach action bar for phones. Appears once the user scrolls
 * past the hero so it never covers the hero CTAs. Order Online is the strongest
 * target; Menu jumps straight to the full menu; Call uses tel:.
 */
export function MobileActionBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-300 ${
        shown ? "translate-y-0" : "translate-y-[130%]"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 mb-3 flex items-stretch gap-2 rounded-2xl border border-char/10 bg-crema/95 p-2 shadow-[0_16px_40px_-12px_rgba(20,18,16,0.5)] backdrop-blur">
        <a
          href="#full-menu"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-char active:bg-char/5"
        >
          <UtensilsCrossed size={19} />
          <span className="text-[11px] font-semibold">Menu</span>
        </a>
        <a
          href={`tel:${BUSINESS.phone.tel}`}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-char active:bg-char/5"
        >
          <Phone size={18} />
          <span className="text-[11px] font-semibold">Call</span>
        </a>
        <a
          href={BUSINESS.links.order}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-[1.5] items-center justify-center gap-1.5 rounded-xl bg-salsa font-semibold text-crema"
        >
          Order Online <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}
