import type { IconType } from "react-icons";
import { PiCalendarCheck, PiChatsCircle, PiHandHeart, PiTrendUp } from "react-icons/pi";

import { Timeline } from "@/components/motion/timeline";
import { SectionHeading } from "@/components/sections/section-heading";
import { steps } from "@/lib/site";

const stepIcons: IconType[] = [PiChatsCircle, PiHandHeart, PiCalendarCheck, PiTrendUp];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="how-title"
          eyebrow="Getting started"
          title={
            <>
              Your first steps, <span className="text-sand-bright italic">gently</span>
            </>
          }
          description="Reaching out is often the hardest part. Here is exactly what happens next, so nothing feels uncertain."
        />
      </div>
      <div className="mt-6 px-5 sm:px-8">
        <Timeline
          data={steps.map((step, index) => {
            const Icon = stepIcons[index];
            return {
              title: step.title,
              content: (
                <div className="rounded-[1.5rem] border border-border/80 bg-card/80 p-5 sm:rounded-[1.75rem] sm:p-8">
                  <Icon className="size-8 text-sand-deep" aria-hidden />
                  <p className="mt-4 text-base leading-relaxed text-pretty text-ink sm:mt-5 sm:text-lg">{step.body}</p>
                  <p className="mt-5 border-t border-border/80 pt-4 text-sm font-medium text-ink-soft">{step.note}</p>
                </div>
              ),
            };
          })}
        />
      </div>
    </section>
  );
}
