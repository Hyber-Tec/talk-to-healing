import Image from "next/image";
import { PiArrowUpRight, PiClock } from "react-icons/pi";

import { BlurFade } from "@/components/motion/blur-fade";
import { SectionHeading } from "@/components/sections/section-heading";
import { journalUrl, posts } from "@/lib/site";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

const tones = {
  sage: "bg-sage",
  blush: "bg-blush",
  sand: "bg-sand-soft",
  linen: "bg-linen",
} as const;

export function Journal() {
  const [featured, ...rest] = posts;
  return (
    <section id="journal" aria-labelledby="journal-title" className="relative pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="journal-title"
            eyebrow="From our journal"
            title={
              <>
                Words for the <span className="text-sand-bright italic">in‑between</span> days
              </>
            }
            description="Gentle, practical writing from our founder, Elly, for the moments between sessions."
          />
          <BlurFade inView offset={8} blur="4px" duration={0.6} delay={0.2} className="shrink-0">
            <a
              href={journalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 font-medium text-ink underline decoration-sand decoration-2 underline-offset-[6px] transition-colors hover:text-sand-deep"
            >
              Read the journal <PiArrowUpRight aria-hidden />
            </a>
          </BlurFade>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-5">
          <BlurFade inView offset={14} blur="4px" duration={0.7} className="lg:row-span-3">
            <PostCard post={featured} featured />
          </BlurFade>
          {rest.map((post, index) => (
            <BlurFade key={post.href} inView offset={14} blur="4px" duration={0.7} delay={0.08 * (index + 1)}>
              <PostCard post={post} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostCard({ post, featured }: { post: (typeof posts)[number]; featured?: boolean }) {
  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(29,55,60,0.35)] sm:p-8",
        tones[post.tone],
        featured && "min-h-[22rem] lg:p-10",
      )}
    >
      <p className="flex items-center gap-1.5 text-[0.78rem] font-medium text-ink/70">
        <PiClock className="size-4" aria-hidden /> {post.minutes} min read
      </p>
      <h3
        className={cn(
          "mt-4 font-serif leading-snug text-pretty text-ink",
          featured ? "text-[1.75rem] sm:text-[2.1rem] sm:leading-[1.2]" : "text-xl",
        )}
      >
        {post.title}
      </h3>
      {featured && <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink/75">{post.excerpt}</p>}
      {featured && (
        <Image
          src={asset("/brand/logo-mark.svg")}
          alt=""
          width={288}
          height={267}
          unoptimized
          className="pointer-events-none absolute -right-10 bottom-14 w-72 opacity-[0.12] transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3"
        />
      )}
      <span className="mt-auto flex items-center justify-between pt-8 text-sm font-semibold text-ink">
        Read article
        <span className="flex size-10 items-center justify-center rounded-full bg-white/70 transition-all duration-500 group-hover:rotate-45 group-hover:bg-white">
          <PiArrowUpRight className="size-4.5" aria-hidden />
        </span>
      </span>
    </a>
  );
}
