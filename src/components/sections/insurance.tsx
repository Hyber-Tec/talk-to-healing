import { PiCheckCircle, PiEnvelopeSimple, PiReceipt } from "react-icons/pi";

import { BlurFade } from "@/components/motion/blur-fade";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { insurers, policies, site } from "@/lib/site";

export function Insurance() {
  return (
    <section id="insurance" aria-labelledby="insurance-title" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="insurance-title"
            eyebrow="Insurance & cost"
            title={
              <>
                Care that fits <span className="text-sand-bright italic">your budget</span>
              </>
            }
            description="We are in network with most major plans, and self-pay clients are always welcome. If cost is on your mind, ask us. We will walk you through it."
          />
          <BlurFade inView offset={10} blur="4px" duration={0.7} delay={0.2}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full px-6 text-[0.95rem]">
                <a href={`mailto:${site.email.billing}`}>
                  <PiEnvelopeSimple aria-hidden /> Ask about my coverage
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-ink/15 bg-transparent px-6 text-[0.95rem] text-ink"
              >
                <a href={site.phone.href}>Call {site.phone.display}</a>
              </Button>
            </div>
            <p className="mt-8 flex gap-3 rounded-2xl bg-linen/80 p-5 text-sm leading-relaxed text-ink-soft">
              <PiReceipt className="mt-0.5 size-5 shrink-0 text-sand-deep" aria-hidden />
              <span>
                <span className="font-semibold text-ink">Good Faith Estimate. </span>
                {policies.goodFaithEstimate}
              </span>
            </p>
          </BlurFade>
        </div>

        <BlurFade inView offset={14} blur="4px" duration={0.8} delay={0.1}>
          <div className="rounded-[2rem] border border-border/80 bg-card/80 p-6 sm:p-9">
            <p className="flex items-baseline justify-between gap-4">
              <span className="font-serif text-2xl text-ink">Plans we accept</span>
              <span className="text-sm font-medium text-ink-soft tabular-nums">{insurers.length} plans</span>
            </p>
            <ul className="mt-6 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {insurers.map((name) => (
                <li key={name} className="flex items-center gap-3 border-b border-border/60 pb-3.5 text-ink">
                  <PiCheckCircle className="size-5 shrink-0 text-sage-deep" aria-hidden />
                  {name}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-soft">
              Plans change. Please confirm your coverage with us before your first session.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
