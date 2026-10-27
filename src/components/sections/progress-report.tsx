"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import type { IconType } from "react-icons";
import {
  PiBookOpenText,
  PiCalendarCheck,
  PiChatCircleText,
  PiHouseLine,
  PiNotePencil,
  PiSparkle,
  PiTarget,
  PiTrendUp,
  PiVideoCamera,
} from "react-icons/pi";

import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/**
 * A sample client-portal progress report shown inside the tablet.
 * Every number here is illustrative and labeled as such on screen.
 */
const weeks = [4.2, 4.0, 4.8, 5.1, 4.9, 5.6, 5.9, 5.7, 6.4, 6.8, 7.0, 7.4];

const goals = [
  { label: "Sleep through the night", detail: "5 of 7 nights", value: 0.72 },
  { label: "Pause before reacting", detail: "4 moments this week", value: 0.58 },
  { label: "Reconnect with a friend", detail: "2 coffee dates", value: 0.85 },
];

const navItems: { icon: IconType; label: string; active?: boolean }[] = [
  { icon: PiHouseLine, label: "Overview", active: true },
  { icon: PiCalendarCheck, label: "Sessions" },
  { icon: PiNotePencil, label: "Check-ins" },
  { icon: PiTarget, label: "Goals" },
  { icon: PiChatCircleText, label: "Messages" },
  { icon: PiBookOpenText, label: "Resources" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function ProgressReport() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div ref={ref} className="flex h-full w-full text-left text-ink">
      <aside className="hidden w-52 shrink-0 flex-col border-r border-border/70 bg-linen/60 p-5 md:flex">
        <div className="flex items-center gap-2.5">
          <Image src={asset("/brand/logo-mark.svg")} alt="" width={30} height={28} className="h-7 w-auto" unoptimized />
          <span className="font-serif text-[0.95rem] leading-tight">Talk To Heal</span>
        </div>
        <nav aria-label="Sample portal" className="mt-8 flex flex-col gap-1">
          {navItems.map(({ icon: Icon, label, active }) => (
            <span
              key={label}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[0.82rem]",
                active ? "bg-white font-semibold text-ink shadow-sm" : "text-ink-soft",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </span>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-ink p-4 text-cream">
          <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-sand uppercase">Next session</p>
          <p className="mt-2 font-serif text-lg leading-tight">Thu, 6:00 PM</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-cream/75">
            <PiVideoCamera className="size-3.5" aria-hidden /> Online · 50 min
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-6">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-sand-deep uppercase">Progress report</p>
            <p className="mt-1 font-serif text-xl leading-tight sm:text-2xl">Good evening, Maya</p>
            <p className="mt-0.5 hidden text-[0.8rem] text-ink-soft sm:block">
              Here is how the last 12 weeks have looked.
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-sand/70 bg-sand-soft/70 px-2.5 py-1 text-[0.66rem] font-semibold tracking-wide text-sand-deep uppercase">
            Sample
          </span>
        </header>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Stat label="Sessions" value="12" note="attended" />
          <Stat label="Check-ins" value="9" note="weeks in a row" />
          <Stat label="Wellbeing" value="+76%" note="since week 1" accent />
        </div>

        <div className="grid min-h-0 flex-1 gap-3 sm:gap-4 lg:grid-cols-[1.55fr_1fr]">
          <section className="flex min-h-0 flex-col rounded-2xl border border-border/70 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-[0.82rem] font-semibold">How you have been feeling</p>
              <p className="flex items-center gap-1 text-[0.72rem] font-medium text-sage-deep">
                <PiTrendUp className="size-3.5" aria-hidden /> Gently rising
              </p>
            </div>
            <WellbeingChart animate={inView} />
          </section>

          <div className="hidden min-h-0 flex-col gap-3 sm:flex sm:gap-4">
            <section className="rounded-2xl border border-border/70 bg-white p-4">
              <p className="text-[0.82rem] font-semibold">Goals you set together</p>
              <ul className="mt-3 flex flex-col gap-3">
                {goals.map((goal, index) => (
                  <li key={goal.label}>
                    <div className="flex items-baseline justify-between gap-2 text-[0.76rem]">
                      <span className="truncate font-medium">{goal.label}</span>
                      <span className="shrink-0 text-ink-soft">{goal.detail}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-linen">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-ink to-sage-deep"
                        initial={{ width: 0 }}
                        animate={{ width: inView ? `${goal.value * 100}%` : 0 }}
                        transition={{ duration: 1.2, delay: 0.5 + index * 0.15, ease }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="flex-1 rounded-2xl bg-sage p-4">
              <p className="flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.12em] text-ink/70 uppercase">
                <PiSparkle className="size-3.5" aria-hidden /> From your last session
              </p>
              <p className="mt-2 font-serif text-[0.95rem] leading-snug">
                &ldquo;You noticed three moments this week when you paused before reacting. That is the work, and it is
                showing.&rdquo;
              </p>
            </section>
          </div>
        </div>

        <p className="text-right text-[0.65rem] text-ink-soft/80">Illustrative example. Not real client data.</p>
      </div>
    </div>
  );
}

function Stat({ label, value, note, accent }: { label: string; value: string; note: string; accent?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3 sm:p-4",
        accent ? "border-transparent bg-ink text-cream" : "border-border/70 bg-white",
      )}
    >
      <p
        className={cn(
          "text-[0.68rem] font-semibold tracking-[0.12em] uppercase",
          accent ? "text-sand" : "text-ink-soft",
        )}
      >
        {label}
      </p>
      <p className="mt-1 font-serif text-2xl leading-none sm:text-[1.9rem]">{value}</p>
      <p className={cn("mt-1 truncate text-[0.7rem]", accent ? "text-cream/70" : "text-ink-soft")}>{note}</p>
    </div>
  );
}

/** Smooth weekly wellbeing line (self-reported, 0 to 10) drawn as the tablet settles. */
function WellbeingChart({ animate }: { animate: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // ResizeObserver reports the layout size, unaffected by the tablet's scroll-driven scale and tilt.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width: Math.round(width), height: Math.round(height) });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mt-2 min-h-32 flex-1 overflow-hidden">
      {size.width > 0 && size.height > 0 && <ChartSvg width={size.width} height={size.height} animate={animate} />}
    </div>
  );
}

/** Drawn in real pixels (no viewBox scaling) so strokes and labels stay crisp at any tablet size. */
function ChartSvg({ width, height, animate }: { width: number; height: number; animate: boolean }) {
  const pad = { top: 14, right: 6, bottom: 22, left: 6 };
  const min = 3;
  const max = 8.6;
  const x = (i: number) => pad.left + (i / (weeks.length - 1)) * (width - pad.left - pad.right);
  const y = (v: number) => pad.top + (1 - (v - min) / (max - min)) * (height - pad.top - pad.bottom);
  const points = weeks.map((v, i) => [x(i), y(v)] as const);
  const line = smoothPath(points);
  const area = `${line} L ${x(weeks.length - 1)} ${height - pad.bottom} L ${x(0)} ${height - pad.bottom} Z`;
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="absolute inset-0"
      role="img"
      aria-label="Sample wellbeing scores rising from 4.2 to 7.4 over 12 weeks"
    >
      <defs>
        <linearGradient id="wellbeing-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7e9886" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#7e9886" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={pad.left}
          x2={width - pad.right}
          y1={pad.top + t * (height - pad.top - pad.bottom)}
          y2={pad.top + t * (height - pad.top - pad.bottom)}
          stroke="#e7ddcf"
          strokeDasharray="3 5"
        />
      ))}
      <line
        x1={pad.left}
        x2={width - pad.right}
        y1={y(weeks[0])}
        y2={y(weeks[0])}
        stroke="#dbbc90"
        strokeDasharray="2 4"
      />
      <text x={width - pad.right} y={y(weeks[0]) + 13} textAnchor="end" className="fill-sand-deep text-[9px]">
        where you started
      </text>
      <motion.path
        d={area}
        fill="url(#wellbeing-area)"
        initial={{ opacity: 0 }}
        animate={{ opacity: animate ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.9 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#294b52"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: animate ? 1 : 0 }}
        transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
      />
      {points.map(([px, py], i) => (
        <motion.circle
          key={i}
          cx={px}
          cy={py}
          r={i === points.length - 1 ? 0 : 2.4}
          fill="#fffdf9"
          stroke="#294b52"
          strokeWidth={1.5}
          initial={{ opacity: 0 }}
          animate={{ opacity: animate ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.3 + (i / points.length) * 1.8 }}
        />
      ))}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: animate ? 1 : 0, scale: animate ? 1 : 0.6 }}
        transition={{ duration: 0.5, delay: 2.1, ease }}
        style={{ transformOrigin: `${lastX}px ${lastY}px` }}
      >
        <circle cx={lastX} cy={lastY} r={9} fill="#dbbc90" fillOpacity={0.35} />
        <circle cx={lastX} cy={lastY} r={4.5} fill="#294b52" />
        <rect x={lastX - 58} y={lastY - 30} width={50} height={20} rx={10} fill="#294b52" />
        <text x={lastX - 33} y={lastY - 16.5} textAnchor="middle" className="fill-cream text-[10px] font-semibold">
          7.4 / 10
        </text>
      </motion.g>
      {weeks.map((_, i) =>
        [0, 3, 7, 11].includes(i) ? (
          <text
            key={i}
            x={x(i)}
            y={height - 6}
            textAnchor={i === 0 ? "start" : i === weeks.length - 1 ? "end" : "middle"}
            className="fill-ink-soft text-[9px]"
          >
            W{i + 1}
          </text>
        ) : null,
      )}
    </svg>
  );
}

/** Catmull-Rom spline through the points, expressed as cubic Bezier segments. */
function smoothPath(points: readonly (readonly [number, number])[]) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i - 1] ?? points[i];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const [x3, y3] = points[i + 2] ?? points[i + 1];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
  }
  return d;
}
