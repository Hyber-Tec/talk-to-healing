"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { PiPhone } from "react-icons/pi";

import { Logo } from "@/components/brand/logo";
import { SectionLink } from "@/components/section-link";
import { BookingButton } from "@/components/booking/booking-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full pr-2 pl-4 transition-[background-color,box-shadow,border-color] duration-500 sm:pl-5",
          scrolled
            ? "border border-white/60 bg-cream/80 shadow-[0_8px_30px_-12px_rgba(29,55,60,0.18)] backdrop-blur-xl"
            : "border border-transparent bg-transparent",
        )}
      >
        <SectionLink hash="#top" aria-label={`${site.name}, home`} className="rounded-full">
          <Logo />
        </SectionLink>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <SectionLink
              key={item.href}
              hash={item.href}
              className="rounded-full px-3 py-2 text-[0.92rem] font-medium whitespace-nowrap text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink xl:px-3.5"
            >
              {item.label}
            </SectionLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.92rem] font-medium whitespace-nowrap text-ink/80 transition-colors hover:text-ink md:inline-flex lg:hidden xl:inline-flex"
          >
            <PiPhone className="size-4" aria-hidden />
            {site.phone.display}
          </a>
          <BookingButton className="hidden h-11 rounded-full px-5 text-[0.92rem] sm:inline-flex">
            Book a free consultation
          </BookingButton>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-11 rounded-full text-ink lg:hidden"
                aria-label="Open menu"
              >
                <HiOutlineMenuAlt4 className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm border-l-0 bg-cream px-6 pt-6 pb-8">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation and booking</SheetDescription>
              <Logo />
              <nav aria-label="Mobile" className="mt-10 flex flex-col">
                {nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <SectionLink
                      hash={item.href}
                      className="border-b border-border/80 py-4 font-serif text-2xl text-ink transition-colors hover:text-sand-deep"
                    >
                      {item.label}
                    </SectionLink>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <SheetClose asChild>
                  <BookingButton size="lg" className="h-12 rounded-full text-base">
                    Book a free consultation
                  </BookingButton>
                </SheetClose>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-ink/20 bg-transparent text-base"
                >
                  <a href={site.phone.href}>
                    <PiPhone aria-hidden /> Call {site.phone.display}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
