"use client";

import { useReducedMotion } from "motion/react";

import { InfiniteSlider } from "@/components/motion/infinite-slider";
import { ProgressiveBlur } from "@/components/motion/progressive-blur";
import { insurers } from "@/lib/site";

/** Insurance names set as calm typography instead of a wall of mismatched logos. */
export function InsuranceStrip() {
  const reduceMotion = useReducedMotion();
  return (
    <section aria-labelledby="insurance-strip-title" className="relative border-y border-border/70 py-7">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 sm:px-8 md:flex-row md:gap-10">
        <p
          id="insurance-strip-title"
          className="shrink-0 text-center text-[0.78rem] font-semibold tracking-[0.18em] text-ink-soft uppercase md:text-left"
        >
          In network with
          <span className="block font-serif text-lg font-normal tracking-normal text-ink normal-case">
            {insurers.length} insurance plans
          </span>
        </p>
        {/* A still, wrapped list for reduced motion; otherwise it doubles as the marquee's screen-reader text. */}
        <ul
          className={
            reduceMotion
              ? "flex flex-wrap justify-center gap-x-6 gap-y-2 font-serif text-lg text-ink/70 md:justify-start"
              : "sr-only"
          }
        >
          {insurers.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        {!reduceMotion && (
          <div aria-hidden className="relative w-full min-w-0 overflow-hidden">
            <InfiniteSlider gap={44} speed={32} speedOnHover={12}>
              {insurers.map((name) => (
                <span key={name} className="flex items-center gap-11 font-serif text-xl whitespace-nowrap text-ink/70">
                  {name}
                  <span aria-hidden className="size-1.5 rounded-full bg-sand" />
                </span>
              ))}
            </InfiniteSlider>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-cream sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cream sm:w-16" />
            <ProgressiveBlur
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-10 sm:w-20"
              direction="left"
              blurIntensity={0.6}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute inset-y-0 right-0 h-full w-10 sm:w-20"
              direction="right"
              blurIntensity={0.6}
            />
          </div>
        )}
      </div>
    </section>
  );
}
