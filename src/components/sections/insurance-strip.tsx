/**
 * Logo cloud after Efferd's "Logo Cloud 4" (https://21st.dev/@efferd/components/logo-cloud-4, MIT),
 * built on the same Motion Primitives slider and blur. Visitors who prefer reduced motion get the still,
 * wrapped layout of Efferd's "Logo Cloud 5" instead. CSS picks the layout, so server and client HTML match.
 */
import { InsuranceLogo } from "@/components/insurance/insurance-logo";
import { InfiniteSlider } from "@/components/motion/infinite-slider";
import { ProgressiveBlur } from "@/components/motion/progressive-blur";
import { SectionLink } from "@/components/section-link";
import { insuranceBrands, plans, type InsuranceBrand } from "@/lib/site";

const brands = Object.keys(insuranceBrands) as InsuranceBrand[];

export function InsuranceStrip() {
  return (
    <section aria-labelledby="insurance-strip-title" className="relative border-y border-border/70 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 sm:px-8 md:flex-row md:gap-10">
        <SectionLink hash="#insurance" className="group/link shrink-0 text-center md:text-left">
          <span
            id="insurance-strip-title"
            className="block text-[0.78rem] font-semibold tracking-[0.18em] text-ink-soft uppercase"
          >
            In network with
          </span>
          <span className="block font-serif text-lg text-ink underline decoration-sand/0 underline-offset-4 transition-colors group-hover/link:decoration-sand">
            {plans.length} insurance plans
          </span>
        </SectionLink>

        <ul className="sr-only">
          {plans.map((plan) => (
            <li key={plan.name}>{plan.name}</li>
          ))}
        </ul>

        <div
          aria-hidden
          className="hidden flex-wrap items-center justify-center gap-x-10 gap-y-5 motion-reduce:flex md:justify-start"
        >
          {brands.map((brand) => (
            <span key={brand} className="group">
              <InsuranceLogo brand={brand} area={1900} decorative />
            </span>
          ))}
        </div>
        <div aria-hidden className="relative w-full min-w-0 overflow-hidden motion-reduce:hidden">
          <InfiniteSlider gap={56} speed={34} speedOnHover={12} className="py-1">
            {brands.map((brand) => (
              <span key={brand} className="group flex h-12 items-center">
                <InsuranceLogo brand={brand} area={2100} decorative />
              </span>
            ))}
          </InfiniteSlider>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-cream sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cream sm:w-16" />
          <ProgressiveBlur
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-10 sm:w-20"
            direction="left"
            blurIntensity={0.6}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute inset-y-0 right-0 h-full w-10 sm:w-20"
            direction="right"
            blurIntensity={0.6}
          />
        </div>
      </div>
    </section>
  );
}
