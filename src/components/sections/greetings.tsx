"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { clinicians, languages, listNames } from "@/lib/site";
import { cn } from "@/lib/utils";

/** "Hello" in each language the clinical team speaks, with the language's own name. */
const greetings: Record<string, { hello: string; native: string; code: string }> = {
  English: { hello: "Hello", native: "English", code: "en" },
  Korean: { hello: "안녕하세요", native: "한국어", code: "ko" },
  Japanese: { hello: "こんにちは", native: "日本語", code: "ja" },
  Spanish: { hello: "Hola", native: "Español", code: "es" },
  Hindi: { hello: "नमस्ते", native: "हिन्दी", code: "hi" },
  Tamil: { hello: "வணக்கம்", native: "தமிழ்", code: "ta" },
  Malayalam: { hello: "നമസ്കാരം", native: "മലയാളം", code: "ml" },
  Gujarati: { hello: "નમસ્તે", native: "ગુજરાતી", code: "gu" },
  Indonesian: { hello: "Halo", native: "Bahasa Indonesia", code: "id" },
};

const spoken = languages.filter((language) => greetings[language]);

/** "Spoken by all 11 therapists" or, for smaller groups, their first names. */
function speakers(language: string) {
  const names = clinicians
    .filter((member) => member.languages.includes(language))
    .map((member) => member.name.split(" ")[0]);
  if (names.length === clinicians.length) return `Spoken by all ${names.length} of our therapists`;
  return `Spoken by ${listNames(names)}`;
}

export function Greetings() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % spoken.length), 2600);
    return () => window.clearInterval(timer);
  }, [paused]);

  const language = spoken[active];
  const greeting = greetings[language];

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] bg-ink p-7 text-cream shadow-[0_30px_60px_-30px_rgba(29,55,60,0.6)] sm:p-9"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(219,188,144,0.28),transparent)]"
      />
      <p className="text-[0.78rem] font-semibold tracking-[0.2em] text-sand uppercase">Therapy in your language</p>

      <div className="relative mt-6 flex h-[8.5rem] flex-col justify-center sm:h-[9.5rem]" aria-live="off">
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p lang={greeting.code} className="font-serif text-[2.75rem] leading-tight sm:text-6xl">
              {greeting.hello}
            </p>
            <p className="mt-2 text-sm text-cream/70">
              <span lang={greeting.code}>{greeting.native}</span> · {speakers(language)}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <ul className="relative mt-6 flex flex-wrap gap-2" aria-label="Languages our therapists speak">
        {spoken.map((name, index) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              className={cn(
                "rounded-full border px-3 py-1 text-[0.82rem] transition-colors duration-300",
                index === active
                  ? "border-sand bg-sand text-ink-deep"
                  : "border-white/15 text-cream/80 hover:border-white/40 hover:text-cream",
              )}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
