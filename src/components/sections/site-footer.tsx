import { PiLifebuoy } from "react-icons/pi";

import { Logo } from "@/components/brand/logo";
import { crisis, journalUrl, nav, site, teamUrl } from "@/lib/site";

const explore = [...nav, { label: "Journal", href: journalUrl }];
const practice = [
  { label: "Book a consultation", href: site.bookingUrl },
  { label: "Full team & bios", href: teamUrl },
  { label: "Billing questions", href: `mailto:${site.email.billing}` },
  { label: "Get directions", href: site.address.mapUrl },
];

export function SiteFooter() {
  return (
    <footer className="relative pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1.4fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs leading-relaxed text-ink-soft">
              {site.tagline}. Compassionate talk therapy in {site.address.city}, Georgia, and online.
            </p>
          </div>

          <FooterColumn title="Explore" links={explore} />
          <FooterColumn title="Practice" links={practice} />

          <div className="col-span-2 rounded-[1.5rem] border border-sand/60 bg-sand-soft/40 p-6 lg:col-span-1">
            <p className="flex items-center gap-2 font-serif text-lg text-ink">
              <PiLifebuoy className="size-5 text-sand-deep" aria-hidden />
              Need help right now?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              We are not a crisis service. If you are in danger or thinking about harming yourself, reach out now:
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>
                <a
                  href={crisis.lifeline.href}
                  className="font-semibold text-ink underline decoration-sand underline-offset-4"
                >
                  Call or text {crisis.lifeline.display}
                </a>
                <span className="text-ink-soft"> · {crisis.lifeline.label}</span>
              </li>
              <li>
                <a
                  href={crisis.georgia.href}
                  className="font-semibold text-ink underline decoration-sand underline-offset-4"
                >
                  {crisis.georgia.display}
                </a>
                <span className="text-ink-soft"> · {crisis.georgia.label}, 24/7</span>
              </li>
              <li>
                <a
                  href={crisis.emergency.href}
                  className="font-semibold text-ink underline decoration-sand underline-offset-4"
                >
                  Call {crisis.emergency.display}
                </a>
                <span className="text-ink-soft"> · Emergencies</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-8 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {process.env.BUILD_YEAR} {site.legalName}. All rights reserved.
          </p>
          <p>
            {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-ink uppercase">{title}</p>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
