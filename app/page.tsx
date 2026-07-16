"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CravingSelector } from "@/components/CravingSelector";
import { BuildTheBite } from "@/components/BuildTheBite";
import { StoryPanels } from "@/components/StoryPanels";
import { MenuJourney } from "@/components/MenuJourney";
import { Testimonials } from "@/components/Testimonials";
import { Visit } from "@/components/Visit";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Home() {
  const reduced = useReducedMotion();

  // Mobile is a flex column whose visual order is set with `order-*`; desktop
  // falls back to plain block flow (md:block), so `order` is ignored and the
  // original source order is preserved untouched. The two most cinematic
  // sections (Craving showcase, Story panels) are desktop-only to keep the
  // phone experience tight and action-first.
  return (
    <SmoothScroll reduced={reduced}>
      <Header />
      <main className="flex flex-col md:block">
        <div className="order-1">
          <Hero />
        </div>
        <div className="order-[90] hidden md:block">
          <CravingSelector />
        </div>
        <div className="order-4">
          <BuildTheBite />
        </div>
        <div className="order-[91] hidden md:block">
          <StoryPanels />
        </div>
        <div className="order-3">
          <MenuJourney />
        </div>
        <div className="order-5">
          <Testimonials />
        </div>
        <div className="order-6">
          <Visit />
        </div>
        <div className="order-7">
          <FinalCTA />
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </SmoothScroll>
  );
}
