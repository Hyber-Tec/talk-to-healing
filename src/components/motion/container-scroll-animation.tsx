"use client";

/**
 * Container Scroll Animation by Manu Arora (Aceternity UI), via 21st.dev:
 * https://21st.dev/@manuarora700/components/container-scroll-animation (MIT).
 * Adapted for Talk To Heal: brand-colored tablet, a gentler tilt,
 * a teal-tinted shadow, and a flat, still tablet for reduced-motion visitors.
 */
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : isMobile ? [0.9, 1] : [1.04, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -80]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[56rem] items-center justify-center px-2 sm:h-[64rem] md:h-[78rem] md:px-20"
    >
      <div className="relative w-full py-10 md:py-32" style={{ perspective: "1000px" }}>
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({ translate, children }: { translate: MotionValue<number>; children: React.ReactNode }) {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto max-w-4xl text-center">
      {children}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000, 0 9px 20px rgba(29,55,60,0.16), 0 37px 37px rgba(29,55,60,0.12), 0 84px 50px rgba(29,55,60,0.07), 0 149px 60px rgba(29,55,60,0.03)",
      }}
      className="mx-auto -mt-10 h-[34rem] w-full max-w-5xl rounded-[2rem] border border-white/10 bg-ink-deep p-2.5 ring-1 ring-ink/30 sm:h-[38rem] md:h-[42rem] md:rounded-[2.5rem] md:p-4"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-cream md:rounded-[1.75rem]">
        {children}
      </div>
    </motion.div>
  );
}
