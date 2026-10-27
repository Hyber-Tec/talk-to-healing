"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PiArrowLeft, PiArrowRight, PiCheck, PiPhone, PiSpinnerGap } from "react-icons/pi";

import { BookingStepper } from "@/components/booking/booking-stepper";
import {
  DetailsStep,
  ReviewStep,
  TherapistStep,
  TimeStep,
  formatDate,
  type Draft,
  type Errors,
} from "@/components/booking/steps";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { asset } from "@/lib/asset";
import {
  contactMethods,
  isValidEmail,
  isValidPhone,
  submitConsultationRequest,
  type SubmitResult,
} from "@/lib/consultation";
import { findMember, site } from "@/lib/site";

const steps = [
  { title: "Therapist", heading: "Who would you like to talk with?" },
  { title: "Time", heading: "When is a good time to call?" },
  { title: "Details", heading: "How can we reach you?" },
  { title: "Review", heading: "Does everything look right?" },
] as const;

const emptyDraft: Draft = {
  therapist: null,
  date: undefined,
  timeOfDay: "any",
  forWhom: "myself",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  contactMethod: "call",
  coverage: "",
  consent: false,
};

function validate(step: number, draft: Draft): Errors {
  const errors: Errors = {};
  if (step === 1 && !draft.date) errors.date = "Please choose a day that works for you.";
  if (step === 2) {
    if (!draft.firstName.trim()) errors.firstName = "Please add your first name.";
    if (!draft.lastName.trim()) errors.lastName = "Please add your last name.";
    if (!isValidPhone(draft.phone)) errors.phone = "Please add a 10-digit phone number.";
    if (draft.contactMethod === "email" ? !isValidEmail(draft.email) : draft.email && !isValidEmail(draft.email)) {
      errors.email = "Please add a valid email address.";
    }
    if (!draft.consent) errors.consent = "Please confirm before continuing.";
  }
  return errors;
}

export function BookingDialog({
  open,
  onOpenChange,
  initialTherapist,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTherapist?: string;
}) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [draft, setDraft] = useState<Draft>({ ...emptyDraft, therapist: initialTherapist ?? null });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const update = (patch: Partial<Draft>) => {
    setDraft((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      for (const key of Object.keys(patch)) delete next[key as keyof Draft];
      return next;
    });
  };

  const goTo = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };

  const next = async () => {
    const found = validate(step, draft);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (step < steps.length - 1) return goTo(step + 1);
    setSubmitting(true);
    const response = await submitConsultationRequest({
      ...draft,
      date: draft.date ? toIsoDate(draft.date) : "",
    });
    setSubmitting(false);
    setResult(response);
  };

  const therapist = draft.therapist ? findMember(draft.therapist) : undefined;
  const done = result && result.status !== "error";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-lenis-prevent
        className="flex h-[100dvh] max-h-none w-full max-w-none flex-col gap-0 overflow-hidden rounded-none bg-cream p-0 ring-0 sm:h-[min(46rem,calc(100dvh-2rem))] sm:max-h-none sm:max-w-[46rem] sm:rounded-[2rem] sm:ring-1 sm:ring-ink/10"
      >
        <header className="border-b border-border/80 px-6 pt-6 pb-5 sm:px-8 sm:pt-7">
          <div className="flex items-center gap-3 pr-10">
            <Image
              src={asset("/brand/logo-mark.svg")}
              alt=""
              width={36}
              height={33}
              className="h-8 w-auto"
              unoptimized
            />
            <div className="min-w-0">
              <DialogTitle className="font-serif text-xl leading-tight font-normal text-ink sm:text-2xl">
                Request a free consultation
              </DialogTitle>
              <DialogDescription className="mt-0.5 text-[0.85rem] text-ink-soft">
                A 15-minute phone call. No cost, no commitment.
              </DialogDescription>
            </div>
          </div>
          {!done && <BookingStepper steps={steps.map((s) => s.title)} current={step} onSelect={goTo} />}
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 sm:py-7">
          {done ? (
            <Confirmation result={result} draft={draft} therapistName={therapist?.name} />
          ) : (
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.section
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: 24 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 * direction }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                aria-labelledby="booking-step-heading"
              >
                <h3 id="booking-step-heading" className="mb-5 font-serif text-[1.35rem] leading-snug text-ink">
                  {steps[step].heading}
                </h3>
                {step === 0 && <TherapistStep draft={draft} update={update} errors={errors} />}
                {step === 1 && <TimeStep draft={draft} update={update} errors={errors} />}
                {step === 2 && <DetailsStep draft={draft} update={update} errors={errors} />}
                {step === 3 && <ReviewStep draft={draft} goTo={goTo} />}
                {result?.status === "error" && (
                  <p role="alert" className="mt-5 rounded-2xl bg-blush p-4 text-sm text-ink">
                    {result.message} You can also call us at{" "}
                    <a href={site.phone.href} className="font-semibold underline underline-offset-4">
                      {site.phone.display}
                    </a>
                    .
                  </p>
                )}
              </motion.section>
            </AnimatePresence>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-border/80 bg-cream/95 px-6 py-4 sm:px-8">
          {done ? (
            <Button className="ml-auto h-11 rounded-full px-6" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          ) : (
            <>
              {step > 0 ? (
                <Button variant="ghost" className="h-11 rounded-full px-4 text-ink" onClick={() => goTo(step - 1)}>
                  <PiArrowLeft aria-hidden /> Back
                </Button>
              ) : (
                <a
                  href={site.phone.href}
                  className="inline-flex items-center gap-2 rounded-full px-2 text-sm font-medium text-ink-soft hover:text-ink"
                >
                  <PiPhone aria-hidden /> <span className="max-sm:sr-only">Prefer to call?</span> {site.phone.display}
                </a>
              )}
              <Button className="h-11 rounded-full px-6" onClick={next} disabled={submitting}>
                {submitting ? (
                  <>
                    <PiSpinnerGap className="animate-spin" aria-hidden /> Sending
                  </>
                ) : step === steps.length - 1 ? (
                  <>
                    Send request <PiCheck aria-hidden />
                  </>
                ) : (
                  <>
                    Continue <PiArrowRight aria-hidden />
                  </>
                )}
              </Button>
            </>
          )}
        </footer>
      </DialogContent>
    </Dialog>
  );
}

function Confirmation({
  result,
  draft,
  therapistName,
}: {
  result: SubmitResult;
  draft: Draft;
  therapistName?: string;
}) {
  const method = contactMethods.find((m) => m.value === draft.contactMethod)?.label.toLowerCase();
  return (
    <div className="flex min-h-full flex-col items-center justify-center py-6 text-center">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex size-16 items-center justify-center rounded-full bg-sage text-ink"
      >
        <PiCheck className="size-8" aria-hidden />
      </motion.span>
      <p className="mt-6 font-serif text-2xl text-ink">
        {result.status === "sent" ? `We have your request, ${draft.firstName}.` : `Thank you, ${draft.firstName}.`}
      </p>
      {result.status === "sent" ? (
        <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
          Our team will reach out by {method} to confirm your free consultation
          {therapistName ? ` with ${therapistName}` : ""}, around{" "}
          {draft.date ? formatDate(draft.date) : "your preferred day"}.
        </p>
      ) : (
        <div className="mt-4 max-w-md">
          <p className="rounded-2xl bg-sand-soft/70 p-4 text-[0.92rem] leading-relaxed text-ink">
            <span className="font-semibold">This is a preview of the booking flow, so nothing was sent.</span> To book
            your free consultation today, call{" "}
            <a href={site.phone.href} className="font-semibold underline underline-offset-4">
              {site.phone.display}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${site.email.general}`} className="font-semibold underline underline-offset-4">
              {site.email.general}
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
