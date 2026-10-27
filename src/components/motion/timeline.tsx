"use client";

/**
 * Timeline by Manu Arora (Aceternity UI), via 21st.dev:
 * https://21st.dev/@manuarora700/components/timeline (MIT).
 * Adapted for Talk To Heal: numbered brand markers, a teal-to-sand progress line,
 * and a line height that follows layout changes (the original measured only once).
 */
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export type TimelineEntry = {
  title: string;
  content: React.ReactNode;
};

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 30%", "end 60%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={trackRef} className="relative mx-auto max-w-5xl pb-8">
      {data.map((item, index) => (
        <div key={item.title} className="flex justify-start pt-10 md:gap-10 md:pt-20 first:md:pt-12">
          <div className="relative z-10 flex max-w-xs flex-col items-center self-start md:sticky md:top-32 md:w-full md:flex-row lg:max-w-sm">
            <div className="absolute left-2 flex size-12 items-center justify-center rounded-full bg-cream md:left-2">
              <div className="flex size-9 items-center justify-center rounded-full border border-sand/70 bg-sand-soft font-serif text-sm text-ink">
                {index + 1}
              </div>
            </div>
            <h3 className="hidden font-serif text-4xl leading-tight tracking-tight text-balance text-ink md:block md:pl-24 lg:text-5xl">
              {item.title}
            </h3>
          </div>
          <div className="relative w-full pl-16 sm:pr-2 sm:pl-20 md:pl-4">
            <h3 className="mb-4 block pt-1.5 font-serif text-[1.65rem] leading-tight text-ink md:hidden">
              {item.title}
            </h3>
            {item.content}
          </div>
        </div>
      ))}
      <div
        aria-hidden
        style={{ height }}
        className="absolute top-0 left-[calc(2rem-1px)] w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,transparent_0%,var(--color-border)_10%,var(--color-border)_90%,transparent_100%)]"
      >
        <motion.div
          style={{ height: lineHeight, opacity: lineOpacity }}
          className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-sand via-ink to-transparent"
        />
      </div>
    </div>
  );
}
