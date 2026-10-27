"use client";

/**
 * Text Reveal by Dillion Verma (Magic UI), via 21st.dev:
 * https://21st.dev/@dillionverma/components/text-reveal (MIT).
 * Adapted for Talk To Heal: serif brand typography, highlighted words,
 * screen-reader friendly markup, and a shorter scroll runway.
 */
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

import { cn } from "@/lib/utils";

const statementClass =
  "flex flex-wrap justify-center text-center font-serif text-[1.9rem] leading-[1.25] font-normal tracking-[-0.01em] text-balance sm:text-4xl md:text-5xl md:leading-[1.2] lg:text-[3.5rem]";

export function TextReveal({
  children,
  highlight = [],
  className,
  eyebrow,
}: {
  children: string;
  /** Words (without punctuation) to set in the italic accent style. */
  highlight?: string[];
  className?: string;
  eyebrow?: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.6", "end end"] });
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");
  const emphasized = new Set(highlight.map((word) => word.toLowerCase()));
  const keyOf = (word: string) => word.replace(/[^\p{L}\p{N}'-]/gu, "").toLowerCase();

  // Visitors who prefer reduced motion get the whole statement at once, without the long scroll runway.
  if (reduceMotion) {
    return (
      <div
        ref={sectionRef}
        className={cn("relative mx-auto flex max-w-5xl flex-col items-center px-6 py-28 sm:py-36", className)}
      >
        {eyebrow}
        <p className={statementClass}>
          {words.map((word, i) => (
            <span
              key={i}
              className={cn(
                "mx-[0.14em] my-[0.04em]",
                emphasized.has(keyOf(word)) ? "text-sand-bright italic" : "text-ink",
              )}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-[170vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-svh max-w-5xl flex-col items-center justify-center px-6">
        {eyebrow}
        <p className="sr-only">{children}</p>
        <p aria-hidden className={statementClass}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]} emphasis={emphasized.has(keyOf(word))}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
  emphasis,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  emphasis: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className={cn("relative mx-[0.14em] my-[0.04em]", emphasis && "italic")}>
      <span className="absolute text-ink/15">{children}</span>
      <motion.span style={{ opacity }} className={emphasis ? "text-sand-bright" : "text-ink"}>
        {children}
      </motion.span>
    </span>
  );
}
