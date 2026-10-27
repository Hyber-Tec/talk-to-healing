"use client";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

/** Progress through the request; finished steps can be revisited, later ones cannot be skipped to. */
export function BookingStepper({
  steps,
  current,
  onSelect,
}: {
  steps: readonly string[];
  current: number;
  onSelect: (step: number) => void;
}) {
  return (
    <Stepper value={current + 1} onValueChange={(value) => onSelect(value - 1)} className="mt-6">
      {steps.map((title, index) => (
        <StepperItem key={title} step={index + 1} disabled={index > current} className="not-last:flex-1">
          <StepperTrigger className="gap-2.5" aria-current={index === current ? "step" : undefined}>
            <StepperIndicator />
            <StepperTitle className={index === current ? "text-ink max-sm:sr-only" : "text-ink-soft max-sm:sr-only"}>
              {title}
            </StepperTitle>
          </StepperTrigger>
          {index < steps.length - 1 && <StepperSeparator className="mx-2.5 sm:mx-3.5" />}
        </StepperItem>
      ))}
    </Stepper>
  );
}
