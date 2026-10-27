"use client";

import { useBooking } from "@/components/booking/booking-context";
import { Button } from "@/components/ui/button";

/** Any "book a free consultation" call to action; opens the request dialog instead of leaving the site. */
export function BookingButton({
  therapist,
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & { therapist?: string }) {
  const { openBooking } = useBooking();
  return (
    <Button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openBooking(therapist);
      }}
      {...props}
    />
  );
}

/** An unstyled trigger for cards and other custom layouts that open the request dialog. */
export function BookingTrigger({
  therapist,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { therapist?: string }) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openBooking(therapist);
      }}
      {...props}
    />
  );
}
