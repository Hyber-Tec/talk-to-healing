/**
 * PARKED: not rendered on any page.
 * The practice has no client portal yet, so this tablet showcase of a sample progress report stays out of the site.
 * To bring it back, render <ProgressShowcase /> in src/app/page.tsx (it was placed after <Approach />).
 */
import { ContainerScroll } from "@/components/motion/container-scroll-animation";
import { ProgressReport } from "@/components/sections/progress-report";

export function ProgressShowcase() {
  return (
    <section aria-labelledby="progress-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(227,234,224,0.9),transparent)]"
      />
      <ContainerScroll
        titleComponent={
          <div className="px-4">
            <p className="flex items-center justify-center gap-3 text-[0.78rem] font-semibold tracking-[0.2em] text-sand-deep uppercase">
              <span aria-hidden className="h-px w-8 bg-sand" />
              Your client portal
              <span aria-hidden className="h-px w-8 bg-sand" />
            </p>
            <h2
              id="progress-title"
              className="mt-5 font-serif text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-balance text-ink sm:text-5xl lg:text-[3.6rem]"
            >
              Healing is not a straight line.
              <span className="block text-sand-bright italic">Seeing it helps.</span>
            </h2>
            <p className="mx-auto mt-5 mb-16 max-w-2xl text-lg leading-relaxed text-pretty text-ink-soft md:mb-24">
              Short, private check-ins between sessions help you and your therapist notice what is changing, celebrate
              the small wins, and adjust together.
            </p>
          </div>
        }
      >
        <ProgressReport />
      </ContainerScroll>
    </section>
  );
}
