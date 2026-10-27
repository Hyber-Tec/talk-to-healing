import { insurers } from "@/lib/site";

/**
 * A request for a free 15-minute consultation call.
 * It records preferences only: the practice confirms the actual time by calling back,
 * exactly as its current booking page does ("We will call you!").
 */
export type ConsultationRequest = {
  /** A clinician's slug, or null when the visitor asks us to help them choose. */
  therapist: string | null;
  /** Preferred day for the call, as YYYY-MM-DD. */
  date: string;
  timeOfDay: TimeOfDay;
  forWhom: ForWhom;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactMethod: ContactMethod;
  /** An accepted plan, "Self-pay", or "Not sure yet". */
  coverage: string;
};

export const timesOfDay = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "any", label: "Any time" },
] as const;
export type TimeOfDay = (typeof timesOfDay)[number]["value"];

export const forWhomOptions = [
  { value: "myself", label: "Myself" },
  { value: "child", label: "My child or teen" },
  { value: "couple", label: "Us as a couple" },
  { value: "family", label: "Our family" },
] as const;
export type ForWhom = (typeof forWhomOptions)[number]["value"];

export const contactMethods = [
  { value: "call", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
] as const;
export type ContactMethod = (typeof contactMethods)[number]["value"];

export const coverageOptions = [...insurers, "Self-pay", "Not sure yet"] as const;

export type SubmitResult =
  | { status: "sent" }
  /** No endpoint is configured (for example on the GitHub Pages preview), so nothing left the browser. */
  | { status: "preview" }
  | { status: "error"; message: string };

/**
 * Sends the request to NEXT_PUBLIC_CONSULTATION_ENDPOINT, which should be a HIPAA-ready intake service
 * (one that will sign a business associate agreement). Without one, the flow says plainly that nothing was sent.
 */
export async function submitConsultationRequest(request: ConsultationRequest): Promise<SubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_CONSULTATION_ENDPOINT;
  if (!endpoint) return { status: "preview" };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (!response.ok) return { status: "error", message: `The request could not be sent (${response.status}).` };
    return { status: "sent" };
  } catch {
    return { status: "error", message: "The request could not be sent. Please check your connection." };
  }
}

/** Formats US phone digits as (404) 369-3838 while the visitor types. */
export function formatPhone(input: string) {
  const digits = input
    .replace(/\D/g, "")
    .replace(/^1(?=\d{10})/, "")
    .slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function isValidPhone(input: string) {
  return input.replace(/\D/g, "").replace(/^1(?=\d{10})/, "").length === 10;
}

export function isValidEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
}
