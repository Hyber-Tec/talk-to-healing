"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis } from "lenis/react";

/**
 * Lenis honors prefers-reduced-motion on its own (respectReducedMotion defaults to true),
 * and stopInertiaOnNavigate stops a glide in progress when a link leaves the page.
 */
const lenisOptions: LenisOptions = {
  lerp: 0.1,
  wheelMultiplier: 0.9,
  anchors: { offset: -88 },
  stopInertiaOnNavigate: true,
};

/** Gentle, unhurried scrolling plus a global reduced-motion contract for every animation. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={lenisOptions}>
        <ScrollToTopOnNavigate />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}

/**
 * A new page starts at the top. Without this, Lenis could carry the previous page's scroll position
 * into a shorter page, where the browser clamps it to the bottom.
 * Links to a section (/#team) keep their own target, and Back/Forward keep the browser's restored position.
 */
function ScrollToTopOnNavigate() {
  const lenis = useLenis();
  const pathname = usePathname();
  const previous = useRef(pathname);
  const historyNavigation = useRef(false);

  // Back and Forward restore the earlier position themselves; only new navigations start at the top.
  useEffect(() => {
    const onPopState = () => {
      historyNavigation.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!lenis || previous.current === pathname) return;
    previous.current = pathname;
    if (historyNavigation.current) {
      historyNavigation.current = false;
      return;
    }
    if (window.location.hash) return;
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [lenis, pathname]);

  return null;
}
