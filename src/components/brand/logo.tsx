import Image from "next/image";

import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/** The practice's speech-bubble-and-heart mark with a typeset wordmark. */
export function Logo({ tone = "ink", className }: { tone?: "ink" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src={asset(light ? "/brand/logo-mark-light.svg" : "/brand/logo-mark.svg")}
        alt=""
        width={46}
        height={43}
        className="h-[2.4rem] w-auto shrink-0"
        unoptimized
        loading={light ? "lazy" : "eager"}
      />
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span
          className={cn("font-serif text-[1.15rem] font-medium tracking-[-0.01em]", light ? "text-cream" : "text-ink")}
        >
          Talk To Heal
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-semibold tracking-[0.24em] uppercase",
            light ? "text-sand" : "text-sand-deep",
          )}
        >
          Counseling Center
        </span>
      </span>
    </span>
  );
}
