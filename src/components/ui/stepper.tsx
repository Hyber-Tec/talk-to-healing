"use client";

/**
 * Stepper by Origin UI, via 21st.dev: https://21st.dev/@originui (MIT), from https://coss.com/origin.
 * Adapted for Talk To Heal: react-icons, brand tokens (linen track, ink progress), and a span title,
 * because step labels are not document headings.
 */
import { PiCheckBold, PiSpinnerGap } from "react-icons/pi";
import { Slot } from "radix-ui";
import * as React from "react";
import { createContext, useContext } from "react";

import { cn } from "@/lib/utils";

// Types
type StepperContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  orientation: "horizontal" | "vertical";
};

type StepItemContextValue = {
  step: number;
  state: StepState;
  isDisabled: boolean;
  isLoading: boolean;
};

type StepState = "active" | "completed" | "inactive" | "loading";

// Contexts
const StepperContext = createContext<StepperContextValue | undefined>(undefined);
const StepItemContext = createContext<StepItemContextValue | undefined>(undefined);

const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return context;
};

const useStepItem = () => {
  const context = useContext(StepItemContext);
  if (!context) {
    throw new Error("useStepItem must be used within a StepperItem");
  }
  return context;
};

// Components
interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
}

function Stepper({
  defaultValue = 0,
  value,
  onValueChange,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps) {
  const [activeStep, setInternalStep] = React.useState(defaultValue);

  const setActiveStep = React.useCallback(
    (step: number) => {
      if (value === undefined) {
        setInternalStep(step);
      }
      onValueChange?.(step);
    },
    [value, onValueChange],
  );

  const currentStep = value ?? activeStep;

  return (
    <StepperContext.Provider
      value={{
        activeStep: currentStep,
        orientation,
        setActiveStep,
      }}
    >
      <div
        className={cn(
          "group/stepper inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
          className,
        )}
        data-orientation={orientation}
        data-slot="stepper"
        {...props}
      />
    </StepperContext.Provider>
  );
}

// StepperItem
interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  completed?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

function StepperItem({
  step,
  completed = false,
  disabled = false,
  loading = false,
  className,
  children,
  ...props
}: StepperItemProps) {
  const { activeStep } = useStepper();

  const state: StepState = completed || step < activeStep ? "completed" : activeStep === step ? "active" : "inactive";

  const isLoading = loading && step === activeStep;

  return (
    <StepItemContext.Provider value={{ isDisabled: disabled, isLoading, state, step }}>
      <div
        className={cn(
          "group/step flex items-center group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col",
          className,
        )}
        data-slot="stepper-item"
        data-state={state}
        {...(isLoading ? { "data-loading": true } : {})}
        {...props}
      >
        {children}
      </div>
    </StepItemContext.Provider>
  );
}

// StepperTrigger
interface StepperTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

function StepperTrigger({ asChild = false, className, children, ...props }: StepperTriggerProps) {
  const { setActiveStep } = useStepper();
  const { step, isDisabled } = useStepItem();

  if (asChild) {
    const Comp = asChild ? Slot.Root : "span";
    return (
      <Comp className={className} data-slot="stepper-trigger">
        {children}
      </Comp>
    );
  }

  return (
    <button
      className={cn(
        "inline-flex items-center gap-3 rounded-full outline-none focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      data-slot="stepper-trigger"
      disabled={isDisabled}
      onClick={() => setActiveStep(step)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

// StepperIndicator
interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

function StepperIndicator({ asChild = false, className, children, ...props }: StepperIndicatorProps) {
  const { state, step, isLoading } = useStepItem();

  return (
    <span
      className={cn(
        "relative flex size-7 shrink-0 items-center justify-center rounded-full bg-linen text-xs font-medium text-ink-soft ring-1 ring-ink/10 transition-colors duration-300 data-[state=active]:bg-ink data-[state=active]:text-cream data-[state=active]:ring-4 data-[state=active]:ring-sand/35 data-[state=completed]:bg-ink data-[state=completed]:text-cream data-[state=completed]:ring-0",
        className,
      )}
      data-slot="stepper-indicator"
      data-state={state}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          <span className="transition-all group-data-loading/step:scale-0 group-data-loading/step:opacity-0 group-data-loading/step:transition-none group-data-[state=completed]/step:scale-0 group-data-[state=completed]/step:opacity-0 motion-reduce:transition-none">
            {step}
          </span>
          <PiCheckBold
            aria-hidden="true"
            className="absolute size-3.5 scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100 motion-reduce:transition-none"
          />
          {isLoading && (
            <span className="absolute transition-all">
              <PiSpinnerGap aria-hidden="true" className="size-3.5 motion-safe:animate-spin" />
            </span>
          )}
        </>
      )}
    </span>
  );
}

// StepperTitle
function StepperTitle({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-sm font-medium", className)} data-slot="stepper-title" {...props} />;
}

// StepperDescription
function StepperDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} data-slot="stepper-description" {...props} />;
}

// StepperSeparator
function StepperSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "m-0.5 rounded-full bg-border transition-colors duration-500 group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=horizontal]/stepper:flex-1 group-data-[orientation=vertical]/stepper:h-12 group-data-[orientation=vertical]/stepper:w-0.5 group-data-[state=completed]/step:bg-ink",
        className,
      )}
      data-slot="stepper-separator"
      {...props}
    />
  );
}

export { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger };
