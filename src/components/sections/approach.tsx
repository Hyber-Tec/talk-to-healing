import Image from "next/image";
import type { IconType } from "react-icons";
import { PiFlowerLotus, PiGlobe, PiHandHeart, PiQuotes, PiRainbow, PiSunHorizon } from "react-icons/pi";

import { BlurFade } from "@/components/motion/blur-fade";
import { SectionHeading } from "@/components/sections/section-heading";
import { Greetings } from "@/components/sections/greetings";
import { clinicians, focusAreas, languages, type FocusKey } from "@/lib/site";
import { photoOf } from "@/lib/asset";

const icons: Record<FocusKey, IconType> = {
  lgbtq: PiRainbow,
  culture: PiGlobe,
  trauma: PiHandHeart,
  youth: PiSunHorizon,
  faith: PiFlowerLotus,
};

/** Modalities named in the clinicians' bios and the practice's directory listing. */
const modalities = [
  "CBT",
  "DBT",
  "ACT",
  "EMDR",
  "IFS",
  "Emotionally focused",
  "Narrative therapy",
  "Play therapy",
  "Art therapy",
  "Mindfulness",
  "Family systems",
];

const founder = clinicians[0];

export function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="relative overflow-hidden bg-linen/70 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="approach-title"
          eyebrow="Our approach"
          title={
            <>
              Care that sees <span className="text-sand-bright italic">all of you</span>
            </>
          }
          description="Your culture, your family, your faith, and your identity are not side notes. They are part of how healing happens."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <BlurFade inView offset={16} blur="4px" duration={0.8}>
            <Greetings />
          </BlurFade>

          <div>
            <BlurFade inView offset={12} blur="4px" duration={0.8} delay={0.1}>
              <figure>
                <PiQuotes className="size-10 text-sand" aria-hidden />
                <blockquote className="mt-4 font-serif text-[1.6rem] leading-[1.35] text-pretty text-ink sm:text-[1.9rem]">
                  My goal is not to &lsquo;fix&rsquo; your problems but to help you overcome life&rsquo;s hardships
                  without a significant crisis. I try my sincere best to be a safe place for you to share your life
                  stories and support your journey.
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <Image
                    src={photoOf(founder.slug)}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 shrink-0 rounded-full object-cover object-[50%_20%] ring-4 ring-white"
                  />
                  <span>
                    <span className="block font-serif text-lg leading-tight text-ink">
                      {founder.name}, {founder.credentials}
                    </span>
                    <span className="mt-0.5 block text-sm text-ink-soft">Founder & CEO · Columbia University MSW</span>
                  </span>
                </figcaption>
              </figure>
            </BlurFade>
            <BlurFade inView offset={12} blur="4px" duration={0.8} delay={0.18}>
              <p className="mt-8 leading-relaxed text-ink-soft">
                Elly founded Talk To Heal with a special heart for second-generation immigrant teens and adults, and for
                families bridging cultures and generations. Today our clinicians share that care in {languages.length}{" "}
                languages.
              </p>
            </BlurFade>
          </div>
        </div>

        <div className="mt-24 grid gap-12 border-t border-ink/10 pt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <BlurFade inView offset={10} blur="4px" duration={0.7}>
            <h3 className="font-serif text-3xl leading-tight text-balance text-ink sm:text-[2.25rem]">
              Wherever you are coming from, <span className="text-sand-bright italic">you belong here.</span>
            </h3>
            <p className="mt-8 text-[0.78rem] font-semibold tracking-[0.2em] text-ink-soft uppercase">
              Evidence-based approaches
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {modalities.map((modality) => (
                <li
                  key={modality}
                  className="rounded-full border border-ink/10 bg-cream px-3.5 py-1.5 text-sm text-ink/80"
                >
                  {modality}
                </li>
              ))}
            </ul>
          </BlurFade>

          <div className="-mt-6">
            {focusAreas.map((area, index) => {
              const Icon = icons[area.key];
              return (
                <BlurFade key={area.key} inView offset={10} blur="4px" duration={0.6} delay={0.06 * index}>
                  <div className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-b border-ink/10 py-6 sm:grid-cols-[auto_13rem_1fr] sm:items-center">
                    <span className="row-span-2 flex size-12 items-center justify-center rounded-full bg-white/70 text-sand-deep transition-colors duration-500 group-hover:bg-sand-soft sm:row-span-1">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h4 className="font-serif text-xl leading-tight text-ink">{area.title}</h4>
                    <p className="text-[0.95rem] leading-relaxed text-ink-soft">{area.body}</p>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
