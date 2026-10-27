import Image from "next/image";

import { asset } from "@/lib/asset";
import { insuranceBrands, type InsuranceBrand } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * An insurer's logo, sized by visual area rather than by height, so a wide wordmark (Kaiser)
 * and a stacked mark (Cigna, TRICARE) read as equally present. Muted until hovered.
 */
export function InsuranceLogo({
  brand,
  area = 2800,
  maxWidth = Infinity,
  decorative = false,
  className,
}: {
  brand: InsuranceBrand;
  /** Target width x height in CSS pixels. */
  area?: number;
  /** Scales the logo down, keeping its shape, when it would be wider than this. */
  maxWidth?: number;
  /** True when a visible caption already names the plan. */
  decorative?: boolean;
  className?: string;
}) {
  const { name, file, ratio } = insuranceBrands[brand];
  const natural = Math.sqrt(area / ratio);
  const height = Math.round(Math.min(natural, maxWidth / ratio));
  const width = Math.round(height * ratio);
  return (
    <Image
      src={asset(`/insurance/${file}`)}
      alt={decorative ? "" : name}
      width={width}
      height={height}
      unoptimized
      draggable={false}
      style={{ width, height }}
      className={cn(
        "shrink-0 object-contain opacity-70 grayscale transition-[filter,opacity] duration-500 select-none group-hover:opacity-100 group-hover:grayscale-0",
        className,
      )}
    />
  );
}
