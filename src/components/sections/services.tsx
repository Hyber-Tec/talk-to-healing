import Image from "next/image";
import type { IconType } from "react-icons";
import {
  PiArrowUpRight,
  PiCirclesThree,
  PiGlobeHemisphereWest,
  PiHeart,
  PiLeaf,
  PiStudent,
  PiUsersThree,
} from "react-icons/pi";

import { BlurFade } from "@/components/motion/blur-fade";
import { SectionHeading } from "@/components/sections/section-heading";
import { services, site, type ServiceKey } from "@/lib/site";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

const icons: Record<ServiceKey, IconType> = {
  individual: PiLeaf,
  couples: PiHeart,
  family: PiUsersThree,
  teens: PiStudent,
  groups: PiCirclesThree,
  immigration: PiGlobeHemisphereWest,
};

/** Bento placement: a 3 x 3 grid on large screens that closes with a gentle call to action. */
const layout: Record<ServiceKey, string> = {
  individual: "sm:col-span-2",
  couples: "",
  family: "",
  teens: "",
  groups: "",
  immigration: "sm:col-span-2",
};

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="services-title"
            eyebrow="How we can help"
            title={
              <>
                Care for every part of <span className="text-sand-bright italic">your story</span>
              </>
            }
            description="Whether you come alone, with a partner, or as a family, we meet you where you are."
          />
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map((service, index) => {
            const Icon = icons[service.key];
            const featured = service.key === "individual";
            return (
              <BlurFade
                key={service.key}
                inView
                offset={14}
                blur="4px"
                duration={0.6}
                delay={0.05 * index}
                className={layout[service.key]}
              >
                <article
                  className={cn(
                    "group relative flex h-full min-h-[15.5rem] flex-col overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(29,55,60,0.35)] sm:p-8",
                    featured ? "border-transparent bg-sage" : "border-border/80 bg-card/80",
                  )}
                >
                  {featured && (
                    <Image
                      src={asset("/brand/logo-mark.svg")}
                      alt=""
                      width={260}
                      height={241}
                      unoptimized
                      className="pointer-events-none absolute -right-10 -bottom-12 w-64 opacity-[0.13] transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3"
                    />
                  )}
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-2xl transition-colors duration-500",
                      featured ? "bg-white/70 text-ink" : "bg-linen text-ink group-hover:bg-sand-soft",
                    )}
                  >
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className={cn("mt-10 font-serif text-2xl leading-tight text-ink", featured && "sm:text-[2rem]")}>
                    {service.title}
                  </h3>
                  <p className={cn("mt-3 max-w-md leading-relaxed text-ink-soft", featured && "text-[1.05rem]")}>
                    {service.body}
                  </p>
                </article>
              </BlurFade>
            );
          })}

          <BlurFade inView offset={14} blur="4px" duration={0.6} delay={0.3} className="sm:col-span-2 lg:col-span-1">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full min-h-[15.5rem] flex-col overflow-hidden rounded-[1.75rem] bg-ink p-7 text-cream transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(29,55,60,0.6)] sm:p-8"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-sand transition-transform duration-500 group-hover:rotate-45">
                <PiArrowUpRight className="size-6" aria-hidden />
              </span>
              <p className="mt-10 font-serif text-2xl leading-tight">Not sure where to start?</p>
              <p className="mt-3 leading-relaxed text-cream/75">
                That is completely okay. A free 15-minute call is a gentle first step, and we will help you find the
                right fit.
              </p>
            </a>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
