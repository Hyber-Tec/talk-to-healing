import Image from "next/image";
import type { IconType } from "react-icons";
import { PiArrowRight, PiEnvelopeSimple, PiMapPin, PiPhone } from "react-icons/pi";

import { BlurFade } from "@/components/motion/blur-fade";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";

const details: { icon: IconType; label: string; lines: { text: string; href?: string }[] }[] = [
  {
    icon: PiMapPin,
    label: "Visit",
    lines: [
      {
        text: `${site.address.street}\n${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
        href: site.address.mapUrl,
      },
    ],
  },
  {
    icon: PiPhone,
    label: "Call",
    lines: [{ text: site.phone.display, href: site.phone.href }, { text: `Fax ${site.fax}` }],
  },
  {
    icon: PiEnvelopeSimple,
    label: "Email",
    lines: [
      { text: site.email.general, href: `mailto:${site.email.general}` },
      { text: site.email.billing, href: `mailto:${site.email.billing}` },
    ],
  },
];

export function ContactCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate mx-auto max-w-[90rem] overflow-hidden rounded-[2.5rem] bg-ink px-5 py-20 text-cream sm:px-8 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 size-[36rem] animate-drift-1 rounded-full bg-[radial-gradient(closest-side,rgba(219,188,144,0.22),transparent)]" />
          <div className="absolute -right-40 -bottom-56 size-[40rem] animate-drift-2 rounded-full bg-[radial-gradient(closest-side,rgba(126,152,134,0.3),transparent)]" />
          <Image
            src={asset("/brand/logo-mark-light.svg")}
            alt=""
            width={520}
            height={482}
            unoptimized
            className="absolute -right-24 -bottom-24 w-[30rem] opacity-[0.05] sm:w-[34rem]"
          />
        </div>

        <div className="mx-auto max-w-6xl">
          <BlurFade inView offset={12} blur="4px" duration={0.8}>
            <h2
              id="contact-title"
              className="max-w-3xl font-serif text-[2.6rem] leading-[1.06] tracking-[-0.02em] text-balance sm:text-6xl lg:text-7xl"
            >
              Your safe healing place is <span className="text-sand italic">one conversation away.</span>
            </h2>
          </BlurFade>
          <BlurFade inView offset={12} blur="4px" duration={0.8} delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
              Book a free 15-minute call with any of our therapists. We will listen, answer your questions, and help you
              take the next step at your own pace.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group h-13 rounded-full bg-sand px-7 text-base text-ink-deep hover:bg-sand/90"
              >
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book a free consultation
                  <PiArrowRight
                    className="size-4.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-full border-white/25 bg-transparent px-7 text-base text-cream hover:bg-white/10 hover:text-cream"
              >
                <a href={site.phone.href}>
                  <PiPhone aria-hidden /> {site.phone.display}
                </a>
              </Button>
            </div>
          </BlurFade>

          <div className="mt-20 grid gap-8 border-t border-white/12 pt-10 sm:grid-cols-3">
            {details.map(({ icon: Icon, label, lines }, index) => (
              <BlurFade key={label} inView offset={10} blur="4px" duration={0.6} delay={0.06 * index}>
                <div className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/8 text-sand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-sand uppercase">{label}</p>
                    {lines.map((line) =>
                      line.href ? (
                        <a
                          key={line.text}
                          href={line.href}
                          target={line.href.startsWith("http") ? "_blank" : undefined}
                          rel={line.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-1.5 block break-words whitespace-pre-line text-cream/90 transition-colors hover:text-sand"
                        >
                          {line.text}
                        </a>
                      ) : (
                        <p key={line.text} className="mt-1.5 text-cream/60">
                          {line.text}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
