import { Approach } from "@/components/sections/approach";
import { ContactCta } from "@/components/sections/contact-cta";
import { Empathy } from "@/components/sections/empathy";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Insurance } from "@/components/sections/insurance";
import { InsuranceStrip } from "@/components/sections/insurance-strip";
import { Journal } from "@/components/sections/journal";
import { Services } from "@/components/sections/services";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Team } from "@/components/sections/team";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <InsuranceStrip />
        <Empathy />
        <Services />
        <Approach />
        <HowItWorks />
        <Team />
        <Insurance />
        <Journal />
        <Faq />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  );
}
