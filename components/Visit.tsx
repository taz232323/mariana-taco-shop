"use client";

import { Phone, MapPin, Clock, Car, Sun, ArrowUpRight } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { SectionTag } from "@/components/SectionTag";

const AMENITY_ICONS = [Car, Sun];

export function Visit() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    BUSINESS.address.full
  )}&output=embed`;

  return (
    <section id="visit" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <SectionTag
          index="06"
          mobileIndex="04"
          label="Come by"
          className="text-salsa"
        />
        <h2 className="display headline-lg mt-4 text-char">Visit the shop.</h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Practical info, laid out on hairlines instead of boxes */}
          <div>
            <div className="grid gap-10 sm:grid-cols-2">
              {/* Hours */}
              <div>
                <div className="flex items-center gap-2 text-cilantro">
                  <Clock size={16} />
                  <span className="ticket">Hours</span>
                </div>
                <dl className="mt-5 border-t border-char/15">
                  {BUSINESS.hours.map((h) => (
                    <div
                      key={h.days}
                      className="flex items-baseline justify-between gap-4 border-b border-char/10 py-3"
                    >
                      <dt className="font-medium text-char">{h.days}</dt>
                      <dd className="ticket-num text-sm text-char/60">
                        {h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Address + amenities */}
              <div>
                <div className="flex items-center gap-2 text-cilantro">
                  <MapPin size={16} />
                  <span className="ticket">Find us</span>
                </div>
                <address className="mt-5 not-italic">
                  <div className="display text-2xl leading-tight text-char">
                    {BUSINESS.address.street}
                  </div>
                  <div className="text-char/60">
                    {BUSINESS.address.city}, {BUSINESS.address.state}{" "}
                    {BUSINESS.address.zip}
                  </div>
                  <a
                    href={`tel:${BUSINESS.phone.tel}`}
                    className="link-draw ticket-num mt-3 inline-flex items-center gap-2 text-salsa"
                  >
                    <Phone size={15} /> {BUSINESS.phone.display}
                  </a>
                </address>

                <div className="mt-7 flex items-center gap-2 text-cilantro">
                  <Sun size={16} />
                  <span className="ticket">Good to know</span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
                  {BUSINESS.amenities.map((a, i) => {
                    const Icon = AMENITY_ICONS[i] ?? MapPin;
                    return (
                      <li
                        key={a}
                        className="flex items-center gap-2 text-char/75"
                      >
                        <Icon size={15} className="text-salsa" />
                        {a}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-2">
              <a
                href={BUSINESS.links.order}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Order Online <ArrowUpRight size={16} className="btn-arrow" />
              </a>
              <a href={`tel:${BUSINESS.phone.tel}`} className="btn-dark">
                <Phone size={15} /> Call
              </a>
              <a
                href={BUSINESS.links.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MapPin size={15} /> Directions
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="min-h-[360px] overflow-hidden rounded-3xl border border-char/10 bg-char">
            <iframe
              title={`Map to ${BUSINESS.name}`}
              src={mapSrc}
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
