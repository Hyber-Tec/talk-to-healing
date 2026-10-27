import { BlurFade } from "@/components/motion/blur-fade";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      <BlurFade inView offset={8} blur="4px" duration={0.6}>
        <p
          className={cn(
            "flex items-center gap-3 text-[0.78rem] font-semibold tracking-[0.2em] text-sand-deep uppercase",
            centered && "justify-center",
          )}
        >
          <span aria-hidden className="h-px w-8 bg-sand" />
          {eyebrow}
          {centered && <span aria-hidden className="h-px w-8 bg-sand" />}
        </p>
      </BlurFade>
      <BlurFade inView offset={10} blur="4px" duration={0.7} delay={0.08}>
        <h2
          id={id}
          className="mt-5 font-serif text-[2.4rem] leading-[1.08] font-normal tracking-[-0.02em] text-balance text-ink sm:text-5xl lg:text-[3.4rem]"
        >
          {title}
        </h2>
      </BlurFade>
      {description && (
        <BlurFade inView offset={10} blur="4px" duration={0.7} delay={0.16}>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-soft">{description}</p>
        </BlurFade>
      )}
    </div>
  );
}
