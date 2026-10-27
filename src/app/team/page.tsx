import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";

import { BlurFade } from "@/components/motion/blur-fade";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { TherapistGrid } from "@/components/team/therapist-grid";
import { photoOf } from "@/lib/asset";
import { clinicians, languages, site, team } from "@/lib/site";

export const metadata: Metadata = {
  title: `Our team | ${site.name}`,
  description: `Meet the ${clinicians.length} therapists of ${site.name}, speaking ${languages.length} languages, in Johns Creek, Georgia and online.`,
};

const staff = team.filter((member) => !member.clinician);

export default function TeamPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section aria-labelledby="team-title" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,rgba(227,234,224,0.9),transparent)]"
          />
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading
              id="team-title"
              as="h1"
              eyebrow="Our team"
              title={
                <>
                  The people who will <span className="text-sand-bright italic">listen</span>
                </>
              }
              description={`${clinicians.length} therapists who speak ${languages.length} languages between them, supported by a small, caring office team. Choose someone whose story resonates, or let us help you find the right fit.`}
            />
            <TherapistGrid eagerCount={4} />
          </div>
        </section>

        <section aria-labelledby="staff-title" className="bg-linen/70 py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading
              id="staff-title"
              eyebrow="Behind the scenes"
              title={
                <>
                  Interns and <span className="text-sand-bright italic">office team</span>
                </>
              }
            />
            <ul className="mt-12 grid gap-5 sm:grid-cols-3">
              {staff.map((member, index) => (
                <li key={member.slug}>
                  <BlurFade inView offset={12} blur="4px" duration={0.6} delay={0.06 * index} className="h-full">
                    <Link
                      href={`/team/${member.slug}`}
                      className="group flex h-full items-center gap-4 rounded-[1.5rem] border border-white/80 bg-white/60 p-4 transition-colors duration-500 hover:bg-white"
                    >
                      <Image
                        src={photoOf(member.slug)}
                        alt=""
                        width={80}
                        height={100}
                        className="h-[5.5rem] w-[4.4rem] shrink-0 rounded-2xl object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block font-serif text-lg leading-snug text-ink">{member.name}</span>
                        <span className="mt-0.5 block text-[0.85rem] text-sand-deep">{member.role}</span>
                      </span>
                      <PiArrowRight
                        className="ml-auto size-4 shrink-0 text-ink/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink"
                        aria-hidden
                      />
                    </Link>
                  </BlurFade>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="pt-16">
          <ContactCta />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
