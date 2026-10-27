"use client";

import { useMemo } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";

/**
 * Gentle, unhurried scrolling plus a global reduced-motion contract:
 * visitors who ask their OS for less motion get native wheel scrolling and no transform animations.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const options = useMemo(
    () => ({ lerp: 0.1, wheelMultiplier: 0.9, smoothWheel: !reduceMotion, anchors: { offset: -88 } }),
    [reduceMotion],
  );

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={options}>
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
