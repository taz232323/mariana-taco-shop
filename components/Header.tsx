"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, MapPin, Menu, X } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { IMAGES } from "@/lib/images";

const NAV = [
  { label: "Craving", href: "#craving" },
  { label: "Fresh", href: "#build" },
  { label: "Menu", href: "#menu" },
  { label: "Visit", href: "#visit" },
];

// The "Craving" showcase is hidden on phones, so the mobile sheet skips it and
// points Menu straight at the full item list.
const MOBILE_NAV = [
  { label: "Menu", href: "#full-menu" },
  { label: "How it is made", href: "#build" },
  { label: "Visit", href: "#visit" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-crema/90 backdrop-blur-md shadow-[0_1px_0_rgba(20,18,16,0.08)]"
          : "bg-gradient-to-b from-black/55 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <Image
            src={IMAGES.logo}
            alt={BUSINESS.name}
            width={500}
            height={159}
            priority
            className={`w-auto transition-all duration-500 ${
              scrolled
                ? "h-10 drop-shadow-none md:h-12"
                : "h-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] md:h-[72px]"
            }`}
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors hover:text-salsa ${
                scrolled ? "text-char/70" : "text-crema/90"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`tel:${BUSINESS.phone.tel}`}
            className={
              scrolled
                ? "btn-outline"
                : "btn border border-crema/40 text-crema hover:bg-crema hover:text-char"
            }
          >
            <Phone size={15} /> Call
          </a>
          <a
            href={BUSINESS.links.order}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Order Online
          </a>
        </div>

        {/* Mobile actions: strongest CTA stays visible, plus the nav sheet */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={BUSINESS.links.order}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-salsa px-4 py-2 text-xs font-bold text-crema shadow-sm"
          >
            Order
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-char text-crema"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="border-t border-char/10 bg-crema/95 px-5 py-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1">
            {MOBILE_NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-char/80 hover:bg-char/5"
              >
                {n.label}
              </a>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a href={`tel:${BUSINESS.phone.tel}`} className="btn-outline">
              <Phone size={15} /> Call
            </a>
            <a
              href={BUSINESS.links.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <MapPin size={15} /> Map
            </a>
            <a
              href={BUSINESS.links.order}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary col-span-2"
            >
              Order Online
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
