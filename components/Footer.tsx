import { Phone, MapPin } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function Footer() {
  return (
    <footer className="border-t border-char/10 bg-crema pb-28 pt-10 md:py-10">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <div className="display text-xl text-char">Mariana&rsquo;s Taco Shop</div>
          <p className="text-sm text-char/50">{BUSINESS.tagline}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm text-char/60 md:items-end">
          <a
            href={BUSINESS.links.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-salsa"
          >
            <MapPin size={14} /> {BUSINESS.address.full}
          </a>
          <a
            href={`tel:${BUSINESS.phone.tel}`}
            className="inline-flex items-center gap-1.5 hover:text-salsa"
          >
            <Phone size={14} /> {BUSINESS.phone.display}
          </a>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-[1400px] px-5 text-[11px] text-char/30 md:px-10">
        Concept redesign. Business details and food photography are the
        restaurant&rsquo;s own; guest reviews come from the original site and prices
        live on the online ordering page.
      </p>
    </footer>
  );
}
