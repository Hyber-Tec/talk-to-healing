"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { BookingDialog } from "@/components/booking/booking-dialog";

type BookingContextValue = {
  /** Opens the free-consultation request, optionally with a therapist already chosen. */
  openBooking: (therapist?: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [therapist, setTherapist] = useState<string | undefined>();
  // A new key per opening gives every request a fresh form.
  const [session, setSession] = useState(0);

  const openBooking = useCallback((slug?: string) => {
    setTherapist(slug);
    setSession((value) => value + 1);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDialog key={session} open={open} onOpenChange={setOpen} initialTherapist={therapist} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside <BookingProvider>");
  return context;
}
