import Image from "next/image";

import { TextReveal } from "@/components/motion/text-reveal";
import { asset } from "@/lib/asset";

export function Empathy() {
  return (
    <section aria-label="You are not alone" className="relative">
      <TextReveal
        highlight={["alone", "heard", "understood"]}
        eyebrow={
          <Image
            src={asset("/brand/logo-mark.svg")}
            alt=""
            width={56}
            height={52}
            className="mb-10 h-12 w-auto opacity-90"
            unoptimized
          />
        }
      >
        Whatever you are carrying, whether it is anxiety, grief, a relationship at a crossroads, or the quiet weight of
        always being the strong one, you do not have to carry it alone. You deserve to be heard and understood.
      </TextReveal>
    </section>
  );
}
