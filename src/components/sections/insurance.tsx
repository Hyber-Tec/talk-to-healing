import { PiEnvelopeSimple, PiReceipt } from "react-icons/pi";

import { InsuranceLogo } from "@/components/insurance/insurance-logo";
import { BlurFade } from "@/components/motion/blur-fade";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { plans, policies, site } from "@/lib/site";

export function Insurance() {
  return (
    <section id="insurance" aria-labelledby="insurance-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
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
            </BlurFade>
          </div>
          <BlurFade inView offset={10} blur="4px" duration={0.7} delay={0.25}>
            <p className="flex gap-3 rounded-2xl bg-linen/80 p-5 text-sm leading-relaxed text-ink-soft">
              <PiReceipt className="mt-0.5 size-5 shrink-0 text-sand-deep" aria-hidden />
              <span>
                <span className="font-semibold text-ink">Good Faith Estimate. </span>
                {policies.goodFaithEstimate}
              </span>
            </p>
          </BlurFade>
        </div>

        <BlurFade inView offset={14} blur="4px" duration={0.8} delay={0.1}>
          <div className="mt-14 rounded-[2rem] border border-border/80 bg-card/80 p-4 sm:p-6">
            <p className="flex items-baseline justify-between gap-4 px-2 pt-1">
              <span className="font-serif text-2xl text-ink">Plans we accept</span>
              <span className="text-sm font-medium text-ink-soft tabular-nums">{plans.length} plans</span>
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {plans.map((plan) => (
                <li
                  key={plan.name}
                  className="group flex flex-col items-center justify-between gap-3 rounded-2xl border border-border/70 bg-white px-4 pt-5 pb-3.5 text-center transition-shadow duration-500 hover:shadow-[0_14px_30px_-20px_rgba(29,55,60,0.45)]"
                >
                  <span className="flex h-14 items-center">
                    <InsuranceLogo brand={plan.brand} area={2800} maxWidth={132} decorative />
                  </span>
                  <span className="text-[0.82rem] leading-tight text-ink-soft">{plan.name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 px-2 pb-1 text-sm text-ink-soft">
              Plans change. Please confirm your coverage with us before your first session.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
