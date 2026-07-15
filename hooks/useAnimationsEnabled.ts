"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Returns true only once the component has mounted on the client AND the user
 * has not requested reduced motion.
 *
 * Why this exists: prefers-reduced-motion is unknown during SSR/first paint,
 * so a naive `[reduced]` dependency flips false→true after mount and makes
 * useGSAP revert its just-created tweens, which can leave `from` targets
 * stuck at opacity 0. This flag instead transitions false→true at most once
 * (for motion users) or stays false forever (for reduced-motion users), so
 * useGSAP creates its animations exactly once and never reverts real work.
 */
export function useAnimationsEnabled(): boolean {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !reduced;
}
