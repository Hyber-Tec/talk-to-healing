import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";

import { SectionHeading } from "@/components/sections/section-heading";
import { TherapistGrid } from "@/components/team/therapist-grid";
import { listNames, team } from "@/lib/site";

const staff = team.filter((member) => !member.clinician);

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="relative bg-linen/70 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="team-title"
          eyebrow="Meet our therapists"
          title={
            <>
              Find someone who <span className="text-sand-bright italic">understands</span>
            </>
          }
          description="Every therapist here was chosen for their warmth as much as their training. Many share the cultures and languages of the families they serve."
        />

        <TherapistGrid />

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-ink/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-ink-soft">
            Supported by {listNames(staff.map((member) => member.name.split(" ")[0]))}, our office manager and interns.
          </p>
          <Link
            href="/team"
            className="inline-flex shrink-0 items-center gap-1.5 font-medium text-ink underline decoration-sand decoration-2 underline-offset-[6px] transition-colors hover:text-sand-deep"
          >
            Meet the whole team <PiArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
