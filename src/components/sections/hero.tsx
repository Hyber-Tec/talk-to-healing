"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PiArrowRight, PiChatsCircle, PiPhoneCall, PiShieldCheck, PiTranslate } from "react-icons/pi";

import { TextEffect } from "@/components/motion/text-effect";
import { BookingButton } from "@/components/booking/booking-button";
import { Button } from "@/components/ui/button";
import { clinicians, languages, site } from "@/lib/site";
import { photoOf } from "@/lib/asset";

const ease = [0.22, 1, 0.36, 1] as const;

const proof = [
  { icon: PiChatsCircle, label: "Free 15-minute call" },
  { icon: PiShieldCheck, label: "Most major insurance" },
  { icon: PiTranslate, label: `${languages.length} languages spoken` },
];

const founder = clinicians[0];
const stack = ["sarah-pak", "calvin-go", "jasmin-mata", "ayswarya-thampi"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Gentle parallax depth between the portrait and its cards; held still for reduced motion.
  const depth = useReducedMotion() ? 0 : 1;
  const archY = useTransform(scrollYProgress, [0, 1], [0, 60 * depth]);
  const bubbleY = useTransform(scrollYProgress, [0, 1], [0, -50 * depth]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -90 * depth]);

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <HeroBackdrop />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10 max-w-xl lg:max-w-none">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/60 py-1.5 pr-4 pl-2 text-[0.82rem] font-medium text-ink/80 backdrop-blur"
          >
            <span className="relative flex size-2.5 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage-deep/50 [animation-duration:2.4s]" />
              <span className="relative inline-flex size-2 rounded-full bg-sage-deep" />
            </span>
            Johns Creek, Georgia · In person & online
          </motion.p>

          <h1 className="mt-7 font-serif text-[3.15rem] leading-[1.02] font-normal tracking-[-0.025em] text-ink sm:text-[4.25rem] lg:text-[4.6rem] xl:text-[5.1rem]">
            <TextEffect as="span" per="word" preset="fade-in-blur" delay={0.15} speedSegment={0.45} className="block">
              Your safe
            </TextEffect>
            <TextEffect
              as="span"
              per="word"
              preset="fade-in-blur"
              delay={0.4}
              speedSegment={0.45}
              className="block text-sand-bright italic"
            >
              healing place.
            </TextEffect>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
            className="mt-6 max-w-[34rem] text-lg leading-relaxed text-pretty text-ink-soft sm:text-[1.2rem]"
          >
            Psychotherapy that goes beyond sitting on a couch. Warm, culturally sensitive care for individuals, couples,
            families, children, and teens, from a team that speaks {languages.length} languages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <BookingButton
              size="lg"
              className="group h-13 rounded-full px-7 text-base shadow-[0_10px_30px_-10px_rgba(41,75,82,0.55)]"
            >
              Book a free consultation
              <PiArrowRight
                className="size-4.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </BookingButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 rounded-full border-ink/15 bg-white/50 px-7 text-base text-ink backdrop-blur hover:bg-white/80"
            >
              <a href="#team">Meet our therapists</a>
            </Button>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 1.05 } } }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
          >
            {proof.map(({ icon: Icon, label }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                }}
                className="flex items-center gap-2 text-[0.92rem] font-medium text-ink/75"
              >
                <Icon className="size-5 text-sand-deep" aria-hidden />
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto aspect-[10/11] w-full max-w-[30rem] lg:max-w-none">
          <motion.div
            style={{ y: archY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            className="arch-container absolute inset-y-0 right-[2%] w-[78%] sm:w-[68%]"
          >
            <div className="absolute inset-0 translate-x-3.5 translate-y-3.5 arch bg-sand-soft" />
            <div className="relative h-full overflow-hidden arch bg-linen ring-1 ring-ink/5">
              <Image
                src={photoOf(founder.slug)}
                alt={`${founder.name}, ${founder.credentials}, founder of ${site.shortName}`}
                fill
                loading="eager"
                fetchPriority="high"
                quality={85}
                sizes="(min-width: 1024px) 30vw, 68vw"
                className="object-cover object-[50%_30%] saturate-[1.05] sepia-[.14]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-sand/10 via-transparent to-ink-deep/25" />
              <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-[0_10px_30px_-15px_rgba(29,55,60,0.5)] backdrop-blur">
                <div className="min-w-0">
                  <p className="truncate font-serif text-[1.05rem] leading-tight text-ink">
                    {founder.name}, {founder.credentials}
                  </p>
                  <p className="mt-0.5 truncate text-[0.78rem] text-ink-soft">Founder & CEO</p>
                </div>
                <p className="hidden shrink-0 text-[0.78rem] font-medium text-sand-deep sm:block lg:hidden xl:block">
                  EN · 한국어 · 日本語
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: bubbleY }}
            className="absolute top-[12%] left-0 hidden w-[46%] max-w-[14rem] sm:block"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease }}
            >
              <div className="animate-float rounded-3xl border border-white/80 bg-white/95 p-4 shadow-[0_18px_40px_-18px_rgba(29,55,60,0.35)] backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-sage text-ink">
                    <PiPhoneCall className="size-4.5" aria-hidden />
                  </span>
                  <p className="text-sm leading-tight font-semibold text-ink">Free 15-min call</p>
                </div>
                <p className="mt-2 text-[0.82rem] leading-snug text-ink-soft">
                  Choose any therapist. We will call you.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: cardY }}
            className="absolute bottom-[24%] left-[3%] hidden w-[48%] max-w-[14.5rem] sm:block lg:bottom-[15%] xl:bottom-[24%]"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease }}
            >
              <div className="animate-float rounded-3xl border border-white/80 bg-white/95 p-4 shadow-[0_18px_40px_-18px_rgba(29,55,60,0.35)] backdrop-blur-md [animation-delay:-3.5s]">
                <div className="flex -space-x-2.5">
                  {stack.map((slug) => (
                    <Image
                      key={slug}
                      src={photoOf(slug)}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 shrink-0 rounded-full object-cover object-top ring-2 ring-white"
                    />
                  ))}
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-cream ring-2 ring-white">
                    +{clinicians.length - stack.length}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-tight font-semibold text-ink">
                  {clinicians.length} therapists, {languages.length} languages
                </p>
                <p className="mt-1 text-[0.82rem] leading-snug text-ink-soft">One caring team.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Slow-drifting light in the brand's soft tones, adapted from Aceternity's Background Gradient Animation. */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[20%] -left-[10%] size-[46rem] animate-drift-1 rounded-full bg-[radial-gradient(closest-side,rgba(227,234,224,0.95),rgba(227,234,224,0))]" />
      <div className="absolute top-[5%] -right-[15%] size-[44rem] animate-drift-2 rounded-full bg-[radial-gradient(closest-side,rgba(239,224,201,0.9),rgba(239,224,201,0))]" />
      <div className="absolute -bottom-[25%] left-[25%] size-[40rem] animate-drift-3 rounded-full bg-[radial-gradient(closest-side,rgba(242,227,220,0.85),rgba(242,227,220,0))]" />
      <div className="absolute inset-0 bg-grain opacity-70" />
    </div>
  );
}
