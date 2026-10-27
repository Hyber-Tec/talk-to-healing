"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PiArrowUpRight } from "react-icons/pi";

import { BlurFade } from "@/components/motion/blur-fade";
import { SectionHeading } from "@/components/sections/section-heading";
import { clinicians, languages, site, team, teamUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

const ALL = "All";
const filters = [ALL, ...languages.filter((language) => language !== "English")];
const staff = team.filter((member) => !member.clinician);

export function Team() {
  const [language, setLanguage] = useState(ALL);
  const shown = language === ALL ? clinicians : clinicians.filter((member) => member.languages.includes(language));

  return (
    <section id="team" aria-labelledby="team-title" className="relative bg-linen/70 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="team-title"
          eyebrow="Meet our therapists"
          title={
            <>
              Find someone who <span className="text-sand-bright italic">understands</span>
            </>
          }
          description="Every therapist here was chosen for their warmth as much as their training. Many share the cultures and languages of the families they serve."
        />

        <BlurFade inView offset={8} blur="4px" duration={0.6} delay={0.1}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p id="language-filter-label" className="shrink-0 text-sm font-semibold text-ink">
              Speaks
            </p>
            <div role="group" aria-labelledby="language-filter-label" className="flex flex-wrap gap-2">
              {filters.map((option) => {
                const count =
                  option === ALL ? clinicians.length : clinicians.filter((m) => m.languages.includes(option)).length;
                const active = option === language;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLanguage(option)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                      active
                        ? "border-ink bg-ink text-cream shadow-[0_8px_20px_-10px_rgba(41,75,82,0.6)]"
                        : "border-ink/12 bg-cream/80 text-ink/80 hover:border-ink/30 hover:text-ink",
                    )}
                  >
                    {option === ALL ? "Any language" : option}
                    <span className={cn("ml-1.5 tabular-nums", active ? "text-sand" : "text-ink-soft/80")}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </BlurFade>

        <p className="sr-only" aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? "therapist" : "therapists"}
          {language === ALL ? "" : ` who speak ${language}`}.
        </p>

        <motion.ul layout className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((member) => (
              <motion.li
                key={member.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href={member.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-[1.5rem]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-cream">
                    <Image
                      src={asset(`/team/${member.slug}.jpg`)}
                      alt={`${member.name}${member.credentials ? `, ${member.credentials}` : ""}`}
                      fill
                      sizes="(min-width: 1024px) 270px, (min-width: 768px) 30vw, 46vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute right-3 bottom-3 flex size-10 translate-y-2 items-center justify-center rounded-full bg-cream text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <PiArrowUpRight className="size-4.5" aria-hidden />
                    </span>
                  </div>
                  <div className="mt-4 px-1">
                    <h3 className="font-serif text-[1.2rem] leading-snug text-ink">
                      {member.name}
                      {member.credentials && <span className="text-ink-soft">, {member.credentials}</span>}
                    </h3>
                    <p className="mt-0.5 text-[0.82rem] font-medium text-sand-deep">{member.role}</p>
                    {member.focus && <p className="mt-2 text-[0.9rem] leading-snug text-ink-soft">{member.focus}</p>}
                    <p className="mt-3 flex flex-wrap gap-1.5">
                      {member.languages.map((spoken) => (
                        <span
                          key={spoken}
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-[0.72rem] font-medium",
                            spoken === language ? "bg-sand text-ink-deep" : "bg-white/80 text-ink/70",
                          )}
                        >
                          {spoken}
                        </span>
                      ))}
                    </p>
                  </div>
                </a>
              </motion.li>
            ))}
            <motion.li key="match" layout transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full min-h-56 flex-col overflow-hidden rounded-[1.5rem] bg-ink p-6 text-cream transition-shadow duration-500 hover:shadow-[0_24px_50px_-24px_rgba(29,55,60,0.6)]"
              >
                <Image
                  src={asset("/brand/logo-mark-light.svg")}
                  alt=""
                  width={240}
                  height={222}
                  unoptimized
                  className="pointer-events-none absolute -right-12 -bottom-10 w-60 opacity-[0.08] transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3"
                />
                <span className="flex size-11 items-center justify-center rounded-full bg-white/10 text-sand transition-transform duration-500 group-hover:rotate-45">
                  <PiArrowUpRight className="size-5" aria-hidden />
                </span>
                <p className="mt-auto pt-10 font-serif text-2xl leading-tight">Not sure who to choose?</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/75">
                  Tell us a little about yourself on a free call, and we will suggest the therapist who fits you best.
                </p>
              </a>
            </motion.li>
          </AnimatePresence>
        </motion.ul>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-ink/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-ink-soft">
            Supported by{" "}
            {staff
              .map((member) => member.name.split(" ")[0])
              .join(", ")
              .replace(/, ([^,]*)$/, " and $1")}
            , our office manager and interns.
          </p>
          <a
            href={teamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 font-medium text-ink underline decoration-sand decoration-2 underline-offset-[6px] transition-colors hover:text-sand-deep"
          >
            Read every therapist&rsquo;s story <PiArrowUpRight aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
