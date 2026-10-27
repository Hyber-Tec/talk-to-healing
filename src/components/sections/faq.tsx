import { Fragment } from "react";
import { PiChatsCircle } from "react-icons/pi";

import { BlurFade } from "@/components/motion/blur-fade";
import { SectionHeading } from "@/components/sections/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookingButton } from "@/components/booking/booking-button";
import { faqs, site } from "@/lib/site";

/** Turns email addresses and phone numbers inside plain-text answers into links. */
function linkify(text: string) {
  const pattern = /([\w.+-]+@[\w-]+\.[\w.]+[a-z])|(\b\d{3}-\d{3}-\d{4}\b|\b1-800-\d{3}-\d{4}\b|\b988\b|\b911\b)/gi;
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const [value, email] = match;
    parts.push(text.slice(last, match.index));
    const href = email ? `mailto:${value}` : `tel:${value.replace(/-/g, "")}`;
    parts.push(
      <a key={match.index} href={href} className="font-medium text-ink underline decoration-sand underline-offset-4">
        {value}
      </a>,
    );
    last = match.index + value.length;
  }
  parts.push(text.slice(last));
  return parts.map((part, index) => <Fragment key={index}>{part}</Fragment>);
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-linen/70 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="Questions"
            title={
              <>
                Good questions <span className="text-sand-bright italic">to ask</span>
              </>
            }
            description="Starting therapy brings up a lot of questions. Here are the ones we hear most."
          />
          <BlurFade inView offset={10} blur="4px" duration={0.7} delay={0.2}>
            <div className="mt-8 rounded-[1.75rem] bg-white/70 p-6">
              <PiChatsCircle className="size-8 text-sand-deep" aria-hidden />
              <p className="mt-4 font-serif text-xl text-ink">Still wondering about something?</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                Ask us anything during your free 15-minute call, or email{" "}
                <a
                  href={`mailto:${site.email.general}`}
                  className="font-medium text-ink underline decoration-sand underline-offset-4"
                >
                  {site.email.general}
                </a>
                .
              </p>
              <BookingButton className="mt-5 h-11 rounded-full px-5">Book a free consultation</BookingButton>
            </div>
          </BlurFade>
        </div>

        <BlurFade inView offset={14} blur="4px" duration={0.7} delay={0.1}>
          <Accordion
            // "multiple": opening one answer never collapses another above it, which made the page jump.
            type="multiple"
            defaultValue={["faq-0"]}
            className="rounded-[1.75rem] bg-cream/70 px-6 sm:px-8"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="border-border/80">
                <AccordionTrigger className="py-6 font-serif text-[1.2rem] leading-snug font-normal text-ink hover:no-underline **:data-[slot=accordion-trigger-icon]:mt-1 **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-sand-deep sm:text-[1.3rem]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pr-8 pb-6 text-base leading-relaxed text-ink-soft">
                  {linkify(faq.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </div>
    </section>
  );
}
