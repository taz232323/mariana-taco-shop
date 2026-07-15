"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Boots Lenis (unless reduced motion) and keeps ScrollTrigger measurements
 * fresh after the page settles (fonts, images, layout).
 */
export function SmoothScroll({
  reduced,
  children,
}: {
  reduced: boolean;
  children: React.ReactNode;
}) {
  useLenis(!reduced);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    // Refresh once the first paint has settled and again on full load.
    const id = window.setTimeout(refresh, 300);
    window.addEventListener("load", refresh);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return <>{children}</>;
}
