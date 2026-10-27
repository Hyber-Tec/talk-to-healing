import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PiArrowLeft,
  PiArrowRight,
  PiCertificate,
  PiGraduationCap,
  PiPath,
  PiPhone,
  PiSparkle,
  PiTranslate,
} from "react-icons/pi";

import { BookingButton } from "@/components/booking/booking-button";
import { BlurFade } from "@/components/motion/blur-fade";
import { ContactCta } from "@/components/sections/contact-cta";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Button } from "@/components/ui/button";
import { photoOf } from "@/lib/asset";
import { clinicians, findMember, site, team, type TeamMember } from "@/lib/site";
import { profiles } from "@/lib/team-profiles";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: PageProps<"/team/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const member = findMember(slug);
  if (!member) return {};
  const name = `${member.name}${member.credentials ? `, ${member.credentials}` : ""}`;
  const description = member.focus
    ? `${name}, ${member.role} at ${site.name}. ${member.focus}.`
    : `${name}, ${member.role} at ${site.name}.`;
  return {
    title: `${name} | ${site.name}`,
    description,
    openGraph: {
      title: name,
      description,
      images: [{ url: photoOf(member.slug), width: 800, height: 1000 }],
    },
  };
}

/** Therapists who share a language beyond English come first, then the rest in team order. */
function relatedTo(member: TeamMember, count: number) {
  const others = clinicians.filter((other) => other.slug !== member.slug);
  const shared = (other: TeamMember) =>
    other.languages.some((language) => language !== "English" && member.languages.includes(language));
  return [...others.filter(shared), ...others.filter((other) => !shared(other))].slice(0, count);
}

export default async function TeamMemberPage({ params }: PageProps<"/team/[slug]">) {
  const { slug } = await params;
  const member = findMember(slug);
  const profile = profiles[slug];
  if (!member || !profile) notFound();

  const firstName = member.name.split(" ")[0];
  const [lead, ...rest] = profile.bio;
  const details = [
    { title: "Specialties", icon: PiSparkle, items: profile.specialties, chips: true },
    { title: "Approaches", icon: PiPath, items: profile.approaches, chips: true },
    { title: "Languages", icon: PiTranslate, items: member.languages, chips: true },
    { title: "Education", icon: PiGraduationCap, items: profile.education, chips: false },
    { title: "Credentials", icon: PiCertificate, items: profile.credentials ?? [], chips: false },
  ].filter((group) => group.items.length > 0);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <article>
          <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-48 -left-40 -z-10 size-[46rem] rounded-full bg-[radial-gradient(closest-side,rgba(227,234,224,0.95),transparent)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-10 -right-48 -z-10 size-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(239,224,201,0.8),transparent)]"
            />
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 rounded-full text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                <PiArrowLeft aria-hidden /> Our team
              </Link>

              <div className="mt-8 grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <BlurFade offset={10} blur="4px" duration={0.8}>
                  <div className="arch-container relative mx-auto aspect-[4/5] w-full max-w-sm lg:max-w-none">
                    <div className="absolute inset-0 translate-x-3.5 translate-y-3.5 arch bg-sand-soft" />
                    <div className="relative h-full overflow-hidden arch bg-linen ring-1 ring-ink/5">
                      <Image
                        src={photoOf(member.slug)}
                        alt={`${member.name}${member.credentials ? `, ${member.credentials}` : ""}`}
                        fill
                        loading="eager"
                        fetchPriority="high"
                        sizes="(min-width: 1024px) 26rem, 24rem"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </BlurFade>

                <div>
                  <BlurFade offset={10} blur="4px" duration={0.7} delay={0.1}>
                    <p className="flex items-center gap-3 text-[0.78rem] font-semibold tracking-[0.2em] text-sand-deep uppercase">
                      <span aria-hidden className="h-px w-8 bg-sand" />
                      {member.role}
                    </p>
                    <h1 className="mt-5 font-serif text-[2.75rem] leading-[1.05] tracking-[-0.02em] text-balance text-ink sm:text-6xl">
                      {member.name}
                      {member.credentials && <span className="text-ink-soft">, {member.credentials}</span>}
                    </h1>
                    {profile.note && (
                      <p className="mt-4 inline-flex rounded-full bg-sage px-3.5 py-1 text-sm text-ink">
                        {profile.note}
                      </p>
                    )}
                    {profile.headline && (
                      <p className="mt-6 font-serif text-2xl leading-snug text-sand-bright italic">
                        {profile.headline}
                      </p>
                    )}
                    {member.focus && (
                      <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-soft">{member.focus}.</p>
                    )}
                    <p className="mt-6 flex flex-wrap items-center gap-2">
                      <PiTranslate className="mr-1 size-5 text-sand-deep" aria-label="Languages" />
                      {member.languages.map((language) => (
                        <span key={language} className="rounded-full bg-white/80 px-3 py-1 text-sm text-ink/80">
                          {language}
                        </span>
                      ))}
                    </p>
                  </BlurFade>

                  <BlurFade offset={10} blur="4px" duration={0.7} delay={0.2}>
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                      <BookingButton
                        therapist={member.clinician ? member.slug : undefined}
                        size="lg"
                        className="h-13 rounded-full px-7 text-base shadow-[0_10px_30px_-10px_rgba(41,75,82,0.55)]"
                      >
                        {member.clinician ? `Book a free call with ${firstName}` : "Book a free consultation"}
                        <PiArrowRight className="size-4.5" aria-hidden />
                      </BookingButton>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="h-13 rounded-full border-ink/15 bg-white/50 px-7 text-base text-ink backdrop-blur hover:bg-white/80"
                      >
                        <a href={site.phone.href}>
                          <PiPhone aria-hidden /> {site.phone.display}
                        </a>
                      </Button>
                    </div>
                    <p className="mt-4 text-sm text-ink-soft">Free 15-minute phone call. No pressure, no commitment.</p>
                  </BlurFade>
                </div>
              </div>
            </div>
          </section>

          <section aria-label={`About ${firstName}`} className="border-t border-border/70 py-16 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
              <div>
                <p className="flex items-center gap-3 text-[0.78rem] font-semibold tracking-[0.2em] text-sand-deep uppercase">
                  <span aria-hidden className="h-px w-8 bg-sand" />
                  In {firstName}&rsquo;s words
                </p>
                <p className="mt-6 font-serif text-[1.55rem] leading-[1.4] text-pretty text-ink sm:text-[1.8rem]">
                  {lead}
                </p>
                {rest.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-6 text-[1.075rem] leading-[1.75] text-pretty text-ink-soft"
                  >
                    {paragraph}
                  </p>
                ))}
                {profile.bioKorean && (
                  <div lang="ko" className="mt-10 rounded-[1.75rem] bg-linen/80 p-6 sm:p-8">
                    <p className="text-[0.78rem] font-semibold tracking-[0.2em] text-sand-deep uppercase">한국어</p>
                    {profile.bioKorean.map((paragraph) => (
                      <p key={paragraph.slice(0, 20)} className="mt-4 text-[1.05rem] leading-[1.85] text-ink-soft">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Labeled icon rows after ShadcnStore's "Team Profile Grid" (https://21st.dev/@shadcnstore/components/team-1, MIT). */}
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-[1.75rem] border border-border/80 bg-card/80 p-6 sm:p-7">
                  {details.map((group, index) => {
                    const Icon = group.icon;
                    return (
                      <div
                        key={group.title}
                        className={cn("flex items-start gap-3.5", index > 0 && "mt-6 border-t border-border/70 pt-6")}
                      >
                        <Icon className="size-9 shrink-0 rounded-full bg-linen p-2 text-ink/70" aria-hidden />
                        <div className="min-w-0 flex-1">
                          <h2 className="pt-0.5 text-[0.75rem] font-semibold tracking-[0.2em] text-ink uppercase">
                            {group.title}
                          </h2>
                          {group.chips ? (
                            <ul className="mt-3 flex flex-wrap gap-1.5">
                              {group.items.map((item) => (
                                <li key={item} className="rounded-full bg-linen px-3 py-1 text-[0.85rem] text-ink/80">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <ul className="mt-3 flex flex-col gap-2.5">
                              {group.items.map((item) => (
                                <li key={item} className="text-[0.92rem] leading-snug text-ink-soft">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {member.clinician && (
                    <BookingButton therapist={member.slug} className="mt-7 h-11 w-full rounded-full text-[0.95rem]">
                      Book a free call with {firstName}
                    </BookingButton>
                  )}
                </div>
              </aside>
            </div>
          </section>

          <section aria-labelledby="related-title" className="bg-linen/70 py-20 sm:py-24">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <h2 id="related-title" className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
                  You might also connect with
                </h2>
                <Link
                  href="/team"
                  className="inline-flex shrink-0 items-center gap-1.5 font-medium text-ink underline decoration-sand decoration-2 underline-offset-[6px] transition-colors hover:text-sand-deep"
                >
                  See everyone <PiArrowRight aria-hidden />
                </Link>
              </div>
              <ul className="mt-10 grid gap-5 sm:grid-cols-3">
                {relatedTo(member, 3).map((other) => (
                  <li key={other.slug}>
                    <Link href={`/team/${other.slug}`} className="group flex items-center gap-4">
                      <Image
                        src={photoOf(other.slug)}
                        alt=""
                        width={96}
                        height={120}
                        className="h-24 w-[4.8rem] shrink-0 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="min-w-0">
                        <span className="block font-serif text-lg leading-snug text-ink">
                          {other.name}
                          {other.credentials && <span className="text-ink-soft">, {other.credentials}</span>}
                        </span>
                        <span className="mt-1 block text-[0.88rem] leading-snug text-ink-soft">{other.focus}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>

        <div className="pt-16">
          <ContactCta />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
