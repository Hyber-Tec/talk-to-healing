"use client";

import Image from "next/image";
import { useState } from "react";
import type { IconType } from "react-icons";
import { PiCloudSun, PiMoonStars, PiSparkle, PiSun, PiSunHorizon } from "react-icons/pi";

import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { photoOf } from "@/lib/asset";
import {
  contactMethods,
  coverageOptions,
  forWhomOptions,
  formatPhone,
  timesOfDay,
  type ConsultationRequest,
  type TimeOfDay,
} from "@/lib/consultation";
import { clinicians, findMember, languages } from "@/lib/site";
import { cn } from "@/lib/utils";

export type Draft = Omit<ConsultationRequest, "date"> & { date: Date | undefined; consent: boolean };
export type Errors = Partial<Record<keyof Draft, string>>;
type StepProps = { draft: Draft; update: (patch: Partial<Draft>) => void; errors: Errors };

/** Inputs sized to sit evenly with the pill choices around them. */
const fieldClass = "h-11 rounded-xl bg-white px-3.5 md:text-[0.95rem]";

/* Step 1: who would you like to talk with? */

export function TherapistStep({ draft, update }: StepProps) {
  const [language, setLanguage] = useState("All");
  const shown = language === "All" ? clinicians : clinicians.filter((m) => m.languages.includes(language));

  return (
    <div>
      <ChoiceCard
        selected={draft.therapist === null}
        onSelect={() => update({ therapist: null })}
        className="flex items-center gap-4 p-4"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-sage text-ink">
          <PiSparkle className="size-5" aria-hidden />
        </span>
        <span>
          <span className="block font-serif text-lg leading-tight text-ink">Help me choose</span>
          <span className="mt-0.5 block text-sm text-ink-soft">We will match you with the right therapist.</span>
        </span>
      </ChoiceCard>

      <div className="mt-6 flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by language">
        {["All", ...languages.filter((l) => l !== "English")].map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={option === language}
            onClick={() => setLanguage(option)}
            className={cn(
              "rounded-full border px-3 py-1 text-[0.8rem] transition-colors",
              option === language
                ? "border-ink bg-ink text-cream"
                : "border-ink/12 text-ink/75 hover:border-ink/30 hover:text-ink",
            )}
          >
            {option === "All" ? "Any language" : option}
          </button>
        ))}
      </div>

      <div role="radiogroup" aria-label="Therapist" className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {shown.map((member) => (
          <ChoiceCard
            key={member.slug}
            selected={draft.therapist === member.slug}
            onSelect={() => update({ therapist: member.slug })}
            className="flex items-center gap-3 p-3"
          >
            <Image
              src={photoOf(member.slug)}
              alt=""
              width={52}
              height={52}
              className="size-13 shrink-0 rounded-full object-cover object-top"
            />
            <span className="min-w-0">
              <span className="block truncate font-serif text-[1.02rem] leading-tight text-ink">
                {member.name}
                {member.credentials && <span className="text-ink-soft">, {member.credentials}</span>}
              </span>
              <span className="mt-0.5 block truncate text-[0.78rem] text-ink-soft">{member.languages.join(" · ")}</span>
            </span>
          </ChoiceCard>
        ))}
      </div>
    </div>
  );
}

/* Step 2: when is a good time to call? */

const timeIcons: Record<TimeOfDay, IconType> = {
  morning: PiSunHorizon,
  afternoon: PiSun,
  evening: PiMoonStars,
  any: PiCloudSun,
};

/**
 * Layout from Origin UI's "Appointment picker" (https://21st.dev/@originui/components/calendar/appointment-picker, MIT):
 * a calendar beside a column of choices. The column offers a time of day, not fake time slots,
 * because the practice confirms the real time by phone.
 */
export function TimeStep({ draft, update, errors }: StepProps) {
  const today = startOfDay(new Date());
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-white">
        <div className="flex max-sm:flex-col">
          <Calendar
            mode="single"
            selected={draft.date}
            onSelect={(date) => update({ date })}
            disabled={{ before: addDays(today, 1) }}
            startMonth={today}
            endMonth={addDays(today, 90)}
            className="mx-auto bg-transparent p-3 [--cell-size:--spacing(10)] sm:pe-5"
          />
          <div className="w-full border-border/80 p-5 max-sm:border-t sm:w-52 sm:border-s">
            <p className="text-sm font-semibold text-ink" aria-live="polite">
              {draft.date ? formatDate(draft.date) : "Choose a day"}
            </p>
            <p className="mt-0.5 text-[0.8rem] text-ink-soft">Best time to call</p>
            <div role="radiogroup" aria-label="Best time to call" className="mt-4 grid gap-2 max-sm:grid-cols-2">
              {timesOfDay.map(({ value, label }) => {
                const Icon = timeIcons[value];
                const selected = draft.timeOfDay === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => update({ timeOfDay: value })}
                    className={cn(
                      "flex h-11 items-center gap-2.5 rounded-xl border px-3.5 text-[0.92rem] font-medium transition-colors duration-300",
                      selected
                        ? "border-ink bg-ink text-cream"
                        : "border-border bg-cream/60 text-ink hover:border-ink/35",
                    )}
                  >
                    <Icon className={cn("size-[1.1rem]", selected ? "text-sand" : "text-sand-deep")} aria-hidden />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {errors.date && <FieldError>{errors.date}</FieldError>}
      <p className="mt-4 rounded-2xl bg-sage/70 p-4 text-[0.85rem] leading-relaxed text-ink/80">
        These are your preferences, not a booked slot. We will call to confirm a time that works for you.
      </p>
    </div>
  );
}

/* Step 3: how can we reach you? */

export function DetailsStep({ draft, update, errors }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Who is the consultation for?</legend>
        <div role="radiogroup" aria-label="Who is the consultation for?" className="mt-3 flex flex-wrap gap-2">
          {forWhomOptions.map(({ value, label }) => (
            <Pill key={value} selected={draft.forWhom === value} onSelect={() => update({ forWhom: value })}>
              {label}
            </Pill>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="firstName" label="First name" error={errors.firstName}>
          <Input
            id="firstName"
            className={fieldClass}
            autoComplete="given-name"
            value={draft.firstName}
            onChange={(e) => update({ firstName: e.target.value })}
            aria-invalid={Boolean(errors.firstName)}
          />
        </Field>
        <Field id="lastName" label="Last name" error={errors.lastName}>
          <Input
            id="lastName"
            className={fieldClass}
            autoComplete="family-name"
            value={draft.lastName}
            onChange={(e) => update({ lastName: e.target.value })}
            aria-invalid={Boolean(errors.lastName)}
          />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone}>
          <Input
            id="phone"
            className={fieldClass}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(404) 555-0123"
            value={draft.phone}
            onChange={(e) => update({ phone: formatPhone(e.target.value) })}
            aria-invalid={Boolean(errors.phone)}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            className={fieldClass}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={draft.email}
            onChange={(e) => update({ email: e.target.value })}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Best way to reach you</legend>
          <div role="radiogroup" aria-label="Best way to reach you" className="mt-3 flex flex-wrap gap-2">
            {contactMethods.map(({ value, label }) => (
              <Pill
                key={value}
                selected={draft.contactMethod === value}
                onSelect={() => update({ contactMethod: value })}
              >
                {label}
              </Pill>
            ))}
          </div>
        </fieldset>
        <Field id="coverage" label="Insurance or self-pay">
          <Select value={draft.coverage} onValueChange={(coverage) => update({ coverage })}>
            <SelectTrigger id="coverage" className={cn(fieldClass, "w-full data-[size=default]:h-11")}>
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent>
              {coverageOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div>
        <div className="flex items-start gap-3 rounded-2xl bg-linen/80 p-4">
          <Checkbox
            id="consent"
            checked={draft.consent}
            onCheckedChange={(checked) => update({ consent: checked === true })}
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5"
          />
          <Label htmlFor="consent" className="block text-[0.85rem] leading-relaxed font-normal text-ink/85">
            I understand this form is for scheduling only. I won&rsquo;t share medical details here, and if I am in
            crisis I will call or text 988 or call 911.
          </Label>
        </div>
        {errors.consent && <FieldError>{errors.consent}</FieldError>}
      </div>
    </div>
  );
}

/* Step 4: review */

export function ReviewStep({ draft, goTo }: { draft: Draft; goTo: (step: number) => void }) {
  const therapist = draft.therapist ? findMember(draft.therapist) : undefined;
  const rows = [
    {
      label: "Therapist",
      value: therapist
        ? `${therapist.name}${therapist.credentials ? `, ${therapist.credentials}` : ""}`
        : "Help me choose",
      step: 0,
    },
    {
      label: "Preferred time",
      value: `${draft.date ? formatDate(draft.date) : ""} · ${timesOfDay.find((t) => t.value === draft.timeOfDay)?.label}`,
      step: 1,
    },
    { label: "For", value: forWhomOptions.find((o) => o.value === draft.forWhom)?.label ?? "", step: 2 },
    { label: "Name", value: `${draft.firstName} ${draft.lastName}`, step: 2 },
    { label: "Phone", value: draft.phone, step: 2 },
    { label: "Email", value: draft.email || "Not provided", step: 2 },
    {
      label: "Contact by",
      value: contactMethods.find((m) => m.value === draft.contactMethod)?.label ?? "",
      step: 2,
    },
    { label: "Coverage", value: draft.coverage || "Not provided", step: 2 },
  ];
  return (
    <dl className="divide-y divide-border/80 rounded-2xl border border-border/80 bg-white">
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline gap-3 px-4 py-3.5 sm:gap-4 sm:px-5">
          <dt className="w-24 shrink-0 text-sm text-ink-soft sm:w-32">{row.label}</dt>
          <dd className="min-w-0 flex-1 text-[0.95rem] break-words text-ink">{row.value}</dd>
          <button
            type="button"
            onClick={() => goTo(row.step)}
            className="shrink-0 rounded-full px-2 text-sm font-medium text-sand-deep underline-offset-4 hover:underline"
          >
            Edit<span className="sr-only"> {row.label.toLowerCase()}</span>
          </button>
        </div>
      ))}
    </dl>
  );
}

/* Shared pieces */

function ChoiceCard({
  selected,
  onSelect,
  className,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "w-full rounded-2xl border text-left transition-all duration-300",
        selected
          ? "border-ink bg-white shadow-[0_10px_24px_-14px_rgba(29,55,60,0.45)] ring-1 ring-ink"
          : "border-border/80 bg-white/60 hover:border-ink/30 hover:bg-white",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Pill({
  selected,
  onSelect,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
        selected ? "border-ink bg-ink text-cream" : "border-ink/15 bg-white/70 text-ink/80 hover:border-ink/35",
      )}
    >
      {children}
    </button>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </Label>
      <div className="mt-2">{children}</div>
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1.5 text-[0.82rem] text-clay">
      {children}
    </p>
  );
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}
